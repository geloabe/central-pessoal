/* PDI Snowfox — plano de estudo de 4 semanas em duas trilhas (qualidade de dados e CI/CD; dados e agentes de IA).
   16 aulas (4 por semana, ~1 h cada: aula, cartões, quiz, lab). Funções puras (sem DOM nem rede), testáveis no Node.
   Também expõe o "plano" no formato que o motor de estudo (cert-estudo*.js) espera, como CP_PLANO_ESTUDO.
   Dados do usuário (documento pdi/main):
     { inicio:'AAAA-MM-DD', aulas:{n:'AAAA-MM-DD'}, quiz:{n:{pct,data,n}}, labs:{n:'AAAA-MM-DD'}, notas:{n:'texto'}, leitura:{n:passo},
       srs:{id:{b,p,n,e,u}}, evid:{q:[{id,t,url,d}]}, res:{q_tabelas:'5'} } */
(function (root) {
  'use strict';
  var DIA = 864e5, N_SEMANAS = 4, POR_SEMANA = 4, N_AULAS = N_SEMANAS * POR_SEMANA;
  function pad(n) { return String(n).padStart(2, '0'); }
  function iso(dt) { return dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()); }
  function parse(s) { var p = String(s).slice(0, 10).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function addDias(dt, n) { var d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()); d.setDate(d.getDate() + n); return d; }
  function dias(a, b) { return Math.round((parse(iso(b)) - parse(iso(a))) / DIA); }

  var TRILHAS = [
    { id: 'q', s: 1, nome: 'Qualidade de dados e CI/CD', curto: 'Qualidade' },
    { id: 'ia', s: 2, nome: 'Dados e agentes de IA', curto: 'IA e agentes' }
  ];

  /* ordem dentro da semana: 2 aulas de qualidade, depois 2 de IA */
  var L = [
    ['q1', 'q', 'Qualidade de dados: dimensões e como medir'],
    ['q2', 'q', 'Contratos de dados e criticidade: o que proteger primeiro'],
    ['ia1', 'ia', 'Como um agente funciona: modelo, ferramentas e laço'],
    ['ia2', 'ia', 'Evals: como saber se o agente acerta'],
    ['q3', 'q', 'Testes de dados com dbt: genéricos, singulares e frescor'],
    ['q4', 'q', 'Great Expectations e Soda: validação fora do dbt'],
    ['ia3', 'ia', 'Agente de dados (text-to-SQL): esquema, prompt e SQL seguro'],
    ['ia4', 'ia', 'Dados para IA: contexto, dicionário de dados e RAG'],
    ['q5', 'q', 'Qualidade na nuvem: AWS Glue Data Quality e Dataplex'],
    ['q6', 'q', 'CI/CD com GitHub Actions'],
    ['ia5', 'ia', 'Segurança de agentes: injeção de prompt e privilégio mínimo'],
    ['ia6', 'ia', 'Melhorar o agente com método: uma mudança por vez'],
    ['q7', 'q', 'CI/CD de dados na prática: dbt, Terraform e lint no PR'],
    ['q8', 'q', 'Observabilidade, alertas e SLOs de dados'],
    ['ia7', 'ia', 'Observabilidade e custo de agentes: logs, tokens e cache'],
    ['ia8', 'ia', 'Projeto final e governança de IA: eval no CI e README']
  ];
  var LICOES = L.map(function (x, i) { return { n: i + 1, topico: x[0], trilha: x[1], semana: Math.floor(i / POR_SEMANA) + 1, titulo: x[2], minutos: 60 }; });
  var SEMANAS = [
    { n: 1, titulo: 'Entender o problema e a base', foco: 'O que é qualidade de dados e quais tabelas proteger; como um agente funciona e por que medir com evals.' },
    { n: 2, titulo: 'Ferramentas e primeiro agente', foco: 'Testes de dados com dbt, Great Expectations e Soda; agente de dados com SQL seguro e contexto.' },
    { n: 3, titulo: 'Nuvem, CI e segurança', foco: 'Qualidade em serviços gerenciados, CI/CD com GitHub Actions, segurança e método de melhoria do agente.' },
    { n: 4, titulo: 'Fechar com prova e governança', foco: 'CI de dados na prática, alertas e SLOs, custo e observabilidade de agentes, projeto final e governança de IA.' }
  ];

  /* Formato do plano que o motor de estudo espera (cada aula é um "dia"; cada trilha, uma "seção") */
  var TOPICOS = LICOES.map(function (l) { return { id: l.topico, s: l.trilha === 'q' ? 1 : 2, nome: l.titulo, d: [l.n], foco: 'medio', por: '' }; });
  var SECOES = TRILHAS.map(function (t) { return { id: t.s, nome: t.nome, peso: 50 }; });
  var DOCS_DIA = {};
  var ROTULOS = { dia: 'Aula', prova: 'Como aparece na prática', fontesTitulo: 'Fontes oficiais desta aula',
    fontesNota: 'A aula foi escrita a partir da documentação oficial abaixo. Em caso de dúvida ou diferença, vale a documentação (ela muda com as versões).', limpar: 'Limpar e guardar' };

  var METAS = [
    { id: 'cert', nome: 'Certificação Google Data Engineer', externa: true,
      simples: 'O plano completo (aulas, cartões, simulados) está no módulo Certificação; aqui só aparece o andamento.', resultado: 'Prova marcada e simulado 2 com 80% ou mais.' },
    { id: 'q', nome: 'Trilha de qualidade de dados e CI/CD', trilha: 'q',
      simples: 'Qualidade de dados é o cinto de segurança dos relatórios. CI é o inspetor que confere o carro antes de sair da garagem, sempre, sem depender de alguém lembrar. Aqui você aprende o método e as ferramentas pela documentação oficial e aplica nas tabelas do Snowfox.',
      resultado: '8 aulas concluídas (aula, quiz de 80%+ e lab); 5 tabelas críticas com checagens automáticas rodando a cada mudança (CI) e avisando quando falham; números verdadeiros para o currículo.',
      limite: 'A prática no Snowfox depende do seu acesso ao repositório e ao ambiente. Sem acesso à produção, use desenvolvimento ou os dados de exemplo dos labs e combine com o gestor o que pode ir adiante.',
      campos: [['q_tabelas', 'Tabelas cobertas'], ['q_checks', 'Checagens ativas'], ['q_problemas', 'Problemas reais encontrados']] },
    { id: 'ia', nome: 'Trilha de dados e agentes de IA', trilha: 'ia',
      simples: 'Um agente de dados sem avaliação é como um estagiário novo que responde tudo com confiança: às vezes acerta, às vezes inventa. Aqui você estuda, pela documentação oficial, como agentes funcionam, como medi-los (evals), protegê-los e alimentá-los com dados confiáveis, e constrói um projeto público com número antes e depois.',
      resultado: '8 aulas concluídas (aula, quiz de 80%+ e lab); repositório público com um agente que responde perguntas sobre um banco de exemplo, 20 perguntas de ouro, acurácia inicial e final medidas, avaliação no CI e README em inglês.',
      limite: 'É uma amostra pequena (um banco, ~20 perguntas): mostra método, não garantia. Mantenha chaves fora do repositório e confira cotas e custos da API do modelo antes de rodar tudo.',
      campos: [['ia_base', 'Acurácia inicial'], ['ia_final', 'Acurácia final'], ['ia_perguntas', 'Perguntas no eval']] }
  ];

  function licao(n) { return LICOES.filter(function (l) { return l.n === n; })[0] || null; }
  function metaPorId(id) { return METAS.filter(function (m) { return m.id === id; })[0] || null; }

  function tem(m, n) { return !!(m && m[n]); }
  function passosDa(cfg, n) {
    cfg = cfg || {}; var q = (cfg.quiz || {})[n];
    return { aula: tem(cfg.aulas, n), quiz: !!(q && q.pct >= 80), lab: tem(cfg.labs, n) };
  }
  function proxPasso(p) { return !p.aula ? 'aula' : !p.quiz ? 'quiz' : 'lab'; }

  function estado(cfg, hoje) {
    if (!cfg || !cfg.inicio) return { ativo: false };
    var ini = parse(cfg.inicio), delta = dias(ini, hoje), semana = delta < 0 ? 0 : Math.min(N_SEMANAS, Math.floor(delta / 7) + 1);
    var encerrado = delta >= N_SEMANAS * 7, liberadas = encerrado ? N_AULAS : Math.max(1, semana) * POR_SEMANA;
    var k = iso(hoje), feitos = 0, hojeN = 0, porTrilha = {}, completas = 0, atrasadas = 0, prox = null;
    TRILHAS.forEach(function (t) { porTrilha[t.id] = { aulas: 0, completas: 0, total: 0, passos: 0, passosTotal: 0 }; });
    LICOES.forEach(function (l) {
      var p = passosDa(cfg, l.n), n3 = (p.aula ? 1 : 0) + (p.quiz ? 1 : 0) + (p.lab ? 1 : 0), t = porTrilha[l.trilha];
      feitos += n3; t.total++; t.passos += n3; t.passosTotal += 3; if (p.aula) t.aulas++;
      var ok = p.aula && p.quiz && p.lab; if (ok) { completas++; t.completas++; }
      if (tem(cfg.aulas, l.n) && cfg.aulas[l.n] === k) hojeN++;
      if (tem(cfg.labs, l.n) && cfg.labs[l.n] === k) hojeN++;
      if (((cfg.quiz || {})[l.n] || {}).data === k) hojeN++;
      if (!ok && l.n <= liberadas) {
        if (l.semana < Math.max(1, semana) && !encerrado) atrasadas++;
        if (!prox) prox = { n: l.n, titulo: l.titulo, trilha: l.trilha, semana: l.semana, passo: proxPasso(p) };
      }
    });
    var adiantada = false;
    if (!prox) LICOES.some(function (l) { var p = passosDa(cfg, l.n); if (!(p.aula && p.quiz && p.lab)) { prox = { n: l.n, titulo: l.titulo, trilha: l.trilha, semana: l.semana, passo: proxPasso(p) }; adiantada = true; return true; } return false; });
    Object.keys(porTrilha).forEach(function (id) { var t = porTrilha[id]; t.pct = t.passosTotal ? Math.round(t.passos / t.passosTotal * 100) : 0; });
    var fim = addDias(ini, N_SEMANAS * 7 - 1);
    return { ativo: true, delta: delta, semana: semana, comecaEm: delta < 0 ? -delta : 0, encerrado: encerrado, fim: iso(fim), faltam: Math.max(0, dias(hoje, fim)),
      diaPlano: liberadas, passos: feitos, totalPassos: N_AULAS * 3, pct: Math.round(feitos / (N_AULAS * 3) * 100), completas: completas, total: N_AULAS,
      porTrilha: porTrilha, hoje: hojeN, atrasadas: atrasadas, prox: prox, proxAdiantada: adiantada };
  }

  function cfgPadrao(hoje) { return { inicio: iso(hoje), aulas: {}, quiz: {}, labs: {}, notas: {}, leitura: {}, srs: {}, evid: {}, res: {} }; }
  function dataDaSemana(cfg, n) { return addDias(parse(cfg.inicio), (n - 1) * 7); }

  /* ---------- Texto para o gestor: só o que foi feito e medido ---------- */
  function dmy(dt) { return pad(dt.getDate()) + '/' + pad(dt.getMonth() + 1) + '/' + dt.getFullYear(); }
  function resumoTexto(cfg, certInfo, hoje) {
    var e = estado(cfg, hoje); if (!e.ativo) return '';
    var r = cfg.res || {}, ev = cfg.evid || {}, v = function (k) { return r[k] ? String(r[k]) : '—'; };
    var X = [];
    X.push('PDI — Eloabe Costa — ciclo de ' + dmy(parse(cfg.inicio)) + ' a ' + dmy(parse(e.fim)));
    X.push('');
    X.push('Visão geral: ' + e.completas + ' de ' + e.total + ' aulas concluídas (aula lida, quiz com 80% ou mais e lab feito); ' + e.pct + '% das etapas.');
    X.push('');
    X.push('1. Certificação Google Professional Data Engineer');
    if (certInfo && certInfo.ativo) {
      X.push('- Plano de estudo: ' + certInfo.pct + '% concluído; prontidão estimada ' + certInfo.prontidao + '%.' + (certInfo.simMax ? ' Melhor simulado: ' + certInfo.simMax + '%.' : ''));
      X.push('- ' + (certInfo.aprovada ? 'Certificação conquistada.' : certInfo.prova ? 'Prova prevista para ' + dmy(parse(certInfo.prova)) + '.' : 'Prova ainda sem data.'));
    } else X.push('- Sem dados do plano de estudo nesta data.');
    function bloco(num, id) {
      var m = metaPorId(id), t = e.porTrilha[id];
      X.push(''); X.push(num + '. ' + m.nome);
      X.push('- Estudo: ' + t.completas + ' de ' + t.total + ' aulas concluídas; ' + t.aulas + (t.aulas === 1 ? ' aula lida' : ' aulas lidas') + '; fontes: documentação oficial de cada ferramenta (links nas aulas).');
      X.push('- Objetivo: ' + m.resultado);
      (m.campos || []).forEach(function (c) { X.push('- ' + c[1] + ': ' + v(c[0])); });
      (ev[id] || []).forEach(function (x) { X.push('- Evidência: ' + x.t + (x.url ? ' (' + x.url + ')' : '')); });
    }
    bloco(2, 'q'); bloco(3, 'ia');
    X.push(''); X.push('Observação: números marcados com “—” ainda não foram medidos. Nada acima foi estimado.');
    return X.join('\n');
  }

  var PLANO = { iso: iso, addDias: addDias, parse: parse, TOPICOS: TOPICOS, SECOES: SECOES, DOCS_DIA: DOCS_DIA, ROTULOS: ROTULOS, RELATOS_DIA: {},
    estado: function (cfg, hoje) { var e = estado(cfg, hoje || new Date()); return { ativo: true, diaPlano: e.ativo ? e.diaPlano : POR_SEMANA }; } };

  var api = { N_SEMANAS: N_SEMANAS, POR_SEMANA: POR_SEMANA, N_AULAS: N_AULAS, TRILHAS: TRILHAS, LICOES: LICOES, SEMANAS: SEMANAS, METAS: METAS, TOPICOS: TOPICOS, SECOES: SECOES,
    iso: iso, parse: parse, addDias: addDias, dias: dias, licao: licao, metaPorId: metaPorId, passosDa: passosDa, estado: estado, cfgPadrao: cfgPadrao, dataDaSemana: dataDaSemana, resumoTexto: resumoTexto, PLANO: PLANO };
  root.CP_PLANO_ESTUDO = PLANO;
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CP_PDI = api;
})(typeof window !== 'undefined' ? window : globalThis);
