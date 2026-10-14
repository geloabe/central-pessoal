/* Rascunho automático: guarda no aparelho o que você digita em campos de texto (diário, currículo, vaga, notas)
   e devolve se a página recarregar antes de salvar. Some sozinho quando o campo é esvaziado (depois de salvar). */
(function () {
  'use strict';
  var PREFIXO = 'rasc:' + location.pathname.replace(/[^a-z0-9]/gi, '') + ':';
  var IGNORAR = /(^|-|_)(q|search|busca|filter|filtro|kw|login|email|pass|senha)($|-|_)|^app-|^f[A-Z]/;
  function ok(e) {
    if (!e.id || IGNORAR.test(e.id)) return false;
    if (e.closest('#app-login, dialog')) return false;
    if (e.tagName === 'TEXTAREA') return true;
    return e.tagName === 'INPUT' && (e.type === 'text' || e.type === '');
  }
  function ls(f) { try { return f(); } catch (x) { return null; } }
  function grava(e) {
    if (!ok(e)) return;
    if (e.value) ls(function () { localStorage.setItem(PREFIXO + e.id, JSON.stringify({ v: e.value, t: Date.now() })); });
    else ls(function () { localStorage.removeItem(PREFIXO + e.id); });
  }
  function restaura(e) {
    if (!ok(e) || e.value || e.dataset.rascOk) return;
    e.dataset.rascOk = '1';
    var raw = ls(function () { return localStorage.getItem(PREFIXO + e.id); });
    if (!raw) return;
    try {
      var d = JSON.parse(raw);
      if (!d || !d.v || Date.now() - d.t > 14 * 864e5) { ls(function () { localStorage.removeItem(PREFIXO + e.id); }); return; }
      e.value = d.v;
      e.dispatchEvent(new Event('input', { bubbles: true }));
      e.classList.add('com-rascunho');
      e.title = 'Rascunho recuperado';
    } catch (x) {}
  }
  document.addEventListener('input', function (ev) { grava(ev.target); }, true);
  // ao salvar/adicionar, o rascunho daquele bloco deixa de existir (o dado agora está no banco)
  var SALVAR = /salvar|adicionar|registrar|criar|guardar|enviar|save|add/i;
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('button');
    if (!b) return;
    var rot = (b.id || '') + ' ' + (b.textContent || '');
    if (!SALVAR.test(rot)) return;
    var bloco = b.closest('form,.card,section,.panel,.tab-panel,dialog') || document;
    setTimeout(function () { bloco.querySelectorAll('textarea[id],input[id]').forEach(function (e) { if (ok(e)) ls(function () { localStorage.removeItem(PREFIXO + e.id); }); }); }, 700);
  }, true);
  function varre() { document.querySelectorAll('textarea[id],input[id]').forEach(restaura); }
  function inicia() {
    var t = 0, iv = setInterval(function () { varre(); if (++t > 12) clearInterval(iv); }, 500);
    new MutationObserver(function () { varre(); }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inicia); else inicia();
})();
