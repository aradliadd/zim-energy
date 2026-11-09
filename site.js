(function(){
  var header=document.querySelector('.site-header');
  var toggle=document.querySelector('.menu-toggle');
  if(toggle){toggle.addEventListener('click',function(){
    var open=header.hasAttribute('data-open');
    if(open){header.removeAttribute('data-open')}else{header.setAttribute('data-open','')}
    toggle.setAttribute('aria-expanded',String(!open));
  });}
  document.querySelectorAll('.dd').forEach(function(dd){
    var b=dd.querySelector('button');
    b.addEventListener('click',function(e){
      e.stopPropagation();
      var open=dd.hasAttribute('data-open');
      document.querySelectorAll('.dd[data-open]').forEach(function(x){x.removeAttribute('data-open');x.querySelector('button').setAttribute('aria-expanded','false')});
      if(!open){dd.setAttribute('data-open','');b.setAttribute('aria-expanded','true')}
    });
  });
  document.addEventListener('click',function(){document.querySelectorAll('.dd[data-open]').forEach(function(x){x.removeAttribute('data-open');x.querySelector('button').setAttribute('aria-expanded','false')})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.querySelectorAll('.dd[data-open]').forEach(function(x){x.removeAttribute('data-open')});if(header)header.removeAttribute('data-open')}});

  // reveal on scroll
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}

  // project filters
  var fb=document.querySelectorAll('.filters button');
  fb.forEach(function(b){b.addEventListener('click',function(){
    fb.forEach(function(x){x.setAttribute('aria-pressed','false')});
    b.setAttribute('aria-pressed','true');
    var t=b.getAttribute('data-filter');
    document.querySelectorAll('[data-tags]').forEach(function(card){
      card.hidden = !(t==='all' || card.getAttribute('data-tags').split(' ').indexOf(t)>-1);
    });
    document.querySelectorAll('[data-group]').forEach(function(g){
      var any=g.querySelectorAll('[data-tags]:not([hidden])').length>0;
      g.hidden=!any;
    });
  })});

  // forms (Netlify Forms on the demo; on JetServer point the action to a PHP handler)
  document.querySelectorAll('form[data-lead]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      if(!f.reportValidity())return;
      var isDemoHost=location.hostname.indexOf('netlify')===-1;
      if(isDemoHost){f.innerHTML='<div role="status" style="text-align:center;padding:24px 0"><h3 style="color:#0A509F;font-size:24px">זהו אתר הדגמה</h3><p style="color:#4D6380;margin-top:8px">הטופס עדיין לא מחובר — הפרטים לא נשלחו.</p></div>';return;}
      var data=new URLSearchParams(new FormData(f)).toString();
      var btn=f.querySelector('[type=submit]');btn.disabled=true;
      fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:data})
        .then(function(){f.innerHTML='<div role="status" style="text-align:center;padding:24px 0"><h3 style="color:#0A509F;font-size:26px">תודה! הפנייה התקבלה.</h3><p style="color:#4D6380;margin-top:8px">הצוות שלנו יחזור אליכם בהקדם.</p></div>'})
        .catch(function(){btn.disabled=false;alert('אירעה שגיאה בשליחה. נסו שוב או צרו קשר טלפונית.')});
    });
  });
})();
