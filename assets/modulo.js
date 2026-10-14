/* Faixa de topo + ícones dos módulos. Cada página define <html data-pg="..."> e carrega este arquivo. */
(function(){
  var NOMES={treino:'Treino',plano:'Plano alimentar',habitos:'Hábitos',grimorio:'Grimório',rota:'Rota Internacional',financeiro:'Financeiro',mudanca:'Mudança'};
  var ICONES={
    treino:'<rect class="i1" x="5" y="13" width="6" height="22"/><rect class="i2" x="13" y="18" width="5" height="12"/><rect class="i0" x="18" y="22" width="12" height="4"/><rect class="i2" x="30" y="18" width="5" height="12"/><rect class="i1" x="37" y="13" width="6" height="22"/>',
    plano:'<circle class="i1" cx="24" cy="24" r="19"/><circle class="i0" cx="24" cy="24" r="12" opacity=".2"/><path class="i2" d="M24 11C34 14 35 25 24 37 13 25 14 14 24 11Z"/>',
    habitos:'<rect class="i1" x="5" y="30" width="5" height="12"/><rect class="i1" x="13" y="25" width="5" height="17"/><rect class="i1" x="21" y="19" width="5" height="23"/><rect class="i1" x="29" y="13" width="5" height="29"/><rect class="i2" x="37" y="6" width="5" height="36"/>',
    grimorio:'<path class="i1" d="M5 14L22 18V42L5 38Z"/><path class="i0" d="M43 14L26 18V42L43 38Z"/><path class="i2" d="M24 3L28 9L24 15L20 9Z"/>',
    rota:'<path class="s1" d="M9 38C22 38 17 22 29 22S39 13 39 13"/><rect class="i0" x="4" y="33" width="10" height="10"/><path class="i2" d="M33 6H44V17Z"/>',
    mudanca:'<path class="i1" d="M24 4L44 20V42H4V20Z"/><rect class="i2" x="19" y="26" width="10" height="16"/><rect class="i0" x="9" y="24" width="6" height="6"/>',
    financeiro:'<rect class="i1" x="6" y="32" width="36" height="9"/><rect class="i2" x="10" y="21" width="32" height="9"/><rect class="i0" x="14" y="10" width="28" height="9"/>'
  };
  window.CP_ICONE=function(id,size){return '<svg class="ic" viewBox="0 0 48 48" width="'+(size||30)+'" height="'+(size||30)+'" aria-hidden="true">'+ICONES[id]+'</svg>'};
  window.CP_NOMES=NOMES;
  var pg=document.documentElement.dataset.pg; if(!pg||!ICONES[pg]) return;
  function monta(){
    if(document.querySelector('.faixa-modulo')) return;
    var d=document.createElement('div'); d.className='faixa-modulo m-'+pg;
    d.innerHTML='<a href="index.html" aria-label="Voltar à Central">\u2190 Central</a><span class="sp"></span>'+window.CP_ICONE(pg,30)+'<b>'+NOMES[pg]+'</b>';
    document.body.insertBefore(d,document.body.firstChild);
  }
  if(document.body)monta();else document.addEventListener('DOMContentLoaded',monta);
})();
