/* Foco do dia + anotação rápida (Central). Duas ideias só:
   - "foco": a única coisa que importaria hoje, com um primeiro passo opcional. Sem prazo, sem culpa: "Hoje não" apenas esconde o cartão.
   - "captura": anotar sem classificar. Depois dá para transformar uma anotação no foco.
   Dados: coleção "foco" (id = data ISO) e coleção "captura" (id aleatório). A tela atualiza na hora; o banco recebe depois. */
(function (root) {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

  var ctx = null, el = null, editandoPasso = false, aviso = '';

  function dados() { return ctx.dados(); }
  function dia() { return root.CP_PROG.iso(new Date()); }
  function docFoco() {
    var d = dados(), k = dia(), x = d.foco.filter(function (f) { return f.date === k; })[0];
    if (!x) { x = { id: k, date: k, texto: '', passo: '', feito: false, dispensado: false }; d.foco.push(x); }
    return x;
  }
  function salvaFoco(x) {
    var o = { date: x.date, texto: x.texto, passo: x.passo || '', feito: !!x.feito, dispensado: !!x.dispensado, atualizadoEm: new Date().toISOString() };
    ctx.db().then(function (db) { return db.doc('foco/' + x.date).set(o); }).catch(function (e) { console.error('foco não salvou', e); aviso = 'Não consegui salvar agora. Tente de novo.'; ctx.refresh(); });
  }
  function salvaCaptura(x) {
    var o = { texto: x.texto, criado: x.criado, feito: !!x.feito };
    ctx.db().then(function (db) { return db.doc('captura/' + x.id).set(o); }).catch(function (e) { console.error('anotação não salvou', e); aviso = 'Não consegui salvar agora. Tente de novo.'; ctx.refresh(); });
  }

  function defineFoco(texto, passo) {
    texto = String(texto || '').trim(); if (!texto) return;
    var x = docFoco(); x.texto = texto.slice(0, 140); x.passo = String(passo || '').trim().slice(0, 140); x.feito = false; x.dispensado = false;
    editandoPasso = false; salvaFoco(x); ctx.refresh();
  }

  function render() {
    if (!el) return;
    var p = ctx.calc(), f = p.foco, ab = p.captura.abertas, h = '';
    h += '<div class="rotulo">Foco de hoje</div>';
    if (f.hoje && f.feito) {
      h += '<div class="foco-feito"><b>✓ ' + esc(f.hoje.texto) + '</b><small>Feito. O resto do dia é bônus.</small></div>' +
        '<button type="button" class="lk" data-f="desfazer">Desfazer</button>';
    } else if (f.hoje) {
      h += '<div class="foco-txt">' + esc(f.hoje.texto) + '</div>';
      if (f.hoje.passo) h += '<div class="mini">Primeiro passo: ' + esc(f.hoje.passo) + '</div>';
      else if (editandoPasso) h += '<form class="foco-passo" data-f="passo-ok"><input id="foco-passo-in" maxlength="140" autocomplete="off" placeholder="O que dá para fazer em 2 minutos?" aria-label="Primeiro passo"><button class="btn" type="submit">Salvar</button></form>';
      else h += '<button type="button" class="lk" data-f="passo">+ Primeiro passo pequeno (opcional)</button>';
      h += '<div class="acoes"><button type="button" class="btn" data-f="feito">Feito ✓</button><button type="button" class="btn sec" data-f="trocar">Trocar</button><button type="button" class="btn sec" data-f="hoje-nao">Hoje não</button></div>';
    } else if (f.dispensado) {
      h += '<div class="mini">Sem foco hoje, tudo bem. Dias assim acontecem.</div><button type="button" class="lk" data-f="trocar">Escolher um mesmo assim</button>';
    } else {
      h += '<form class="foco-novo" data-f="novo"><label for="foco-in" class="mini">Se só uma coisa desse certo hoje, qual seria?</label>' +
        '<div class="foco-lin"><input id="foco-in" maxlength="140" autocomplete="off" placeholder="Ex.: responder o e-mail do aluguel"><button class="btn" type="submit">Definir</button></div></form>';
      var sug = [];
      if (f.pendenteAnterior) sug.push(['Ontem ficou: ' + f.pendenteAnterior.texto, f.pendenteAnterior.texto]);
      ab.slice(0, 3).forEach(function (a) { sug.push([a.texto, a.texto]); });
      if (sug.length) h += '<div class="chips">' + sug.map(function (s, i) { return '<button type="button" class="chip" data-f="usa" data-i="' + i + '">' + esc(s[0]) + '</button>'; }).join('') + '</div>';
      render.sug = sug;
    }
    h += '<form class="cap" data-f="cap"><label for="cap-in" class="sr">Anotar para não esquecer</label><input id="cap-in" maxlength="200" autocomplete="off" placeholder="Anotar para não esquecer"><button class="btn sec" type="submit">Anotar</button></form>';
    h += '<div class="mini" role="status" aria-live="polite">' + esc(aviso) + '</div>';
    if (ab.length) {
      h += '<details class="caps"><summary>Anotações (' + ab.length + ')</summary>' + ab.map(function (a) {
        return '<div class="cap-it"><span>' + esc(a.texto) + '</span><button type="button" class="lk" data-f="cap-foco" data-id="' + esc(a.id) + '">Foco</button><button type="button" class="lk" data-f="cap-ok" data-id="' + esc(a.id) + '" aria-label="Tirar da lista">✓</button></div>';
      }).join('') + '</details>';
    }
    var tinhaFoco = document.activeElement && document.activeElement.id, guarda = {};
    ['foco-in', 'cap-in'].forEach(function (id) { var i = document.getElementById(id); if (i && i.value) guarda[id] = i.value; }); // não apaga o que está sendo digitado
    el.innerHTML = h;
    Object.keys(guarda).forEach(function (id) { var i = document.getElementById(id); if (i) i.value = guarda[id]; });
    if (tinhaFoco && document.getElementById(tinhaFoco)) document.getElementById(tinhaFoco).focus();
    if (editandoPasso && document.getElementById('foco-passo-in')) document.getElementById('foco-passo-in').focus();
  }

  function onSubmit(e) {
    var f = e.target.closest('form'); if (!f) return; e.preventDefault(); aviso = '';
    var a = f.dataset.f;
    if (a === 'novo') defineFoco(f.querySelector('input').value, '');
    else if (a === 'passo-ok') { var x = docFoco(); x.passo = f.querySelector('input').value.trim().slice(0, 140); editandoPasso = false; salvaFoco(x); ctx.refresh(); }
    else if (a === 'cap') {
      var v = f.querySelector('input').value.trim(); if (!v) return;
      var c = { id: uid(), texto: v.slice(0, 200), criado: new Date().toISOString(), feito: false };
      dados().captura.push(c); salvaCaptura(c); aviso = 'Anotado ✓'; ctx.refresh();
    }
  }
  function onClick(e) {
    var b = e.target.closest('button[data-f]'); if (!b) return; aviso = '';
    var a = b.dataset.f, x;
    if (a === 'feito') { x = docFoco(); x.feito = true; salvaFoco(x); ctx.refresh(); }
    else if (a === 'desfazer') { x = docFoco(); x.feito = false; salvaFoco(x); ctx.refresh(); }
    else if (a === 'trocar') { x = docFoco(); x.texto = ''; x.passo = ''; x.feito = false; x.dispensado = false; editandoPasso = false; salvaFoco(x); ctx.refresh(); setTimeout(function () { var i = document.getElementById('foco-in'); if (i) i.focus(); }, 0); }
    else if (a === 'hoje-nao') { x = docFoco(); x.texto = ''; x.passo = ''; x.feito = false; x.dispensado = true; editandoPasso = false; salvaFoco(x); ctx.refresh(); }
    else if (a === 'passo') { editandoPasso = true; render(); }
    else if (a === 'usa') { var s = (render.sug || [])[+b.dataset.i]; if (s) defineFoco(s[1], ''); }
    else if (a === 'cap-ok' || a === 'cap-foco') {
      var c = dados().captura.filter(function (y) { return y.id === b.dataset.id; })[0]; if (!c) return;
      if (a === 'cap-foco') defineFoco(c.texto, '');
      c.feito = true; salvaCaptura(c); ctx.refresh();
    }
  }

  root.CP_FOCO = {
    // ctx = { dados(): DADOS, db(): Promise<db>, calc(): resultado de CP_PROG.calcular, refresh(): redesenha a Central }
    init: function (c, alvo) { ctx = c; el = alvo; el.addEventListener('submit', onSubmit); el.addEventListener('click', onClick); },
    render: render
  };
})(window);
