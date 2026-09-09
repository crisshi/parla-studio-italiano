const cards=[...document.querySelectorAll('.course')],search=document.querySelector('#search'),difficulty=document.querySelector('#difficulty');
const dialog=document.querySelector('#lesson'),closeBtn=dialog.querySelector('.close'),listenBtn=document.querySelector('#listen'),practiceBtn=document.querySelector('.practice button');
function filterCards(){const query=search.value.toLowerCase();cards.forEach(card=>{const matchesText=card.innerText.toLowerCase().includes(query);const matchesLevel=!difficulty.value||card.dataset.level===difficulty.value;card.hidden=!(matchesText&&matchesLevel);});}
cards.forEach(card=>{
  const btn=card.querySelector('button');
  btn.addEventListener('click',e=>{e.stopPropagation();location.href=btn.dataset.href||'lesson-complete.html';});
  card.addEventListener('click',()=>{
    document.querySelector('#modal-topic').textContent=card.dataset.topic||'';
    document.querySelector('#modal-title').textContent=card.dataset.title||'';
    document.querySelector('#modal-level').textContent=card.dataset.level||'';
    document.querySelector('#word').textContent=card.dataset.word||'';
    document.querySelector('#meaning').textContent=card.dataset.meaning||'';
    document.querySelector('#example').textContent=card.dataset.example||'';
    const ul=document.querySelector('#use');ul.innerHTML='';
    (card.dataset.use||'').split('|').forEach(u=>{if(u){const li=document.createElement('li');li.textContent=u;ul.appendChild(li);}});
    dialog.showModal();
  });
});
closeBtn.addEventListener('click',()=>dialog.close());
listenBtn.addEventListener('click',()=>{const w=document.querySelector('#word').textContent;if('speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(w);u.lang='en-US';speechSynthesis.speak(u);}});
practiceBtn.addEventListener('click',()=>{
  let box=practiceBtn.parentNode.querySelector('.model');
  if(!box){box=document.createElement('p');box.className='model';box.style.cssText='margin:12px 0 0;padding:10px 12px;background:#f2f8fc;border:1px solid #cfe6f3;border-radius:6px;color:#3d3d3d;font-size:14px;line-height:1.6';box.textContent='One thing I\u2019m looking forward to this week is trying the new Italian restaurant downtown with my friends.';practiceBtn.parentNode.appendChild(box);}
  else{box.hidden=!box.hidden;}
});
search.addEventListener('input',filterCards);difficulty.addEventListener('change',filterCards);
