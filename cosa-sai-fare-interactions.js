document.querySelectorAll('.bank').forEach(bank => bank.querySelectorAll('button').forEach(button => button.addEventListener('click', () => bank.querySelectorAll('button').forEach(item => item.classList.toggle('selected', item === button)))));
document.querySelectorAll('.ordering').forEach(group => { const result = group.querySelector('.order-result'), words = [...group.querySelectorAll('button:not(.order-reset)')]; group.querySelector('.order-reset').onclick = () => { result.textContent = ''; result.classList.remove('correct','wrong'); words.forEach(word => { word.disabled = false; }); }; });
document.querySelector('#check').addEventListener('click', () => { document.querySelectorAll('span[data-answer],select[data-answer]').forEach(item => { const okay = (item.value || item.textContent) === item.dataset.answer; item.classList.toggle('correct',okay); item.classList.toggle('wrong',!okay); }); document.querySelectorAll('.ordering').forEach(group => { const result=group.querySelector('.order-result'), okay=result.textContent===group.dataset.answer; result.classList.toggle('correct',okay); result.classList.toggle('wrong',!okay); }); });
document.querySelector('#redo').onclick = () => { document.querySelectorAll('span[data-answer]').forEach(item => { item.textContent='______'; item.classList.remove('correct','wrong'); }); document.querySelectorAll('select').forEach(item => { item.selectedIndex=0; item.classList.remove('correct','wrong'); }); document.querySelectorAll('.ordering .order-reset').forEach(button => button.click()); document.querySelectorAll('.bank button').forEach(button => button.classList.remove('selected')); document.querySelectorAll('.exercise-card').forEach(card => delete card.dataset.v); document.querySelector('#result').textContent=''; };

// The two introductory examples have their own recordings; they must not reuse
// the four longer sentence-pattern recordings in the next tab.
const introSpeakers = document.querySelectorAll('#words .patterns .audio-orb');
if (introSpeakers[0]) introSpeakers[0].dataset.audio = 'intro-example-01';
if (introSpeakers[1]) introSpeakers[1].dataset.audio = 'intro-example-02';

// Add Chinese help to every exercise and keep it hidden until the learner asks
// to see it. The original toggle listener queries these nodes at click time.
const exerciseChinese = [
  '点击词库中的意大利语，再点击对应图片下方的空格。',
  '根据你的真实情况选择“会”或“不会”。',
  '阅读并练习本课对话。',
  '为每个问题选择正确的回答。',
  '点击词库，再点击对话中的空格完成句子。',
  '点击单词，把它们排列成正确的句子。',
  '根据提示，用意大利语提出问题。',
  '听问题并用意大利语回答。'
];
document.querySelectorAll('#exercise .exercise-card').forEach((card, index) => {
  const note = document.createElement('p');
  note.className = 'cn hidden-cn exercise-cn';
  note.textContent = `中文：${exerciseChinese[index]}`;
  card.querySelector('h3').after(note);
});
const oldChineseNote = document.querySelector('#exercise .exercise-card:nth-of-type(2) > p:not(.cn)');
if (oldChineseNote) oldChineseNote.remove();

const heroImage = document.querySelector('.hero img');
if (heroImage) heroImage.src = 'cosa-sai-fare-copertina-v2.png';
