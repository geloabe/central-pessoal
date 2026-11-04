/* Faixa de topo + ícones dos módulos. Cada página define <html data-pg="..."> e carrega este arquivo. */
(function(){
  var NOMES={treino:'Treino',plano:'Plano alimentar',habitos:'Hábitos',grimorio:'Grimório',rota:'Rota Internacional',financeiro:'Financeiro',mudanca:'Mudança',imovel:'Imóvel',negocios:'Negócios',desafios:'Desafios',cert:'Certificação',pdi:'PDI Snowfox',ingles:'Inglês'};
  var ICONES={
    treino:'<rect class="i1" x="5" y="13" width="6" height="22"/><rect class="i2" x="13" y="18" width="5" height="12"/><rect class="i0" x="18" y="22" width="12" height="4"/><rect class="i2" x="30" y="18" width="5" height="12"/><rect class="i1" x="37" y="13" width="6" height="22"/>',
    plano:'<circle class="i1" cx="24" cy="24" r="19"/><circle class="i0" cx="24" cy="24" r="12" opacity=".2"/><path class="i2" d="M24 11C34 14 35 25 24 37 13 25 14 14 24 11Z"/>',
    habitos:'<rect class="i1" x="5" y="30" width="5" height="12"/><rect class="i1" x="13" y="25" width="5" height="17"/><rect class="i1" x="21" y="19" width="5" height="23"/><rect class="i1" x="29" y="13" width="5" height="29"/><rect class="i2" x="37" y="6" width="5" height="36"/>',
    grimorio:'<path class="i1" d="M5 14L22 18V42L5 38Z"/><path class="i0" d="M43 14L26 18V42L43 38Z"/><path class="i2" d="M24 3L28 9L24 15L20 9Z"/>',
    rota:'<path class="s1" d="M9 38C22 38 17 22 29 22S39 13 39 13"/><rect class="i0" x="4" y="33" width="10" height="10"/><path class="i2" d="M33 6H44V17Z"/>',
    mudanca:'<path class="i1" d="M24 4L44 20V42H4V20Z"/><rect class="i2" x="19" y="26" width="10" height="16"/><rect class="i0" x="9" y="24" width="6" height="6"/>',
    imovel:'<path class="i1" d="M4 22L24 6L44 22V42H4Z"/><rect class="i0" x="10" y="26" width="8" height="8"/><rect class="i2" x="28" y="24" width="9" height="18"/>',
    negocios:'<rect class="i1" x="6" y="18" width="36" height="22"/><path class="i0" d="M17 18V12H31V18"/><rect class="i2" x="6" y="26" width="36" height="4"/>',
    desafios:'<path class="i1" d="M10 6H38V18C38 27 31 32 24 32S10 27 10 18Z"/><rect class="i2" x="21" y="32" width="6" height="8"/><rect class="i0" x="13" y="40" width="22" height="4"/>',
    cert:'<rect class="i1" x="5" y="8" width="38" height="26"/><rect class="i0" x="11" y="15" width="26" height="3"/><rect class="i0" x="11" y="22" width="16" height="3"/><path class="i2" d="M30 31L34 44L38 31Z"/><circle class="i2" cx="34" cy="30" r="7"/>',
    pdi:'<rect class="i1" x="5" y="31" width="10" height="11"/><rect class="i1" x="16" y="23" width="10" height="19"/><rect class="i0" x="27" y="15" width="10" height="27"/><path class="i2" d="M33 3L42 8L33 13Z"/>',
    ingles:'<path class="i1" d="M4 8H30V28H16L8 36V28H4Z"/><path class="i2" d="M20 20H44V38H40V45L32 38H20Z"/><rect class="i0" x="9" y="14" width="16" height="3"/><rect class="i0" x="9" y="20" width="10" height="3"/>',
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
