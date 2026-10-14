/* Integrações entre módulos: evita registrar a mesma coisa duas vezes.
   - Água: o contador da Central (coleção "agua", em ml) e o hábito "Água" (em litros) são o mesmo dado.
   - Academia: um treino salvo no módulo Treino marca o hábito "Academia" daquele dia. */
(function (root) {
  'use strict';
  // junta os dados dos outros módulos nos registros do Hábitos (só leitura; devolve o mesmo objeto)
  function mesclar(records, aguaDocs, sessoes) {
    records = records || {};
    (aguaDocs || []).forEach(function (d) {
      if (!d || !d.date) return;
      var litros = (Number(d.ml) || 0) / 1000;
      if (litros > 0) { (records[d.date] = records[d.date] || {}).agua = Math.round(litros * 100) / 100; }
    });
    (sessoes || []).forEach(function (s) {
      if (s && s.dateISO) { (records[s.dateISO] = records[s.dateISO] || {}).academia = true; }
    });
    return records;
  }

  // quando o Hábitos muda a água de um dia, o contador da Central acompanha
  async function escreverAgua(date, litros) {
    try {
      var db = await root.claude.use('db'), ref = db.doc('agua/' + date), s = await ref.get();
      var atual = s.exists ? s.data() : { date: date, ml: 0, log: [] }, log = (atual.log || []).slice();
      var novo = Math.max(0, Math.round((Number(litros) || 0) * 1000)), soma = log.reduce(function (a, b) { return a + b; }, 0);
      while (log.length && soma > novo) { soma -= log.pop(); }
      if (soma < novo) log.push(novo - soma);
      if (!novo) { await ref.delete(); return; }
      await ref.set({ date: date, ml: novo, log: log });
    } catch (e) { console.error('água não sincronizou', e); }
  }

  root.CP_INT = { mesclar: mesclar, escreverAgua: escreverAgua };
})(window);
