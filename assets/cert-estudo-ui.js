/* Interface de estudo da certificação: leitor de aula, cartões, quiz, simulado cronometrado e guia de lab.
   Abre uma camada em tela cheia (#modo) sobre a página. Depende de CP_CERT, CP_ESTUDO e do conteúdo em CP_CERT_CONTEUDO.
   A página entrega: obter() -> dados atuais, salvar(patch) -> Promise, hoje() -> Date, aoFechar() -> redesenha a página. */
(function (root) {
  'use strict';
  var E = root.CP_ESTUDO, K = root.CP_PLANO_ESTUDO || root.CP_CERT, CONT = root.CP_CONTEUDO_ESTUDO || root.CP_CERT_CONTEUDO || { dias: {} };
  /* Rótulos configuráveis: a certificação usa os padrões; o PDI entrega K.ROTULOS (aula, fontes oficiais etc.) */
  function ROT(k, padrao) { return (K.ROTULOS && K.ROTULOS[k]) || padrao; }
  var ctx = null, modo = null, S = null, R = null, tempo = null, sujoT = null, emVoo = 0, ultimaEscrita = 0;
  var LET = 'ABCDE';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(s) { return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>'); }
  /* Trechos de código às vezes vêm como parágrafo comum: detecta pelas linhas (indentação, import, SELECT, gcloud, atribuições, pipes...) */
  var COD = /^(\s{2,}\S|import |from |def |class |with |for |if |return |@|SELECT\b|FROM\b|WHERE\b|GROUP BY|ORDER BY|CREATE |ALTER |INSERT |MERGE |WITH |gcloud |bq |gsutil |pip |python |export |cat |echo |curl |\||\)|\(|[A-Za-z_][A-Za-z0-9_.]*\s*=|[A-Za-z_][A-Za-z0-9_.]*\(|#|\/\/|--)/;
  function pareceCodigo(p) { var L = String(p).split('\n').filter(function (l) { return l.trim(); }); if (L.length < 2) return false; return L.filter(function (l) { return COD.test(l); }).length / L.length >= 0.7; }
  function par(p) { if (/^```/.test(p)) return '<pre><code>' + esc(String(p).replace(/^```[a-z]*\n?/, '').replace(/```\s*$/, '')) + '</code></pre>'; if (pareceCodigo(p)) return '<pre><code>' + esc(p) + '</code></pre>'; return '<p>' + fmt(p) + '</p>'; }
  function iso(d) { return K.iso(d); }
  function diaPlano() { var e = K.estado(ctx.obter(), ctx.hoje()); return e.ativo ? e.diaPlano : 1; }

  /* ---------- estilo ---------- */
  var css = '#modo{position:fixed;inset:0;z-index:1000;background:var(--t-bg);color:var(--t-ink);overflow-y:auto;-webkit-overflow-scrolling:touch}' +
    '#modo[hidden]{display:none}' +
    '.mo-top{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:8px 16px;padding-top:calc(8px + env(safe-area-inset-top));background:var(--t-surface);border-bottom:3px solid var(--m)}' +
    '.mo-top b{font:600 16px var(--f-titulo);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.mo-top .tm{font:600 15px var(--f-mono)}.mo-top .tm.urg{color:#C0392B}' +
    '.mo-corpo{max-width:760px;margin:0 auto;padding:16px 16px calc(96px + env(safe-area-inset-bottom))}' +
    '.mo-corpo h1{font-size:26px;margin-bottom:8px}.mo-corpo h2{font-size:20px;margin:22px 0 8px}' +
    '.mo-corpo p{margin:8px 0;line-height:1.6}.mo-corpo ul{padding-left:20px;margin:8px 0}.mo-corpo li{margin:6px 0;line-height:1.55}' +
    '.mo-corpo code{font:13px var(--f-mono);background:var(--t-realce);padding:1px 5px}' +
    '.mo-corpo pre{background:var(--t-realce);padding:12px;overflow-x:auto;margin:10px 0;border-left:3px solid var(--m)}.mo-corpo pre code{background:none;padding:0;font-size:13px;line-height:1.5;white-space:pre}' +
    '.mo-lead{font-size:17px;color:var(--t-muted);line-height:1.5}' +
    '.tab-w{overflow-x:auto;margin:10px 0;border:1px solid var(--t-line)}.tab-w table{border-collapse:collapse;min-width:100%;font-size:14px}' +
    '.tab-w th,.tab-w td{padding:8px 10px;border-bottom:1px solid var(--t-line);text-align:left;vertical-align:top}.tab-w th{background:var(--t-realce);font-weight:600;white-space:nowrap}' +
    '.call{margin:10px 0;padding:10px 12px;border-left:4px solid var(--t-accent2);background:var(--t-realce);font-size:15px;line-height:1.5}.call.arm{border-left-color:#C0392B;background:color-mix(in srgb,#C0392B 8%,var(--t-surface))}' +
    '.call b.rt{display:block;font:600 11px var(--f-mono);letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px}' +
    '.cx{background:var(--t-surface);border:1px solid var(--t-line);padding:14px;margin:14px 0}' +
    '.mo-btns{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}.mo-btns .btn{min-height:50px;font-size:16px;flex:1;min-width:140px}' +
    '.btn[disabled]{opacity:.45;cursor:default}' +
    '.mo-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}' +
    '.mo-corpo textarea{width:100%;min-height:120px;font:inherit;font-size:16px;padding:10px;border:1px solid var(--t-borda);background:var(--t-bg);color:var(--t-ink);border-radius:var(--raio)}' +
    '.op{display:flex;gap:12px;align-items:flex-start;width:100%;text-align:left;margin:8px 0;padding:12px;min-height:52px;font:inherit;font-size:16px;line-height:1.4;border:1px solid var(--t-borda);background:var(--t-surface);color:var(--t-ink);border-radius:var(--raio);cursor:pointer}' +
    '.op .lt{flex:none;width:28px;height:28px;display:grid;place-items:center;border:1px solid var(--t-borda);font:600 13px var(--f-mono)}' +
    '.op.sel{border-color:var(--m);background:color-mix(in srgb,var(--m) 12%,var(--t-surface))}.op.sel .lt{background:var(--m);color:var(--t-accent-ink);border-color:var(--m)}' +
    '.op.certa{border-color:var(--t-ok);background:color-mix(in srgb,var(--t-ok) 16%,var(--t-surface))}.op.errada{border-color:#C0392B;background:color-mix(in srgb,#C0392B 12%,var(--t-surface))}' +
    '.enun{font-size:17px;line-height:1.55;margin:6px 0 10px}' +
    '.fb{margin:12px 0;padding:12px;border-left:4px solid var(--t-ok);background:color-mix(in srgb,var(--t-ok) 10%,var(--t-surface))}.fb.no{border-left-color:#C0392B;background:color-mix(in srgb,#C0392B 8%,var(--t-surface))}.fb b.rt{display:block;margin-bottom:4px}' +
    '.pal{display:grid;grid-template-columns:repeat(auto-fill,minmax(40px,1fr));gap:6px;margin:14px 0}' +
    '.pal button{min-height:40px;border:1px solid var(--t-borda);background:var(--t-bg);color:var(--t-ink);font:600 13px var(--f-mono);cursor:pointer;padding:0}' +
    '.pal button.r{background:color-mix(in srgb,var(--m) 22%,var(--t-surface))}.pal button.m{border:2px dashed var(--t-accent2)}.pal button.a{outline:2px solid var(--m)}' +
    '.card3{min-height:230px;display:flex;flex-direction:column;justify-content:center;gap:12px;padding:20px;background:var(--t-surface);border:1px solid var(--t-line);font-size:19px;line-height:1.5;text-align:center}' +
    '.card3 .v{font-size:17px;color:var(--t-ink);text-align:left;border-top:1px solid var(--t-line);padding-top:12px}' +
    '.notas4{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:12px}.notas4 .btn{min-height:52px;font-size:14px;padding:4px}' +
    '.big{font:600 40px var(--f-titulo)}.res .ok{color:var(--t-ok)}.res .no{color:#C0392B}' +
    '.passo{display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-top:1px solid var(--t-line)}.passo:first-of-type{border-top:0}.passo .n{flex:none;width:28px;height:28px;display:grid;place-items:center;border:1px solid var(--t-borda);font:600 13px var(--f-mono)}.passo.ok .n{background:var(--t-ok);border-color:var(--t-ok);color:#fff}' +
    '.passo>div{flex:1;min-width:0}.cp{margin-top:6px;min-height:36px;padding:0 10px;font:600 12px var(--f-mono);border:1px solid var(--t-borda);background:var(--t-bg);color:var(--t-ink);cursor:pointer}' +
    '.prog{height:6px;background:var(--t-line);margin:8px 0 0}.prog i{display:block;height:100%;background:var(--m)}' +
    '.lista-l a{display:block;padding:10px 0;border-top:1px solid var(--t-line);color:var(--t-accent);word-break:break-word;font-weight:600}.gt{margin:8px 0;line-height:1.5}' +
    '.call.fnt{border-left-color:var(--t-ok)}.call.fnt a{color:var(--t-accent);font-weight:600;word-break:break-word}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- camada ---------- */
  function abrir(titulo, html) {
    if (!modo) { modo = document.createElement('div'); modo.id = 'modo'; document.body.appendChild(modo); }
    modo.innerHTML = '<div class="mo-top"><button class="lk" id="mo-v" style="min-height:40px">← Voltar</button><b>' + esc(titulo) + '</b><span class="tm" id="mo-ses"></span><span class="tm" id="mo-tm"></span></div><div class="mo-corpo" id="mo-c">' + html + '</div>';
    modo.hidden = false; document.body.style.overflow = 'hidden'; modo.scrollTop = 0;
    modo.querySelector('#mo-v').onclick = function () { if (S && S.modo === 'sim' && !S.fim && !confirm('Sair do simulado? O progresso desta tentativa será perdido.')) return; fechar(); };
  }
  function corpo(html) { var c = modo.querySelector('#mo-c'); c.innerHTML = html; modo.scrollTop = 0; }
  function fechar() {
    if (tempo) { clearInterval(tempo); tempo = null; }
    pararSessao(); A = null;
    descarregar(); S = null; R = null;
    if (modo) modo.hidden = true; document.body.style.overflow = '';
    if (ctx.aoFechar) ctx.aoFechar();
  }

  /* ---------- escrita (uma de cada vez, com debounce para o SRS) ---------- */
  var sujo = {};
  function persistir(patch) {
    emVoo++; ultimaEscrita = Date.now();
    return Promise.resolve(ctx.salvar(patch)).catch(function (e) { console.error('falha ao salvar', e); }).then(function () { emVoo--; ultimaEscrita = Date.now(); });
  }
  function marcarSujo(campo) { sujo[campo] = 1; if (sujoT) clearTimeout(sujoT); sujoT = setTimeout(descarregar, 900); }
  function descarregar() {
    if (sujoT) { clearTimeout(sujoT); sujoT = null; }
    var C = ctx.obter(), p = {}, tem = false;
    Object.keys(sujo).forEach(function (k) { p[k] = C[k]; tem = true; }); sujo = {};
    if (tem) persistir(p);
  }
  function srsNota(id, nota) { var C = ctx.obter(); var m = Object.assign({}, C.srs || {}); m[id] = E.proximo(m[id], nota, ctx.hoje()); C.srs = m; marcarSujo('srs'); }
  function ocupado() { return emVoo > 0 || !!sujoT || (Date.now() - ultimaEscrita) < 2500; }

  /* ---------- aula (modo foco: um bloco por tela, com "Em 30 segundos", glossário e cronômetro de sessão) ---------- */
  var A = null, ses = null, sesT = null;
  function nPal(s) { return String(s || '').trim().split(/\s+/).filter(Boolean).length; }
  function palBloco(b) {
    var n = nPal(b.t) + nPal(b.facil) + (b.p || []).reduce(function (x, p) { return x + nPal(p); }, 0) + (b.lista || []).reduce(function (x, p) { return x + nPal(p); }, 0) + nPal(b.dica) + nPal(b.armadilha);
    if (b.tabela) n += b.tabela.linhas.reduce(function (x, l) { return x + l.reduce(function (y, c) { return y + nPal(c); }, 0); }, 0);
    return n;
  }
  function minBloco(b) { return Math.max(1, Math.round(palBloco(b) / 170)); }
  function minutosAula(n) { var a = CONT.dias[n] && CONT.dias[n].aula; if (!a) return 0; return (a.blocos || []).reduce(function (x, b) { return x + minBloco(b); }, 0) + 3; }
  function tabelaHtml(t) { return '<div class="tab-w"><table><thead><tr>' + t.cab.map(function (c) { return '<th>' + fmt(c) + '</th>'; }).join('') + '</tr></thead><tbody>' + t.linhas.map(function (l) { return '<tr>' + l.map(function (c) { return '<td>' + fmt(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>'; }
  function blocoHtml(b) {
    var h = '<h2>' + esc(b.t) + '</h2>';
    if (b.facil) h += '<div class="call fac"><b class="rt">Traduzindo</b>' + fmt(String(b.facil).replace(/^\s*Traduzindo:\s*/i, '')) + '</div>';
    h += (b.p || []).map(par).join('');
    if (b.lista && b.lista.length) h += '<ul>' + b.lista.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul>';
    if (b.tabela) h += tabelaHtml(b.tabela);
    if (b.dica) h += '<div class="call"><b class="rt">Dica</b>' + fmt(b.dica) + '</div>';
    if (b.armadilha) h += '<div class="call arm"><b class="rt">Armadilha</b>' + fmt(b.armadilha) + '</div>';
    if (b.fonte && /^https:\/\//.test(b.fonte[1] || '')) h += '<div class="call fnt"><b class="rt">Fonte oficial</b><a href="' + esc(b.fonte[1]) + '" target="_blank" rel="noopener noreferrer">' + esc(b.fonte[0]) + '</a></div>';
    return h;
  }
  function glossHtml(a) {
    if (!a.glossario || !a.glossario.length) return '';
    return '<details class="gl"><summary>Termos desta aula (' + a.glossario.length + ')</summary><div class="corpo">' + a.glossario.map(function (g) { return '<div class="gt"><b>' + esc(g.t) + '</b> ' + fmt(g.d) + '</div>'; }).join('') + '</div></details>';
  }
  function docsHtml(n) {
    var d = K.DOCS_DIA && K.DOCS_DIA[n]; if (!d || !d.length) return '';
    return '<h2>' + esc(ROT('fontesTitulo', 'Para aprofundar (documentação oficial)')) + '</h2><p class="mini" style="font-size:14px;color:var(--t-muted)">' + esc(ROT('fontesNota', 'Opcional. Leia só se quiser ir além da aula.')) + '</p><div class="lista-l">' + d.map(function (x) { return '<a href="' + esc(x[1]) + '" target="_blank" rel="noopener noreferrer">' + esc(x[0]) + '</a>'; }).join('') + '</div>';
  }
  function barraProg() {
    var a = CONT.dias[A.n].aula, nb = (a.blocos || []).length, tot = nb + 1, p = Math.round(A.passo / tot * 100), rest = 0;
    for (var i = Math.max(0, A.passo - 1); i < nb; i++) rest += minBloco(a.blocos[i]);
    var rot = A.passo === 0 ? 'Começo · ' + nb + ' blocos · ~' + minutosAula(A.n) + ' min no total' : A.passo > nb ? 'Final: fixar o que você viu' : 'Bloco ' + A.passo + ' de ' + nb + ' · faltam ~' + rest + ' min';
    return '<div class="prog"><i style="width:' + p + '%"></i></div><div class="mini" style="font-size:13px;color:var(--t-muted);margin:4px 0 14px">' + rot + '</div>';
  }
  function introHtml(n) {
    var a = CONT.dias[n].aula, s = a.simples, ant = (ctx.obter().leitura || {})[n] || 0, nb = (a.blocos || []).length;
    var alto = K.TOPICOS.filter(function (x) { return x.d.indexOf(n) >= 0 && x.foco === 'alto'; })[0];
    var h = '<div class="mo-tags"><span class="tag">' + ROT('dia', 'Dia').toUpperCase() + ' ' + n + '</span><span class="tag">AULA</span>' + (alto ? '<span class="tag za">PRIORIDADE ALTA NA PROVA</span>' : '') + '</div><h1>' + esc(a.titulo) + '</h1>' + (alto ? '<p class="mini" style="font-size:14px;color:var(--t-muted);margin:0 0 8px">Por quê: ' + esc(alto.por) + '</p>' : '');
    if (s) {
      h += '<div class="cx" style="margin-top:6px"><div class="rotulo" style="margin-bottom:6px">Em 30 segundos</div>' + par(s.analogia) + '<ul>' + s.pontos.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul>' + (s.paraQueServe ? '<p><b>Para que serve:</b> ' + fmt(s.paraQueServe) + '</p>' : '') + '</div>';
    } else h += '<p class="mo-lead">' + fmt(a.resumo) + '</p>';
    h += glossHtml(a);
    h += '<h2>Quanto tempo você tem agora?</h2><p class="mini" style="font-size:14px;color:var(--t-muted)">Sessão curta com pausa embutida. Seu ponto de leitura fica salvo: dá para parar a qualquer momento.</p>';
    h += '<div class="mo-btns"><button class="btn" id="a-s10">10 minutos</button><button class="btn" id="a-s25">25 minutos</button><button class="btn sec" id="a-s0">Sem cronômetro</button></div>';
    if (ant > 0 && ant <= nb) h += '<p class="mini" style="font-size:14px;margin-top:12px">Você parou no bloco ' + ant + '. Ao escolher o tempo acima, a leitura continua dali.</p><div class="mo-btns"><button class="btn sec" id="a-rec">Recomeçar do início</button></div>';
    h += '<p style="margin-top:16px"><button class="lk" id="a-todo">Prefiro ler tudo de uma vez</button></p>';
    return h;
  }
  function finalHtml(n) {
    var d = CONT.dias[n], a = d.aula, h = '<div class="mo-tags"><span class="tag">' + ROT('dia', 'Dia').toUpperCase() + ' ' + n + '</span><span class="tag">FINAL</span></div>';
    if (a.exemplo) h += '<h2>Caso trabalhado: ' + esc(a.exemplo.t) + '</h2><div class="cx">' + par(a.exemplo.texto) + '</div>';
    if (a.prova && a.prova.length) h += '<h2>' + esc(ROT('prova', 'Como a prova cobra')) + '</h2><ul>' + a.prova.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul>';
    if (K.RELATOS_DIA && K.RELATOS_DIA[n]) h += '<div class="call"><b class="rt">Relato de candidatos (complemento; o oficial prevalece)</b>' + K.RELATOS_DIA[n].map(fmt).join('<br>') + '</div>';
    if (a.checagem && a.checagem.length) h += '<h2>Autoteste: responda em voz alta, sem olhar</h2><div class="cx"><ul>' + a.checagem.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul><p class="mini" style="font-size:13px;color:var(--t-muted)">Se travar em alguma, volte só ao bloco dela. Errar aqui ajuda a lembrar depois.</p></div>';
    if (a.explique) h += '<h2>Explique com suas palavras</h2><p>' + fmt(a.explique) + '</p><textarea id="nota" placeholder="Escreva sem consultar a aula. Se travar, releia só o trecho que faltou.">' + esc((ctx.obter().notas || {})[n] || '') + '</textarea>';
    h += docsHtml(n);
    h += '<div class="mo-btns"><button class="btn" id="a-lida">Concluí a aula</button>' + (d.cartoes && d.cartoes.length ? '<button class="btn sec" id="a-cart">Cartões do dia</button>' : '') + (d.questoes && d.questoes.length ? '<button class="btn sec" id="a-quiz">Quiz do dia</button>' : '') + '</div>';
    return h;
  }
  function guardarPasso() { var C = ctx.obter(), L = Object.assign({}, C.leitura || {}); if (L[A.n] !== A.passo) { L[A.n] = A.passo; C.leitura = L; marcarSujo('leitura'); } }
  function abrirAula(n) {
    if (!CONT.dias[n] || !CONT.dias[n].aula) { alert('A aula deste dia ainda não está disponível.'); return; }
    A = { n: n, passo: 0, tudo: false };
    abrir(ROT('dia', 'Dia') + ' ' + n + ' · aula', ''); telaAula();
  }
  function telaAula() {
    var n = A.n, a = CONT.dias[n].aula, bl = a.blocos || [], nb = bl.length, h = '';
    if (A.tudo) {
      h = '<div class="mo-tags"><span class="tag">' + ROT('dia', 'Dia').toUpperCase() + ' ' + n + '</span><span class="tag">AULA COMPLETA</span></div><h1>' + esc(a.titulo) + '</h1>' + (a.simples ? '<div class="cx"><div class="rotulo" style="margin-bottom:6px">Em 30 segundos</div>' + par(a.simples.analogia) + '<ul>' + a.simples.pontos.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul></div>' : '<p class="mo-lead">' + fmt(a.resumo) + '</p>') + glossHtml(a) + bl.map(blocoHtml).join('') + finalHtml(n);
      corpo(h); ligarFinal(); return;
    }
    h = barraProg();
    if (A.passo === 0) h += introHtml(n);
    else if (A.passo <= nb) {
      h += '<div class="mo-tags"><span class="tag">' + ROT('dia', 'Dia').toUpperCase() + ' ' + n + '</span><span class="tag">BLOCO ' + A.passo + '/' + nb + '</span></div>' + blocoHtml(bl[A.passo - 1]);
      h += '<div class="mo-btns"><button class="btn sec" id="a-ant">← Anterior</button><button class="btn" id="a-prox">' + (A.passo === nb ? 'Ir para o final' : 'Próximo bloco →') + '</button></div>';
    } else h += finalHtml(n);
    corpo(h);
    var g = function (id) { return modo.querySelector(id); };
    if (A.passo === 0) {
      var ant = (ctx.obter().leitura || {})[n] || 0;
      var comecar = function (min) { if (min) iniciarSessao(min); A.passo = (ant > 0 && ant <= nb && !A.recomecar) ? ant : 1; guardarPasso(); telaAula(); };
      g('#a-s10').onclick = function () { comecar(10); }; g('#a-s25').onclick = function () { comecar(25); }; g('#a-s0').onclick = function () { comecar(0); };
      if (g('#a-rec')) g('#a-rec').onclick = function () { A.recomecar = true; g('#a-rec').textContent = 'Vai recomeçar do bloco 1 ✓'; };
      g('#a-todo').onclick = function () { A.tudo = true; telaAula(); };
    } else if (A.passo <= nb) {
      g('#a-prox').onclick = function () { A.passo++; guardarPasso(); telaAula(); };
      g('#a-ant').onclick = function () { A.passo = Math.max(0, A.passo - 1); guardarPasso(); telaAula(); };
    } else ligarFinal();
  }
  function ligarFinal() {
    var n = A.n, c = modo.querySelector('#mo-c');
    var salvarNota = function () { var t = c.querySelector('#nota'); if (!t) return; var C = ctx.obter(), N = Object.assign({}, C.notas || {}); if ((N[n] || '') !== t.value) { N[n] = t.value; C.notas = N; marcarSujo('notas'); } };
    if (c.querySelector('#nota')) c.querySelector('#nota').addEventListener('blur', salvarNota);
    c.querySelector('#a-lida').onclick = function () { salvarNota(); var C = ctx.obter(), M = Object.assign({}, C.aulas || {}); if (!M[n]) { M[n] = iso(ctx.hoje()); C.aulas = M; marcarSujo('aulas'); } descarregar(); this.textContent = 'Aula concluída ✓'; };
    if (c.querySelector('#a-cart')) c.querySelector('#a-cart').onclick = function () { salvarNota(); abrirCartoes('dia', n); };
    if (c.querySelector('#a-quiz')) c.querySelector('#a-quiz').onclick = function () { salvarNota(); abrirQuiz('dia', n); };
  }

  /* cronômetro de sessão (10 ou 25 min) com pausa */
  function p2(x) { return String(x).padStart(2, '0'); }
  function iniciarSessao(min) { pararSessao(); ses = { fim: Date.now() + min * 60000, min: min }; sesT = setInterval(tickSes, 1000); tickSes(); }
  function pararSessao() { if (sesT) { clearInterval(sesT); sesT = null; } ses = null; var el = modo && modo.querySelector('#mo-ses'); if (el) el.textContent = ''; }
  function tickSes() {
    if (!ses) return; var rest = Math.max(0, Math.round((ses.fim - Date.now()) / 1000)), el = modo && modo.querySelector('#mo-ses');
    if (el) el.textContent = '⏱ ' + Math.floor(rest / 60) + ':' + p2(rest % 60);
    if (rest <= 0) { var m = ses.min; pararSessao(); telaPausa(m); }
  }
  function telaPausa(m) {
    corpo('<div class="res"><div class="big">Hora da pausa</div><p class="mo-lead">Você estudou ' + m + ' minutos. Levante, beba água, olhe para longe. Volte em uns 5 minutos.</p><p>' + (A ? 'Seu ponto está salvo' + (A.passo > 0 ? ' (bloco ' + A.passo + ')' : '') + '.' : '') + '</p></div><div class="mo-btns"><button class="btn" id="p-mais">Continuar mais 10 min</button><button class="btn sec" id="p-sair">Encerrar por agora</button></div>');
    modo.querySelector('#p-mais').onclick = function () { iniciarSessao(10); if (A) telaAula(); };
    modo.querySelector('#p-sair').onclick = fechar;
  }

  /* ---------- cartões ---------- */
  function abrirCartoes(tipo, n) {
    var C = ctx.obter(), dp = diaPlano(), fila, titulo;
    if (tipo === 'dia') {
      var cs = (CONT.dias[n].cartoes || []).map(function (c) { return Object.assign({ dia: +n }, c); });
      var f = E.filaCartoes(CONT, C.srs, ctx.hoje(), Math.max(dp, n), { maxNovos: 99 });
      var due = f.devidos.filter(function (c) { return c.dia !== +n; });
      fila = cs.filter(function (c) { var s = (C.srs || {})[c.id]; return !s || s.p <= iso(ctx.hoje()); }).concat(due.slice(0, 15)); titulo = ROT('dia', 'Dia') + ' ' + n + ' · cartões';
    } else {
      var g = E.filaCartoes(CONT, C.srs, ctx.hoje(), dp, { maxNovos: 15 });
      fila = g.devidos.concat(g.novos); titulo = 'Revisão de cartões';
    }
    if (!fila.length) { abrir(titulo, '<div class="cx"><b>Nada para revisar agora.</b><p>Todos os cartões liberados estão em dia. Volte amanhã: a repetição espaçada traz de volta o que vence.</p></div><div class="mo-btns"><button class="btn" id="x-ok">Voltar</button></div>'); modo.querySelector('#x-ok').onclick = fechar; return; }
    R = { itens: fila, i: 0, mostrar: false, cont: [0, 0, 0, 0] };
    abrir(titulo, ''); telaCartao();
  }
  function telaCartao() {
    if (R.i >= R.itens.length) {
      descarregar();
      var t = R.cont[0] + R.cont[1] + R.cont[2] + R.cont[3];
      corpo('<div class="res"><div class="big">' + t + ' cartões</div><p>Errei ' + R.cont[0] + ' · Difícil ' + R.cont[1] + ' · Bom ' + R.cont[2] + ' · Fácil ' + R.cont[3] + '.</p><p class="mo-lead">Os cartões que você errou voltam amanhã; os que acertou voltam em intervalos cada vez maiores (1, 3, 7, 14 e 30 dias).</p></div><div class="mo-btns"><button class="btn" id="x-ok">Concluir</button></div>');
      modo.querySelector('#x-ok').onclick = fechar; return;
    }
    var c = R.itens[R.i];
    var h = '<div class="mo-tags"><span class="tag">' + (R.i + 1) + ' / ' + R.itens.length + '</span><span class="tag">tópico ' + esc(c.t) + '</span></div><div class="card3"><div>' + fmt(c.f) + '</div>' + (R.mostrar ? '<div class="v">' + fmt(c.v) + '</div>' : '') + '</div>';
    h += R.mostrar ? '<div class="notas4"><button class="btn sec" data-n="0">Errei</button><button class="btn sec" data-n="1">Difícil</button><button class="btn" data-n="2">Bom</button><button class="btn" data-n="3">Fácil</button></div>' : '<div class="mo-btns"><button class="btn" id="c-mostra">Mostrar resposta</button></div>';
    h += '<p class="mini" style="margin-top:12px;color:var(--t-muted);font-size:13px">Tente responder em voz alta antes de revelar. Se hesitou, marque Difícil.</p>';
    corpo(h);
    var m = modo.querySelector('#c-mostra'); if (m) m.onclick = function () { R.mostrar = true; telaCartao(); };
    modo.querySelectorAll('[data-n]').forEach(function (b) { b.onclick = function () { var n = +b.dataset.n; srsNota(c.id, n); R.cont[n]++; R.i++; R.mostrar = false; telaCartao(); }; });
  }

  /* ---------- quiz e simulado ---------- */
  function iniciarQuiz(o) {
    var seed = (Date.now() & 0xffffff) + 1;
    S = { modo: o.modo, titulo: o.titulo, itens: o.itens, i: 0, resp: {}, conf: {}, marc: {}, ordem: {}, dia: o.dia, tipo: o.tipo, inicio: Date.now(), limite: o.limite || 0, fim: false };
    S.itens.forEach(function (q, k) { S.ordem[q.id] = E.ordemAlternativas(q, seed + k * 7919); });
    abrir(o.titulo, ''); telaQ();
    if (S.limite) { tempo = setInterval(tick, 1000); tick(); }
  }
  function tick() {
    if (!S || S.fim) return;
    var rest = Math.max(0, S.limite - Math.floor((Date.now() - S.inicio) / 1000)), el = modo.querySelector('#mo-tm');
    if (el) { el.textContent = Math.floor(rest / 60) + ':' + String(rest % 60).padStart(2, '0'); el.className = 'tm' + (rest < 300 ? ' urg' : ''); }
    if (rest <= 0) { finalizar(); }
  }
  function telaQ() {
    var q = S.itens[S.i], exam = S.modo === 'sim', multi = q.c.length > 1, marc = S.resp[q.id] || [], conf = !!S.conf[q.id];
    var h = '<div class="mo-tags"><span class="tag">' + (S.i + 1) + ' / ' + S.itens.length + '</span><span class="tag">tópico ' + esc(q.t) + '</span>' + (multi ? '<span class="tag za">ESCOLHA 2</span>' : '') + (exam && S.marc[q.id] ? '<span class="tag za">MARCADA</span>' : '') + '</div>';
    h += '<div class="enun">' + fmt(q.e) + '</div>';
    S.ordem[q.id].forEach(function (orig, pos) {
      var sel = marc.indexOf(orig) >= 0, cls = 'op' + (sel ? ' sel' : '');
      if (conf && !exam) cls += q.c.indexOf(orig) >= 0 ? ' certa' : (sel ? ' errada' : '');
      h += '<button class="' + cls + '" data-op="' + orig + '"' + (conf && !exam ? ' disabled' : '') + '><span class="lt">' + LET[pos] + '</span><span>' + fmt(q.o[orig]) + '</span></button>';
    });
    if (exam) {
      h += '<div class="mo-btns"><button class="btn sec" id="q-ant"' + (S.i === 0 ? ' disabled' : '') + '>Anterior</button><button class="btn sec" id="q-marca">' + (S.marc[q.id] ? 'Desmarcar' : 'Marcar para rever') + '</button><button class="btn" id="q-prox"' + (S.i === S.itens.length - 1 ? ' disabled' : '') + '>Próxima</button></div>';
      h += '<div class="pal">' + S.itens.map(function (x, k) { return '<button data-ir="' + k + '" class="' + ((S.resp[x.id] || []).length ? 'r ' : '') + (S.marc[x.id] ? 'm ' : '') + (k === S.i ? 'a' : '') + '">' + (k + 1) + '</button>'; }).join('') + '</div>';
      h += '<div class="mo-btns"><button class="btn" id="q-fim">Finalizar simulado</button></div>';
    } else if (!conf) {
      h += '<div class="mo-btns"><button class="btn" id="q-conf"' + (marc.length ? '' : ' disabled') + '>Confirmar</button></div>';
    } else {
      var ok = E.acertou(q, marc);
      h += '<div class="fb' + (ok ? '' : ' no') + '"><b class="rt">' + (ok ? 'Correto' : 'Não foi dessa vez') + '</b>' + fmt(q.x) + '</div>';
      h += '<div class="mo-btns"><button class="btn" id="q-prox">' + (S.i === S.itens.length - 1 ? 'Ver resultado' : 'Próxima') + '</button></div>';
    }
    corpo(h);
    modo.querySelectorAll('[data-op]').forEach(function (b) { b.onclick = function () {
      var o = +b.dataset.op, cur = (S.resp[q.id] || []).slice();
      if (multi) { var ix = cur.indexOf(o); if (ix >= 0) cur.splice(ix, 1); else { cur.push(o); if (cur.length > 2) cur.shift(); } } else cur = [o];
      S.resp[q.id] = cur; var y = modo.scrollTop; telaQ(); modo.scrollTop = y;
    }; });
    var g = function (id) { return modo.querySelector(id); };
    if (g('#q-conf')) g('#q-conf').onclick = function () { S.conf[q.id] = true; telaQ(); modo.scrollTop = modo.scrollHeight; };
    if (g('#q-prox')) g('#q-prox').onclick = function () { if (exam) { S.i++; telaQ(); } else if (S.i === S.itens.length - 1) finalizar(); else { S.i++; telaQ(); } };
    if (g('#q-ant')) g('#q-ant').onclick = function () { S.i--; telaQ(); };
    if (g('#q-marca')) g('#q-marca').onclick = function () { S.marc[q.id] = !S.marc[q.id]; telaQ(); };
    if (g('#q-fim')) g('#q-fim').onclick = function () {
      var vazias = S.itens.filter(function (x) { return !(S.resp[x.id] || []).length; }).length, mar = S.itens.filter(function (x) { return S.marc[x.id]; }).length;
      if (confirm('Finalizar agora? ' + (vazias ? vazias + ' sem resposta. ' : '') + (mar ? mar + ' marcada(s) para rever. ' : '') + 'Depois de finalizar não dá para voltar.')) finalizar();
    };
    modo.querySelectorAll('[data-ir]').forEach(function (b) { b.onclick = function () { S.i = +b.dataset.ir; telaQ(); }; });
  }

  function finalizar() {
    if (!S || S.fim) return; S.fim = true;
    if (tempo) { clearInterval(tempo); tempo = null; }
    var C = ctx.obter(), ok = 0, sec = {}, wrong = [];
    S.itens.forEach(function (q) {
      var r = S.resp[q.id] || [], acertou = r.length > 0 && E.acertou(q, r);
      if (acertou) ok++; else wrong.push(q);
      sec[q.s] = sec[q.s] || { ok: 0, n: 0 }; sec[q.s].n++; if (acertou) sec[q.s].ok++;
      srsNota(q.id, acertou ? 2 : 0);
    });
    var tot = S.itens.length, pct = Math.round(ok / tot * 100), patch = {};
    if (S.modo === 'dia' && S.dia) {
      var Q = Object.assign({}, C.quiz || {}), prev = Q[S.dia] || {};
      Q[S.dia] = { pct: Math.max(prev.pct || 0, pct), ultimo: pct, data: iso(ctx.hoje()), n: (prev.n || 0) + 1 }; C.quiz = Q; sujo.quiz = 1;
    }
    if (S.modo === 'sim') {
      var fraca = null, pior = 101;
      Object.keys(sec).forEach(function (s) { if (sec[s].n >= 2) { var p = sec[s].ok / sec[s].n * 100; if (p < pior) { pior = p; fraca = +s; } } });
      var L = (C.simulados || []).concat([{ id: 'ap' + Date.now().toString(36), data: iso(ctx.hoje()), tipo: S.tipo === 'completo' ? 'completo' : 'parcial', acertos: ok, total: tot, fraca: fraca, origem: 'app' }]);
      C.simulados = L; sujo.simulados = 1;
    }
    descarregar();
    var gate = '';
    if (S.modo === 'dia') gate = pct >= 80 ? '<div class="fb"><b class="rt">Dia dominado nesta etapa</b>Você passou de 80%. O quiz do dia fica fechado; os erros voltam nas revisões.</div>' : '<div class="fb no"><b class="rt">Falta pouco</b>A meta do dia é 80%. Releia os pontos dos erros abaixo e refaça só os erros: a segunda rodada costuma fechar.</div>';
    var h = '<div class="res"><div class="big ' + (pct >= 80 ? 'ok' : '') + '">' + pct + '%</div><p class="mo-lead">' + ok + ' de ' + tot + ' corretas' + (S.modo === 'sim' ? ' · tempo usado ' + Math.round((Date.now() - S.inicio) / 60000) + ' min' : '') + '.</p></div>' + gate;
    if (S.modo === 'sim') {
      h += '<h2>Por seção</h2><div class="tab-w"><table><thead><tr><th>Seção</th><th>Peso</th><th>Acertos</th></tr></thead><tbody>' + K.SECOES.map(function (s) { var x = sec[s.id]; return '<tr><td>' + s.id + '. ' + esc(s.nome) + '</td><td>' + s.peso + '%</td><td>' + (x ? x.ok + '/' + x.n + ' (' + Math.round(x.ok / x.n * 100) + '%)' : '–') + '</td></tr>'; }).join('') + '</tbody></table></div><p class="mini" style="font-size:13px;color:var(--t-muted)">O Google não divulga a nota de corte. Como referência prática, 80% ou mais nos simulados completos é uma zona segura.</p>';
    }
    h += '<h2>Revisão das questões</h2>' + S.itens.map(function (q, k) {
      var r = S.resp[q.id] || [], a = r.length > 0 && E.acertou(q, r);
      return '<details style="margin-bottom:8px"><summary>' + (a ? '✓' : '✗') + ' Q' + (k + 1) + ' · tópico ' + esc(q.t) + '</summary><div class="corpo"><div class="enun">' + fmt(q.e) + '</div>' +
        q.o.map(function (t, i) { var cls = 'op' + (q.c.indexOf(i) >= 0 ? ' certa' : (r.indexOf(i) >= 0 ? ' errada' : '')); return '<div class="' + cls + '" style="cursor:default"><span class="lt">' + (q.c.indexOf(i) >= 0 ? '✓' : (r.indexOf(i) >= 0 ? '✗' : '·')) + '</span><span>' + fmt(t) + '</span></div>'; }).join('') +
        '<div class="fb' + (a ? '' : ' no') + '"><b class="rt">Explicação</b>' + fmt(q.x) + '</div></div></details>';
    }).join('');
    h += '<div class="mo-btns">' + (wrong.length && S.modo !== 'sim' ? '<button class="btn" id="r-erros">Refazer só os erros (' + wrong.length + ')</button>' : '') + (wrong.length && S.modo === 'sim' ? '<button class="btn" id="r-erros">Treinar os ' + wrong.length + ' erros</button>' : '') + '<button class="btn sec" id="r-fecha">Concluir</button></div>';
    corpo(h); var tit = S.titulo, md = S.modo;
    modo.querySelector('#r-fecha').onclick = fechar;
    var re = modo.querySelector('#r-erros'); if (re) re.onclick = function () { iniciarQuiz({ modo: 'erros', titulo: 'Refazendo os erros', itens: wrong }); };
    modo.querySelector('.mo-top b').textContent = tit; var tm = modo.querySelector('#mo-tm'); if (tm) tm.textContent = '';
  }

  /* ---------- pontos de entrada ---------- */
  function abrirQuiz(tipo, arg) {
    var C = ctx.obter(), dp = diaPlano(), itens = [], titulo = 'Quiz';
    if (tipo === 'dia') { itens = (CONT.dias[arg].questoes || []).slice(); titulo = ROT('dia', 'Dia') + ' ' + arg + ' · quiz'; }
    else if (tipo === 'revisao') { itens = E.questoesDevidas(CONT, C.srs, ctx.hoje(), dp); titulo = 'Questões para rever'; }
    else if (tipo === 'erros') { itens = E.cadernoErros(CONT, C.srs); titulo = 'Caderno de erros'; }
    else if (tipo === 'topico') { itens = E.banco(CONT).filter(function (q) { return q.t === arg; }); titulo = 'Tópico ' + arg; }
    else if (tipo === 'fracos') { var fr = E.topicosFracos(CONT, C.srs, 3); itens = E.banco(CONT).filter(function (q) { return fr.indexOf(q.t) >= 0; }); titulo = 'Seus tópicos mais fracos'; }
    if (!itens.length) { abrir(titulo, '<div class="cx"><b>Nada para este quiz agora.</b><p>' + (tipo === 'erros' ? 'Seu caderno de erros está vazio. Bom sinal.' : tipo === 'revisao' ? 'Nenhuma questão venceu para hoje.' : 'Ainda não há questões disponíveis aqui.') + '</p></div><div class="mo-btns"><button class="btn" id="x-ok">Voltar</button></div>'); modo.querySelector('#x-ok').onclick = fechar; return; }
    itens = E.embaralhar(itens, Math.random).slice(0, tipo === 'dia' ? 99 : 20);
    iniciarQuiz({ modo: tipo === 'dia' ? 'dia' : 'treino', titulo: titulo, itens: itens, dia: tipo === 'dia' ? +arg : null });
  }
  function simulado(tipo, secao) {
    var C = ctx.obter(), dp = diaPlano();
    var pool = E.banco(CONT).filter(function (q) { return E.liberada(q, dp); });
    var itens = E.montarSimulado(pool, C.srs, tipo, Math.random, secao);
    var nec = tipo === 'completo' ? 50 : tipo === 'parcial' ? 30 : 20;
    if (itens.length < Math.min(nec, 15)) { abrir('Simulado', '<div class="cx"><b>Ainda há poucas questões liberadas.</b><p>O simulado usa as questões dos dias que você já alcançou no plano. Avance mais alguns dias e volte.</p></div><div class="mo-btns"><button class="btn" id="x-ok">Voltar</button></div>'); modo.querySelector('#x-ok').onclick = fechar; return; }
    var nome = tipo === 'completo' ? 'Simulado completo' : tipo === 'parcial' ? 'Simulado parcial' : 'Mini-simulado';
    var minutos = Math.round(itens.length * 2.4);
    if (!confirm(nome + ': ' + itens.length + ' questões, ' + minutos + ' min, sem feedback até o fim. Começar agora?')) return;
    iniciarQuiz({ modo: 'sim', tipo: tipo, titulo: nome, itens: itens, limite: minutos * 60 });
  }

  /* ---------- lab ---------- */
  function abrirLab(n) {
    var d = CONT.dias[n]; if (!d || !d.lab) { alert('Este dia não tem lab.'); return; }
    var L = d.lab, feito = !!(ctx.obter().labs || {})[n];
    var h = '<div class="mo-tags"><span class="tag">' + ROT('dia', 'Dia').toUpperCase() + ' ' + n + '</span><span class="tag">' + ROT('lab', 'LAB') + '</span>' + (L.custo.length <= 36 ? '<span class="tag za">CUSTO: ' + esc(L.custo) + '</span>' : '') + (L.tempo ? '<span class="tag">' + esc(L.tempo) + '</span>' : '') + '</div><h1>' + esc(L.t) + '</h1>' + (L.custo.length > 36 ? '<div class="call"><b class="rt">Custo estimado</b>' + fmt(L.custo) + '</div>' : '') + (L.porque ? '<p class="mo-lead">' + fmt(L.porque) + '</p>' : '') + (L.antes ? '<div class="cx"><div class="rotulo" style="margin-bottom:6px">Antes de começar</div>' + par(L.antes) + '</div>' : '');
    h += '<h2>Passo a passo</h2>' + L.passos.map(function (p, i) {
      return '<div class="passo" data-p="' + i + '"><div class="n">' + (i + 1) + '</div><div><b>' + esc(p.t) + '</b>' + (p.cmd ? '<pre><code>' + esc(p.cmd) + '</code></pre><button class="cp" data-cp="' + i + '">copiar</button>' : '') + '<p style="margin:6px 0 0">' + fmt(p.p) + '</p></div></div>';
    }).join('');
    h += '<h2>Como saber que funcionou</h2><div class="cx">' + par(L.verificar) + '</div>';
    if (L.erros && L.erros.length) h += '<h2>Se der erro</h2>' + L.erros.map(function (e) { return '<details style="margin-bottom:8px"><summary>' + fmt(e.s) + '</summary><div class="corpo"><p><b>Causa provável:</b> ' + fmt(e.c) + '</p><p><b>Como resolver:</b> ' + fmt(e.r) + '</p></div></details>'; }).join('');
    h += '<h2>' + esc(ROT('limpar', 'Limpar tudo (evita cobrança)')) + '</h2><ul>' + L.limpar.map(function (x) { return /^\s*(gcloud|bq|gsutil|gsutil|rm|kubectl)/.test(x) ? '<li><code>' + esc(x) + '</code></li>' : '<li>' + fmt(x) + '</li>'; }).join('') + '</ul>';
    h += '<div class="mo-btns"><button class="btn" id="l-ok">' + (feito ? ROT('labFeito', 'Lab concluído ✓') : ROT('labOk', 'Concluí o lab e limpei os recursos')) + '</button></div>';
    abrir(ROT('dia', 'Dia') + ' ' + n + ' · lab', h);
    modo.querySelectorAll('[data-cp]').forEach(function (b) { b.onclick = function () { try { navigator.clipboard.writeText(L.passos[+b.dataset.cp].cmd); b.textContent = 'copiado ✓'; } catch (e) { b.textContent = 'selecione e copie'; } }; });
    modo.querySelector('#l-ok').onclick = function () { var C = ctx.obter(), M = Object.assign({}, C.labs || {}); if (!M[n]) { M[n] = iso(ctx.hoje()); C.labs = M; sujo.labs = 1; descarregar(); } this.textContent = ROT('labFeito', 'Lab concluído ✓'); };
  }

  root.CP_ESTUDO_UI = {
    init: function (c) { ctx = c; },
    abrirAula: abrirAula, abrirCartoes: abrirCartoes, abrirQuiz: abrirQuiz, abrirLab: abrirLab, simulado: simulado,
    minutosAula: minutosAula, ocupado: ocupado, temConteudo: function (n) { return !!CONT.dias[n]; }, conteudo: function () { return CONT; }
  };
})(window);
