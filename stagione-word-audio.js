document.querySelectorAll('.weather-grid article').forEach((card, index) => {
  const heading = card.querySelector('h3');
  if (!heading) return;
  const row = document.createElement('div');
  row.className = 'weather-word-line';
  heading.before(row);
  row.appendChild(heading);
  const button = document.createElement('button');
  button.className = 'audio-orb weather-word-speaker';
  button.type = 'button';
  button.setAttribute('aria-label', `Ascolta ${heading.textContent}`);
  button.addEventListener('click', () => {
    const clip = new Audio(`audio/qual-e-la-tua-stagione-preferita/weather-word-${index + 1}.mp3`);
    clip.play();
  });
  row.appendChild(button);
});

document.querySelectorAll('#patterns .patterns article').forEach((card, index) => {
  const heading = card.querySelector('h3');
  if (!heading) return;
  const row = document.createElement('div');
  row.className = 'pattern-question-line';
  heading.before(row);
  row.appendChild(heading);
  const button = document.createElement('button');
  button.className = 'audio-orb';
  button.type = 'button';
  button.setAttribute('aria-label', `Ascolta la domanda: ${heading.textContent}`);
  button.onclick = () => new Audio(`audio/qual-e-la-tua-stagione-preferita/pattern-question-${index + 1}.mp3`).play();
  row.appendChild(button);
});

const firstExercise = document.querySelector('#exercise .exercise-card');
if (firstExercise) {
  firstExercise.innerHTML = `<h3>1 · Riconosci le stagioni</h3><p class="cn hidden-cn">中文：观察图片，点击词库中的季节词，再点击对应图片下方的空格。</p><div class="bank">${['primavera','estate','autunno','inverno'].map(word => `<button type="button">${word}</button>`).join('')}</div><div class="season-answer-grid">${['primavera','estate','autunno','inverno'].map((word,index) => `<article><div class="season-answer-image season-${index + 1}"></div><b>${index + 1}. <span data-answer="${word}">______</span></b></article>`).join('')}</div>`;
  firstExercise.querySelectorAll('.bank button').forEach(button => button.onclick = () => {
    firstExercise.dataset.v = button.textContent;
    firstExercise.querySelectorAll('.bank button').forEach(item => item.classList.toggle('selected', item === button));
  });
  firstExercise.querySelectorAll('span[data-answer]').forEach(blank => blank.onclick = () => {
    if (firstExercise.dataset.v) blank.textContent = firstExercise.dataset.v;
  });
}

const extraStyle = document.createElement('style');
extraStyle.textContent = `.pattern-question-line{display:flex;align-items:center;gap:14px;margin-bottom:8px}.pattern-question-line h3{margin:0}.pattern-question-line+.cn{margin-top:0!important;margin-bottom:18px!important}.season-answer-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-top:20px}.season-answer-grid article{border:1px solid #d8d2c6;background:#fff;text-align:center}.season-answer-image{aspect-ratio:1;background:url('qual-e-la-tua-stagione-preferita.png') no-repeat;background-size:400% auto;background-position-y:center}.season-answer-image.season-2{background-position-x:33.333%}.season-answer-image.season-3{background-position-x:66.667%}.season-answer-image.season-4{background-position-x:100%}.season-answer-grid b{display:block;padding:16px}.season-answer-grid span{display:inline-block;min-width:100px;color:#4c55a7;border-bottom:2px solid;cursor:pointer}@media(max-width:750px){.season-answer-grid{grid-template-columns:repeat(2,1fr)}}`;
document.head.appendChild(extraStyle);

document.querySelector('#check').onclick = () => {
  let score = 0, total = 0;
  document.querySelectorAll('#exercise span[data-answer],#exercise select[data-answer]').forEach(item => {
    const okay = (item.value || item.textContent) === item.dataset.answer;
    item.classList.toggle('correct', okay);
    item.classList.toggle('wrong', !okay);
    score += okay; total++;
  });
  document.querySelectorAll('#exercise .ordering').forEach(group => {
    const answer = group.querySelector('.order-result').textContent.replace(/\s+([.?!])/g,'$1').replace(/l’\s+/g,'l’');
    score += answer === group.dataset.answer; total++;
  });
  document.querySelector('#result').textContent = `答对 ${score}/${total}`;
};

document.querySelector('#redo').onclick = () => {
  document.querySelectorAll('#exercise span[data-answer]').forEach(item => { item.textContent='______'; item.classList.remove('correct','wrong'); });
  document.querySelectorAll('#exercise select').forEach(item => { item.selectedIndex=0; item.classList.remove('correct','wrong'); });
  document.querySelectorAll('#exercise .order-reset').forEach(button => button.click());
  document.querySelectorAll('#exercise .selected').forEach(item => item.classList.remove('selected'));
  document.querySelectorAll('#exercise .exercise-card').forEach(card => delete card.dataset.v);
  document.querySelector('#result').textContent='';
};
