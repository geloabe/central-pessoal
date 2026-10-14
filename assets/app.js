/* Central Pessoal — login + camada de armazenamento sobre o Supabase.
 *
 * Carregado no <head> de todas as páginas. Faz três coisas:
 *  1. Esconde a página e mostra a tela de login até existir uma sessão válida.
 *  2. Expõe window.storage (chave/valor) e window.claude.use('db') (coleção/documento),
 *     as mesmas APIs que os painéis usavam no claude.ai, agora gravando no Supabase.
 *  3. Expõe window.__appReady (Promise) e window.appKV (cache síncrono do kv, usado pelo Grimório).
 *
 * A segurança de verdade está no Row Level Security do banco (supabase/schema.sql);
 * esta tela só controla a experiência. Nada sensível fica neste repositório.
 */
(function () {
  'use strict';

  var cfg = window.APP_CONFIG || {};
  var SUPABASE_JS = 'assets/vendor/supabase-2.45.4.js'; // hospedado junto do site (versão fixa)

  /* ---------- esconde a página até autenticar ---------- */
  var hide = document.createElement('style');
  hide.id = 'app-hide';
  hide.textContent = 'html.app-locked body>*:not(#app-login){visibility:hidden!important}';
  document.head.appendChild(hide);
  document.documentElement.classList.add('app-locked');

  /* app instalável: ícone e cor da barra do celular */
  [['link', {rel: 'manifest', href: 'manifest.webmanifest'}],
   ['link', {rel: 'apple-touch-icon', href: 'assets/icon-180.png'}],
   ['meta', {name: 'theme-color', content: '#7440DB'}],
   ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
   ['meta', {name: 'apple-mobile-web-app-title', content: 'Central'}]].forEach(function (t) {
    var e = document.createElement(t[0]); Object.keys(t[1]).forEach(function (k) { e.setAttribute(k, t[1][k]); }); document.head.appendChild(e);
  });

  var resolveReady;
  window.__appReady = new Promise(function (r) { resolveReady = r; });
  window.appKV = {};

  var sb = null;
  var session = null;

  function loadScript(src) {
    return new Promise(function (ok, fail) {
      var s = document.createElement('script');
      s.src = src; s.onload = ok; s.onerror = function () { fail(new Error('falha ao carregar ' + src)); };
      document.head.appendChild(s);
    });
  }

  /* ---------- tela de login ---------- */
  function showLogin(msg) {
    var el = document.getElementById('app-login');
    if (!el) {
      el = document.createElement('div');
      el.id = 'app-login';
      el.innerHTML =
        '<style>' +
        '#app-login{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;' +
        'background:#141412;color:#EEECE6;font:16px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}' +
        '#app-login form{width:100%;max-width:340px;display:flex;flex-direction:column;gap:12px}' +
        '#app-login h1{font-size:22px;margin:0 0 4px}' +
        '#app-login input{font:inherit;padding:12px;border-radius:10px;border:1px solid #3a3834;background:#1D1C1A;color:inherit}' +
        '#app-login button{font:inherit;font-weight:600;padding:12px;border-radius:10px;border:0;background:#EEECE6;color:#141412;cursor:pointer}' +
        '#app-login button:disabled{opacity:.6;cursor:wait}' +
        '#app-login .msg{min-height:1.4em;font-size:14px;color:#f08a8a}' +
        '</style>' +
        '<form autocomplete="on">' +
        '<h1>Central Pessoal</h1>' +
        '<input type="email" name="email" placeholder="e-mail" autocomplete="username" required>' +
        '<input type="password" name="password" placeholder="senha" autocomplete="current-password" required>' +
        '<button type="submit">Entrar</button>' +
        '<div class="msg" role="alert"></div>' +
        '</form>';
      document.body.appendChild(el);
      el.querySelector('form').addEventListener('submit', onSubmit);
    }
    el.querySelector('.msg').textContent = msg || '';
    el.style.display = 'flex';
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    var f = ev.target, btn = f.querySelector('button'), msg = f.querySelector('.msg');
    btn.disabled = true; msg.textContent = '';
    var r = await sb.auth.signInWithPassword({ email: f.email.value.trim(), password: f.password.value });
    btn.disabled = false;
    if (r.error) { msg.textContent = 'E-mail ou senha incorretos.'; f.password.value = ''; return; }
    f.password.value = '';
    await onSession(r.data.session);
  }

  function addLogout() {
    if (document.getElementById('app-logout')) return;
    var b = document.createElement('button');
    b.id = 'app-logout'; b.type = 'button'; b.textContent = 'Sair';
    var faixa = document.querySelector('.faixa-modulo');
    b.style.cssText = (faixa ? '' : 'position:fixed;top:8px;right:8px;z-index:9999;') +
      'font:12px system-ui,sans-serif;padding:4px 10px;border-radius:2px;border:1px solid rgba(128,128,128,.4);background:rgba(255,255,255,.35);color:inherit;cursor:pointer';
    b.addEventListener('click', async function () { await sb.auth.signOut(); location.reload(); });
    if (faixa) faixa.appendChild(b); else document.body.appendChild(b);
  }

  var started = false;
  async function onSession(s) {
    session = s;
    if (!s) { showLogin(); return; }
    var el = document.getElementById('app-login'); if (el) el.style.display = 'none';
    document.documentElement.classList.remove('app-locked');
    addLogout();
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
    if (!started) { started = true; resolveReady(); }
  }

  /* ---------- API: window.storage (chave/valor) ---------- */
  function fail(r) { if (r.error) throw r.error; return r; }

  window.storage = {
    async get(key) {
      await window.__appReady;
      var r = fail(await sb.from('kv').select('value').eq('key', key).maybeSingle());
      return r.data ? { key: key, value: r.data.value } : null;
    },
    async set(key, value) {
      await window.__appReady;
      fail(await sb.from('kv').upsert({ user_id: session.user.id, key: key, value: String(value), updated_at: new Date().toISOString() }));
      return { key: key, value: value };
    },
    async delete(key) {
      await window.__appReady;
      fail(await sb.from('kv').delete().eq('key', key));
      return { key: key, deleted: true };
    }
  };

  /* Cache síncrono do kv, para painéis que leem de forma síncrona (Grimório).
     appKV.load(prefixo) hidrata; appKV.save(chave, valor) grava em segundo plano. */
  window.appKV = {
    cache: {},
    async load(prefix) {
      await window.__appReady;
      var r = fail(await sb.from('kv').select('key,value').like('key', prefix + '%'));
      var self = this;
      (r.data || []).forEach(function (row) { try { self.cache[row.key] = JSON.parse(row.value); } catch (e) {} });
    },
    get(key, fallback) { return Object.prototype.hasOwnProperty.call(this.cache, key) ? this.cache[key] : fallback; },
    save(key, value) {
      this.cache[key] = value;
      var self = this;
      this._q = (this._q || Promise.resolve()).then(function () {
        return window.storage.set(key, JSON.stringify(value));
      }).catch(function (e) { console.error('falha ao salvar', key, e); self.onError && self.onError(e); });
      return this._q;
    }
  };

  /* ---------- API: db (coleção/documento) ---------- */
  var listeners = []; // {col, id|null, fn}

  function snapDoc(col, id, row) {
    return { id: id, exists: !!row, data: function () { return row ? row.data : undefined; } };
  }
  function snapQuery(rows) {
    var docs = rows.map(function (r) { return { id: r.id, exists: true, data: function () { return r.data; } }; });
    return { docs: docs, empty: docs.length === 0, size: docs.length, forEach: function (f) { docs.forEach(f); } };
  }
  async function fetchCol(col) {
    await window.__appReady;
    return fail(await sb.from('docs').select('id,data,created_at').eq('collection', col)).data || [];
  }
  async function fetchDoc(col, id) {
    await window.__appReady;
    return fail(await sb.from('docs').select('id,data').eq('collection', col).eq('id', id).maybeSingle()).data;
  }
  function notify(col) {
    listeners.filter(function (l) { return l.col === col; }).forEach(function (l) { l.run(); });
  }
  function newId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 10); }
  async function upsertDoc(col, id, data) {
    await window.__appReady;
    fail(await sb.from('docs').upsert({ user_id: session.user.id, collection: col, id: id, data: data, updated_at: new Date().toISOString() }));
    notify(col);
  }

  function docRef(path) {
    var i = path.indexOf('/'), col = path.slice(0, i), id = path.slice(i + 1);
    return {
      id: id,
      async get() { return snapDoc(col, id, await fetchDoc(col, id)); },
      async set(data) { await upsertDoc(col, id, data); },
      async update(patch) {
        var cur = await fetchDoc(col, id);
        await upsertDoc(col, id, Object.assign({}, cur ? cur.data : {}, patch));
      },
      async delete() {
        await window.__appReady;
        fail(await sb.from('docs').delete().eq('collection', col).eq('id', id));
        notify(col);
      },
      onSnapshot(fn, errFn) {
        var l = { col: col, run: function () { fetchDoc(col, id).then(function (row) { fn(snapDoc(col, id, row)); }, errFn || console.error); } };
        listeners.push(l); l.run();
        return function () { listeners = listeners.filter(function (x) { return x !== l; }); };
      }
    };
  }

  function colRef(col, order, lim) {
    order = order || null; lim = lim || null;
    function apply(rows) {
      if (order) {
        var f = order.f, d = order.dir === 'desc' ? -1 : 1;
        rows = rows.slice().sort(function (a, b) {
          var x = a.data[f], y = b.data[f];
          return x === y ? 0 : (x > y ? 1 : -1) * d;
        });
      }
      return lim ? rows.slice(0, lim) : rows;
    }
    return {
      orderBy(f, dir) { return colRef(col, { f: f, dir: dir || 'asc' }, lim); },
      limit(n) { return colRef(col, order, n); },
      async get() { return snapQuery(apply(await fetchCol(col))); },
      async add(data) { var id = newId(); await upsertDoc(col, id, data); return { id: id }; },
      doc(id) { return docRef(col + '/' + id); },
      onSnapshot(fn, errFn) {
        var l = { col: col, run: function () { fetchCol(col).then(function (rows) { fn(snapQuery(apply(rows))); }, errFn || console.error); } };
        listeners.push(l); l.run();
        return function () { listeners = listeners.filter(function (x) { return x !== l; }); };
      }
    };
  }

  var db = { collection: function (c) { return colRef(c); }, doc: docRef };

  /* Os painéis chamam claude.use('db') e claude.use('sample').
     'sample' (IA do claude.ai) não existe aqui: devolve null e os painéis desligam essas funções. */
  window.claude = window.claude || {};
  window.claude.use = async function (name) {
    if (name === 'db') { await window.__appReady; return db; }
    return null;
  };

  // Recarrega as listas ao voltar para a aba (outro dispositivo pode ter gravado).
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && session) listeners.forEach(function (l) { l.run(); });
  });

  /* ---------- boot ---------- */
  async function boot() {
    if (!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY || /SEU-PROJETO|COLE_AQUI/.test(cfg.SUPABASE_URL + cfg.SUPABASE_ANON_KEY)) {
      document.addEventListener('DOMContentLoaded', function () { showLogin('Configure assets/config.js com a URL e a chave anon do Supabase.'); });
      return;
    }
    await loadScript(SUPABASE_JS);
    sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: 'central-pessoal-auth' }
    });
    var go = async function () {
      var r = await sb.auth.getSession();
      await onSession(r.data.session);
      sb.auth.onAuthStateChange(function (ev, s) { if (ev === 'SIGNED_OUT') location.reload(); });
    };
    if (document.body) go(); else document.addEventListener('DOMContentLoaded', go);
  }
  boot().catch(function (e) {
    console.error(e);
    document.addEventListener('DOMContentLoaded', function () { showLogin('Não foi possível conectar ao Supabase.'); });
  });
})();
