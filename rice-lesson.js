const tabs = [...document.querySelectorAll('nav button')];
const panels = [...document.querySelectorAll('.panel')];
const status = document.querySelector('#audio-status');
let selected = '';
let reading = false;
let clearReadingHighlight = () => {};
let readingWords = [];
let activeReadingWord = -1;
let followSession = 0;

const style = document.createElement('style');
style.textContent = `
body{background:#f4f0e8}.wrap{max-width:1160px}.hero{padding:70px 0 55px}.hero>div{max-width:670px}.hero img{box-shadow:12px 12px 0 #e4dac9}.panel.active{min-height:520px}.section-head,.word,.patterns{max-width:none;margin-left:0;margin-right:0}.panel#words{padding-top:52px}.panel#words .section-head{border-bottom:1px solid #d9dde3;padding-bottom:20px}.word-studio{display:grid;grid-template-columns:280px minmax(0,1fr);border:1px solid #d8d2c6;background:#fff;min-height:440px;box-shadow:8px 8px 0 #e5dbc8}.word-list{padding:18px 0;background:#f8f3e9;border-right:1px solid #d8d2c6}.word-list-title{display:flex;justify-content:space-between;padding:0 18px 15px;font-size:10px;letter-spacing:.12em;color:#7a7282;border-bottom:1px solid #ded7ca}.word-select{display:flex;align-items:center;gap:11px;width:100%;border:0;border-left:3px solid transparent;background:transparent;text-align:left;padding:15px 18px;color:#4f5364;font:600 15px Georgia,serif;cursor:pointer}.word-select small{display:grid;place-items:center;width:20px;height:20px;border:1px solid #c9c3b8;border-radius:50%;font:10px Arial;color:#987d63}.word-select.active,.word-select:hover{background:#fff;color:#d85045;border-left-color:#d85045}.word-select.active small{background:#d85045;color:#fff;border-color:#d85045}.word-detail{padding:33px 38px}.word-detail .word{display:grid;grid-template-columns:1fr;gap:13px;border:0;padding:0;margin:0;max-width:none}.word-detail .word h3{font-size:42px!important;line-height:1.05}.word-detail .word aside span{background:#f1f3f5;min-width:auto}.tools{max-width:none!important;margin:0 0 28px!important;display:flex;align-items:center;gap:10px;background:#fff;padding:16px 18px!important;border:1px solid #d9d2c8!important;border-left:5px solid #d85045!important}.tools #all-audio{display:inline-flex;align-items:center;gap:8px;border-radius:999px!important;padding:10px 16px!important}.tools #all-audio:before{content:'▶';font-size:11px}.pause-btn{display:inline-flex!important;align-items:center;gap:7px;border:1px solid #d4d8dd!important;border-radius:999px!important;background:#fff!important;color:#16243a!important;padding:9px 13px!important}.pause-symbol{display:inline-block;width:10px;height:13px;border-left:3px solid currentColor;border-right:3px solid currentColor}.pause-btn.is-resume .pause-symbol{width:0;height:0;border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:11px solid currentColor;border-right:0}.reading{max-width:none!important;margin:0!important;padding:32px 38px;background:#fffdf9;border-top:3px solid #16243a;box-shadow:10px 10px 0 #e5dbc8}.reading p{max-width:920px;font-size:23px;line-height:1.78}.translation{max-width:920px}.article-word{transition:background .12s,color .12s}.article-word.is-speaking{background:#ffe4a4;box-shadow:0 2px 0 #e9c768;border-radius:2px}.audio-orb{display:inline-grid!important;place-items:center;width:30px!important;height:30px!important;margin-left:7px!important;padding:0!important;border:1px solid #ccd1d9!important;border-radius:50%!important;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234c55a7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 9v6h4l5 4V5L9 9H5z'/%3E%3Cpath d='M18 9.5a4 4 0 0 1 0 5'/%3E%3C/svg%3E") center/15px no-repeat!important;color:transparent!important;vertical-align:middle!important;cursor:pointer}.audio-orb:hover{background-color:#fff5e8!important;box-shadow:0 3px 0 #e5a469}.bank{max-width:none!important;margin:0!important;padding:20px;background:#16243a;border-top:4px solid #d85045}.bank button{border-color:#536078;background:#263650;color:#fff}.bank button.selected{background:#f2c86b;color:#16243a;border-color:#f2c86b}.fill{max-width:none!important;margin:0!important;padding:25px 30px 14px;background:#fffdf9;border:1px solid #ddd6ca;border-top:0;font-size:18px}.fill small{display:block;font:13px/1.5 Arial;color:#b55c54}.exercise-cn{display:block;margin:6px 0 0;color:#b55c54;font:13px/1.5 Arial}.actions{max-width:none!important;margin:0!important;padding:0 30px 28px;background:#fffdf9;border:1px solid #ddd6ca;border-top:0}.actions #check{background:#d85045;border:0}.actions #redo{border:1px solid #cbd1d8;background:#fff}.talk{max-width:none!important;border-top:3px solid #16243a;background:#fffdf9}.talk div{display:block!important;position:relative;padding:20px 25px!important;font-size:20px;line-height:1.5}.talk div p{margin:7px 0 0}.advanced{margin-top:48px}.cn-toggle{border:1px solid #c7cdd5;background:#fff;color:#4c55a7;padding:7px 10px;font-size:12px;cursor:pointer;border-radius:999px}.hidden-cn{display:none!important}@media(max-width:760px){.word-studio{grid-template-columns:1fr}.word-list{display:flex;overflow:auto;padding:0;border-right:0;border-bottom:1px solid #d8d2c6}.word-list-title{display:none}.word-select{min-width:145px}.word-detail,.reading{padding:24px 20px}.word-detail .word h3{font-size:32px!important}.reading p{font-size:19px}.fill,.actions{padding-left:18px;padding-right:18px}}
`;
document.head.append(style);

// Shared full-reading control: the same compact player treatment used by Contanti.
const playerStyle = document.createElement('style');
playerStyle.textContent = `
  .tools{min-height:74px;flex-wrap:wrap}
  .tools #all-audio{min-height:44px;background:#16243a!important;color:#fff!important;font:700 16px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif!important;letter-spacing:0!important}
  .tools .pause-btn{min-height:44px;font:600 14px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif!important}
  .tools #audio-status{margin-left:10px!important;font-size:13px!important;color:#607086!important}
  @media(max-width:620px){.tools{align-items:flex-start}.tools #audio-status{width:100%;margin:2px 0 0!important}}
`;
document.head.append(playerStyle);

tabs.forEach((tab) => tab.addEventListener('click', () => {
  tabs.forEach((item) => item.classList.toggle('active', item === tab));
  panels.forEach((panel) => panel.classList.toggle('active', panel.id === tab.dataset.tab));
}));

function wrapArticleWords() {
  document.querySelectorAll('.reading p').forEach((paragraph) => {
    [...paragraph.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).forEach((node) => {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (/\S/.test(part)) { const word = document.createElement('span'); word.className = 'article-word'; word.textContent = part; fragment.append(word); }
        else fragment.append(document.createTextNode(part));
      });
      node.replaceWith(fragment);
    });
  });
}

function setActiveReadingWord(index) {
  if (!readingWords.length) return;
  const next = Math.max(0, Math.min(index, readingWords.length - 1));
  readingWords[activeReadingWord]?.classList.remove('is-speaking');
  readingWords[next]?.classList.add('is-speaking');
  activeReadingWord = next;
}

function speak(text, onEnd = () => {}, highlightedWords = []) {
  followSession += 1;
  const previousCleanup = clearReadingHighlight;
  previousCleanup();
  clearReadingHighlight = () => {};
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'it-IT';
  let cleanup = () => {};
  let activeIndex = -1;
  let starts = [];
  if (highlightedWords.length) {
    readingWords = highlightedWords;
    activeReadingWord = -1;
    let offset = 0;
    starts = highlightedWords.map((word) => { const start = offset; offset += word.textContent.length + 1; return start; });
    utterance.onboundary = (event) => {
      if (typeof event.charIndex !== 'number') return;
      let index = starts.findIndex((start, i) => event.charIndex >= start && (i === starts.length - 1 || event.charIndex < starts[i + 1]));
      if (index < 0) return;
      activeIndex = index;
      setActiveReadingWord(index);
    };
    cleanup = () => {
      highlightedWords.forEach((word) => word.classList.remove('is-speaking'));
      readingWords = [];
      activeReadingWord = -1;
    };
    clearReadingHighlight = cleanup;
  }
  utterance.onstart = () => { status.textContent = 'Lettura italiana in corso…'; };
  utterance.onend = () => { cleanup(); reading = false; status.textContent = 'Lettura terminata.'; onEnd(); };
  speechSynthesis.speak(utterance);
}

document.querySelectorAll('[data-say]').forEach((button) => {
  button.classList.add('audio-orb');
  button.textContent = '';
  button.addEventListener('click', () => speak(button.dataset.say));
});

function addInlineAudio(row, text) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'audio-orb';
  button.setAttribute('aria-label', 'Ascolta');
  button.addEventListener('click', () => speak(text));
  row.insertBefore(button, row.firstChild);
}

const comprehensionAudio = [
  'A luglio, il prezzo medio di cinque chilogrammi di riso è sceso sotto tremilacinquecento yen.',
  'Lawson ridurrà alcuni prezzi dal ventinove settembre.',
  'Seven-Eleven ridurrà il prezzo delle polpette al salmone e alle uova di merluzzo piccanti.'
];
document.querySelectorAll('#exercise .fill p').forEach((row, index) => addInlineAudio(row, comprehensionAudio[index]));

const discussionAudio = [
  'Cosa pensi dei minimarket giapponesi che abbassano i prezzi?',
  'Compri spesso prodotti a base di riso nei minimarket?',
  'Quali sono alcuni dei tuoi cibi preferiti nei minimarket?',
  'Quali catene di minimarket del tuo Paese hanno il cibo migliore?',
  'Pensi che il prezzo del riso in Giappone continuerà a scendere?',
  'Ci sono molti minimarket raggiungibili a piedi da casa tua?',
  'Quanto spesso compri cibo da mangiare fuori casa?',
  'Quali sono i posti migliori della tua zona per mangiare in modo veloce ed economico?',
  'Quando viaggi, ti piace provare il cibo dei minimarket?',
  'Hai mai lavorato in un negozio? Ti è piaciuto?'
];
document.querySelectorAll('#talk .talk > div').forEach((row, index) => addInlineAudio(row, discussionAudio[index]));

const wordsPanel = document.querySelector('#words');
const rows = [...wordsPanel.querySelectorAll('.word')];
rows[1].querySelector('small').textContent = '/il proˈdotto/ · sostantivo';
const studio = document.createElement('div'); studio.className = 'word-studio';
const list = document.createElement('aside'); list.className = 'word-list'; list.innerHTML = '<div class="word-list-title"><span>PAROLE DELLA LEZIONE</span><span>5 / 5</span></div>';
const detail = document.createElement('div'); detail.className = 'word-detail'; studio.append(list, detail);
wordsPanel.querySelector('.section-head').after(studio);
function choose(index) { detail.replaceChildren(rows[index]); list.querySelectorAll('.word-select').forEach((item, i) => item.classList.toggle('active', i === index)); }
rows.forEach((row, index) => { const item = document.createElement('button'); item.type = 'button'; item.className = 'word-select'; item.innerHTML = `<small>${String(index + 1).padStart(2, '0')}</small><span>${row.querySelector('h3').childNodes[0].textContent.trim()}</span>`; item.onclick = () => choose(index); list.append(item); });
choose(0);

const allArticle = document.querySelector('#all-audio');
const pause = document.querySelector('#pause');
const playerProgress = document.createElement('input');
playerProgress.type = 'range'; playerProgress.className = 'player-progress'; playerProgress.min = '0'; playerProgress.max = '100'; playerProgress.value = '0'; playerProgress.disabled = true;
const playerTime = document.createElement('span'); playerTime.className = 'player-time'; playerTime.textContent = '00:00';
pause.after(playerProgress, playerTime);
const progressStyle = document.createElement('style');
progressStyle.textContent = '.player-progress{flex:1;min-width:100px;accent-color:#d85045}.player-time{white-space:nowrap;font-size:12px!important;color:#697386!important;margin-left:0!important}';
document.head.append(progressStyle);
let elapsedSeconds = 0, progressTimer = null;
function formatTime(seconds) { return `00:${String(Math.max(0, Math.floor(seconds))).padStart(2, '0')}`; }
function startProgress() { window.clearInterval(progressTimer); elapsedSeconds = 0; playerProgress.value = '0'; playerTime.textContent = '00:00'; progressTimer = window.setInterval(() => { if (!speechSynthesis.paused && reading) { elapsedSeconds += .2; playerTime.textContent = formatTime(elapsedSeconds); playerProgress.value = String(Math.min(96, Number(playerProgress.value) + .24)); } }, 200); }
function finishProgress() { window.clearInterval(progressTimer); playerProgress.value = '100'; playerTime.textContent = formatTime(elapsedSeconds); }
function pauseLabel(resume) { pause.classList.toggle('is-resume', resume); pause.innerHTML = `<span class="pause-symbol"></span><span>${resume ? 'Continua' : 'Pausa'}</span>`; }
function articleSentenceText(paragraph) { const clone = paragraph.cloneNode(true); clone.querySelectorAll('button').forEach((button) => button.remove()); return clone.textContent.replace(/\s+/g, ' ').trim(); }
let articleSentences = [], articleIndex = 0, articlePaused = false;
function playArticleFromCurrent() {
  followSession += 1; const session = followSession; speechSynthesis.cancel(); reading = true; articlePaused = false; pauseLabel(false);
  const next = () => {
    if (session !== followSession || articlePaused) return;
    if (articleIndex >= articleSentences.length) { reading = false; finishProgress(); status.textContent = 'Lettura terminata.'; return; }
    const utterance = new SpeechSynthesisUtterance(articleSentences[articleIndex]); utterance.lang = 'it-IT'; utterance.rate = 1;
    utterance.onend = () => { articleIndex += 1; window.setTimeout(next, 90); };
    utterance.onerror = () => { articleIndex += 1; next(); };
    speechSynthesis.speak(utterance);
  };
  next();
}
allArticle.onclick = () => { clearReadingHighlight(); articleSentences = [...document.querySelectorAll('.reading p')].map(articleSentenceText).filter(Boolean); articleIndex = 0; status.textContent = 'Lettura italiana in corso…'; startProgress(); playArticleFromCurrent(); };
pause.onclick = () => {
  if (!reading) return;
  if (articlePaused) {
    speechSynthesis.resume();
    window.setTimeout(() => speechSynthesis.resume(), 80);
    articlePaused = false; pauseLabel(false); status.textContent = 'Lettura ripresa.';
  } else {
    speechSynthesis.pause(); articlePaused = true; pauseLabel(true); status.textContent = 'Lettura in pausa.';
  }
};

document.querySelectorAll('.cn-toggle').forEach((toggle) => toggle.onclick = () => { const show = toggle.dataset.show !== 'true'; const block = toggle.closest('.section-head').nextElementSibling; block.querySelectorAll('.hidden-cn,.cn').forEach((item) => item.classList.toggle('hidden-cn', !show)); toggle.dataset.show = String(show); toggle.textContent = show ? '隐藏中文' : '显示中文'; });

const exercise = document.querySelector('#exercise');
const exerciseToggle = document.createElement('button');
exerciseToggle.type = 'button'; exerciseToggle.className = 'cn-toggle'; exerciseToggle.textContent = '显示中文';
exercise.querySelector('.section-head').append(exerciseToggle);
const exerciseChinese = [
  '中文：7 月，5 公斤大米的平均价格跌破了多少？',
  '中文：Lawson 将从哪一天起下调部分商品的价格？',
  '中文：Seven-Eleven 将下调鲑鱼和辣味明太子饭团的价格。这句话正确吗？'
];
[...exercise.querySelectorAll('.fill p')].forEach((row, index) => {
  const translation = document.createElement('span');
  translation.className = 'exercise-cn hidden-cn';
  translation.textContent = exerciseChinese[index];
  row.append(translation);
});
exerciseToggle.onclick = () => {
  const show = exerciseToggle.dataset.show !== 'true';
  exercise.querySelectorAll('.exercise-cn').forEach((item) => item.classList.toggle('hidden-cn', !show));
  exerciseToggle.dataset.show = String(show);
  exerciseToggle.textContent = show ? '隐藏中文' : '显示中文';
};

document.querySelectorAll('.bank button').forEach((button) => button.onclick = () => { selected = button.dataset.value; document.querySelectorAll('.bank button').forEach((item) => item.classList.toggle('selected', item === button)); });
const blanks = [...document.querySelectorAll('.fill span[data-answer]')];
blanks.forEach((blank) => blank.onclick = () => { if (selected) blank.textContent = selected; });
document.querySelector('#check').onclick = () => { let correct = 0; blanks.forEach((blank) => { const ok = blank.textContent === blank.dataset.answer; blank.style.color = ok ? '#237251' : '#b74242'; if (ok) correct += 1; }); document.querySelector('#result').textContent = `${correct}/${blanks.length} corrette`; };
document.querySelector('#redo').onclick = () => { selected = ''; blanks.forEach((blank) => { blank.textContent = '______'; blank.style.color = ''; }); document.querySelectorAll('.bank button').forEach((item) => item.classList.remove('selected')); document.querySelector('#result').textContent = ''; };
