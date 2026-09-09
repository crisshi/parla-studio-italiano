const tabs = [...document.querySelectorAll('nav button')];
const panels = [...document.querySelectorAll('.panel')];
const status = document.querySelector('#audio-status');
let activeAudio = null;
let clearHighlight = () => {};

// The exercise and discussion titles already explain the sections; their old
// Chinese completion notes were redundant visual noise.
['#exercise', '#talk'].forEach((sectionId) => {
  document.querySelector(`${sectionId} .section-head > p`)?.remove();
});

const extraStyle = document.createElement('style');
extraStyle.textContent = '.listen-mini,.planner-icon{border:1px solid #cfd4db!important;background:#fff!important;color:#4c55a7!important;border-radius:50%;width:27px!important;height:27px!important;margin-left:8px;vertical-align:3px;cursor:pointer;font-size:14px!important}.cn-toggle{border:1px solid #c7cdd5;background:#fff;color:#4c55a7;padding:7px 10px;font-size:12px;cursor:pointer}.cn-toggle::before{content:"✦ ";color:#e789a7}.hidden-cn,.fill span.hidden-cn{display:none!important}.exercise-cn{display:block;margin:5px 0 0;color:#bd5c55;font:13px/1.45 Arial,sans-serif}.article-word{transition:background .12s,color .12s}.article-word.is-speaking{background:#ffe6a8;color:#142443;border-radius:2px}.pause-btn{border:1px solid #bfc6cf;background:#fff;color:#475568;padding:9px 12px;font-weight:600;cursor:pointer;margin-left:7px}';
document.head.append(extraStyle);
extraStyle.textContent += 'body{background:#f4f0e8}.wrap{max-width:1160px}.hero{padding:70px 0 55px}.hero>div{max-width:670px}.hero img{box-shadow:12px 12px 0 #e4dac9}.hero-progress{display:flex;align-items:center;gap:12px;margin-top:27px;font-size:12px;color:#657083}.hero-progress i{display:block;width:120px;height:4px;background:linear-gradient(90deg,#d85045 25%,#d9dde3 25%);border-radius:10px}.hero-progress b{font-weight:600;color:#d85045}.panel.active{min-height:520px}.reading{max-width:720px;margin:0 auto;font-size:23px;line-height:1.78}.section-head{max-width:900px;margin-left:auto;margin-right:auto}.tools{max-width:720px;margin-left:auto;margin-right:auto;display:flex;align-items:center;gap:11px;background:#fff;padding:13px 16px;border:1px solid #e0dcd4}.tools #all-audio{background:#16243a;border-radius:3px}.pause-btn{border:0;background:transparent;color:#16243a;margin:0;padding:8px}.player-progress{flex:1;accent-color:#d85045;min-width:80px}.player-time{font:11px;color:#697386;white-space:nowrap}.word{max-width:900px;margin:auto}.patterns{max-width:900px;margin:auto}.talk,.fill,.bank,.actions{max-width:800px;margin-left:auto;margin-right:auto}.cn-toggle{margin-left:12px}.article-word.is-speaking{background:#ffe4a4;box-shadow:0 2px 0 #e9c768}.section-head,.word,.patterns{max-width:none;margin-left:0;margin-right:0}.word{grid-template-columns:minmax(260px,32%) 1fr;gap:34px}.word>div:first-child{padding-top:4px}.word h3{font-size:30px}.word aside{margin-top:13px}.word aside span{min-width:125px}.panel#words .section-head{border-bottom:1px solid #d9dde3;padding-bottom:20px}.panel#words{padding-top:52px}';

extraStyle.textContent += '.word-studio{display:grid;grid-template-columns:280px minmax(0,1fr);gap:0;border:1px solid #d8d2c6;background:#fff;min-height:440px;box-shadow:8px 8px 0 #e5dbc8}.word-list{padding:18px 0;background:#f8f3e9;border-right:1px solid #d8d2c6}.word-list-title{display:flex;justify-content:space-between;padding:0 18px 15px;font-size:10px;letter-spacing:.12em;color:#7a7282;border-bottom:1px solid #ded7ca}.word-select{display:flex;align-items:center;gap:11px;width:100%;border:0;border-left:3px solid transparent;background:transparent;text-align:left;padding:15px 18px;color:#4f5364;font:600 15px Georgia,serif;cursor:pointer}.word-select small{display:grid;place-items:center;width:20px;height:20px;border:1px solid #c9c3b8;border-radius:50%;font:10px Arial;color:#987d63}.word-select:hover,.word-select.active{background:#fff;color:#d85045;border-left-color:#d85045}.word-select.active small{background:#d85045;color:#fff;border-color:#d85045}.word-detail{padding:33px 38px}.word-detail .word{display:grid;grid-template-columns:1fr;gap:13px;border:0;padding:0;margin:0;max-width:none}.word-detail .word>div:first-child{padding:0}.word-detail .term,.word-detail h3{font-size:42px!important;line-height:1.05}.word-detail .word>div:nth-child(2){max-width:620px}.word-detail .word aside span{background:#f1f3f5;min-width:auto}.word-detail .word:last-child{border:0}@media(max-width:760px){.word-studio{grid-template-columns:1fr}.word-list{border-right:0;border-bottom:1px solid #d8d2c6;display:flex;overflow:auto;padding:0}.word-list-title{display:none}.word-select{min-width:150px;padding:14px 12px}.word-detail{padding:26px 20px}.word-detail .term,.word-detail h3{font-size:32px!important}}';

extraStyle.textContent += '/* Full-width lesson canvas: no unused left gutter. */ #read .tools,#read .reading,#exercise .bank,#exercise .fill,#exercise .actions,#talk .talk{max-width:none;margin-left:0;margin-right:0}.section-head{align-items:center}.section-head>p{margin:0}.hero+nav{gap:7px;padding:9px 0}.hero+nav button{margin:0;padding:10px 14px;border-bottom:0;border-radius:999px;color:#647086}.hero+nav button.active{color:#fff;background:#16243a;box-shadow:3px 3px 0 #d85045}.hero+nav button:hover{background:#e8e2d8;color:#16243a}.audio-orb,.listen-mini{position:relative;display:inline-grid!important;place-items:center;width:30px!important;height:30px!important;margin-left:7px!important;padding:0!important;border:1px solid #ccd1d9!important;border-radius:50%!important;background-color:#fff!important;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%234c55a7\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5 9v6h4l5 4V5L9 9H5z\'/%3E%3Cpath d=\'M18 9.5a4 4 0 0 1 0 5\'/%3E%3Cpath d=\'M20.5 7a7.5 7.5 0 0 1 0 10\'/%3E%3C/svg%3E")!important;background-repeat:no-repeat!important;background-position:center!important;background-size:15px!important;color:transparent!important;vertical-align:middle!important;transition:transform .16s,background-color .16s,box-shadow .16s}.audio-orb:hover,.listen-mini:hover{transform:translateY(-2px);background-color:#fff5e8!important;box-shadow:0 3px 0 #e5a469}.audio-orb:active,.listen-mini:active{transform:translateY(1px);box-shadow:none}.tools{padding:16px 18px!important;border:1px solid #d9d2c8!important;border-left:5px solid #d85045!important;box-shadow:none!important}.tools #all-audio{display:inline-flex;align-items:center;gap:9px;border-radius:999px!important;padding:10px 16px!important}.tools #all-audio::before{content:"";width:15px;height:15px;background:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'2.3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5 9v6h4l5 4V5L9 9H5z\'/%3E%3Cpath d=\'M18 9.5a4 4 0 0 1 0 5\'/%3E%3C/svg%3E") center/contain no-repeat}.pause-btn{display:inline-flex!important;align-items:center!important;gap:7px!important;border:1px solid #d4d8dd!important;border-radius:999px!important;background:#fff!important;color:#16243a!important;padding:9px 13px!important}.pause-symbol{display:inline-block;width:10px;height:13px;border-left:3px solid currentColor;border-right:3px solid currentColor}.pause-btn.is-resume .pause-symbol{width:0;height:0;border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:11px solid currentColor;border-right:0}.reading{padding:32px 38px;background:#fffdf9;border-top:3px solid #16243a;box-shadow:10px 10px 0 #e5dbc8}.reading p{max-width:920px}.translation{max-width:920px}.bank{padding:20px;background:#16243a;border-top:4px solid #d85045}.bank button{border-color:#536078;background:#263650;color:#fff}.bank button.selected{background:#f2c86b;color:#16243a;border-color:#f2c86b}.fill{padding:25px 30px 14px;background:#fffdf9;border:1px solid #ddd6ca;border-top:0;font-size:18px}.actions{padding:0 30px 28px;background:#fffdf9;border:1px solid #ddd6ca;border-top:0}.actions #check{background:#d85045;border:0}.actions #redo{border:1px solid #cbd1d8;background:#fff}.talk{border-top:3px solid #16243a;background:#fffdf9}.talk div{display:block!important;padding:22px 24px 22px 70px!important;position:relative;font-size:20px;line-height:1.45}.talk div::first-letter{color:#d85045;font-weight:700}.talk div .listen-mini{position:absolute;left:20px;top:18px;margin:0!important}.talk div .cn{margin:7px 0 0}.cn-toggle{border-radius:999px!important;padding:8px 13px!important}.panel#read,.panel#exercise,.panel#talk{padding-top:48px}@media(max-width:760px){.reading{padding:24px 20px}.fill,.actions{padding-left:18px;padding-right:18px}.hero+nav{gap:2px}.hero+nav button{padding:9px 10px;font-size:13px}.section-head>p{margin-top:8px}.talk div{font-size:18px}}';

tabs.forEach((tab) => tab.addEventListener('click', () => {
  tabs.forEach((item) => item.classList.toggle('active', item === tab));
  panels.forEach((panel) => panel.classList.toggle('active', panel.id === tab.dataset.tab));
}));

function wrapReadingWords(paragraph) {
  [...paragraph.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).forEach((node) => {
    const fragment = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach((part) => {
      if (/\S/.test(part)) { const word = document.createElement('span'); word.className = 'article-word'; word.textContent = part; fragment.append(word); }
      else { fragment.append(document.createTextNode(part)); }
    });
    node.replaceWith(fragment);
  });
}

const readingParagraphs = [...document.querySelectorAll('.reading p')];
readingParagraphs.forEach(wrapReadingWords);

function attachHighlight(audio, paragraph) {
  clearHighlight();
  if (!paragraph) return;
  const words = [...paragraph.querySelectorAll('.article-word')];
  let activeIndex = -1;
  const update = () => {
    if (!audio.duration || !words.length) return;
    const index = Math.min(words.length - 1, Math.floor((audio.currentTime / audio.duration) * words.length));
    if (index !== activeIndex) { words[activeIndex]?.classList.remove('is-speaking'); words[index]?.classList.add('is-speaking'); activeIndex = index; }
  };
  audio.addEventListener('timeupdate', update);
  audio.addEventListener('ended', () => words[activeIndex]?.classList.remove('is-speaking'), { once: true });
  clearHighlight = () => words.forEach((word) => word.classList.remove('is-speaking'));
}

function playAudio(name, paragraph = null) {
  if (activeAudio) { activeAudio.pause(); activeAudio.currentTime = 0; }
  activeAudio = new Audio(`audio/${name}.mp3?v=1`);
  attachHighlight(activeAudio, paragraph);
  connectPlayer(activeAudio);
  activeAudio.addEventListener('play', () => { status.textContent = `正在播放：${name}`; });
  activeAudio.addEventListener('error', () => { status.textContent = '音频文件加载失败，请刷新后重试。'; });
  activeAudio.play().catch(() => { status.textContent = '浏览器阻止播放，请再次点击按钮。'; });
}

document.querySelectorAll('[data-audio]').forEach((button) => {
  button.classList.remove('planner-icon');
  button.classList.add('audio-orb');
  button.textContent = '';
  button.setAttribute('aria-label', 'Ascolta la pronuncia');
  button.addEventListener('click', () => playAudio(button.dataset.audio, button.closest('.reading p')));
});

const wordsPanel = document.querySelector('#words');
const vocabularyRows = [...wordsPanel.querySelectorAll('.word')];
const wordStudio = document.createElement('div');
wordStudio.className = 'word-studio';
const wordList = document.createElement('aside');
wordList.className = 'word-list';
wordList.innerHTML = `<div class="word-list-title"><span>PAROLE DELLA LEZIONE</span><span>${vocabularyRows.length} / ${vocabularyRows.length}</span></div>`;
const wordDetail = document.createElement('div');
wordDetail.className = 'word-detail';
wordStudio.append(wordList, wordDetail);
wordsPanel.querySelector('.section-head').after(wordStudio);

function selectWord(index) {
  wordDetail.replaceChildren(vocabularyRows[index]);
  wordList.querySelectorAll('.word-select').forEach((item, itemIndex) => item.classList.toggle('active', itemIndex === index));
}

vocabularyRows.forEach((row, index) => {
  const label = row.querySelector('h3, .term')?.childNodes[0]?.textContent.trim() || `Parola ${index + 1}`;
  const option = document.createElement('button');
  option.type = 'button'; option.className = 'word-select';
  option.innerHTML = `<small>${String(index + 1).padStart(2, '0')}</small><span>${label}</span>`;
  option.addEventListener('click', () => selectWord(index));
  wordList.append(option);
});
selectWord(0);

const articleAudio = ['article-1', 'article-2', 'article-3', 'article-4', 'article-5a', 'article-5b', 'article-6a', 'article-6b', 'article-7a', 'article-7b', 'article-7c', 'article-8'];
const articleParagraphMap = [0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 7];
const allAudioButton = document.querySelector('#all-audio');
allAudioButton.textContent = 'Ascolta l’articolo';
const pauseButton = document.createElement('button');
pauseButton.type = 'button'; pauseButton.className = 'pause-btn';
function setPauseControl(resume = false) {
  pauseButton.classList.toggle('is-resume', resume);
  pauseButton.innerHTML = `<span class="pause-symbol" aria-hidden="true"></span><span>${resume ? 'Continua' : 'Pausa'}</span>`;
}
setPauseControl();
allAudioButton.after(pauseButton);
const playerProgress = document.createElement('input');
playerProgress.type = 'range'; playerProgress.className = 'player-progress'; playerProgress.min = '0'; playerProgress.max = '100'; playerProgress.value = '0';
const playerTime = document.createElement('span');
playerTime.className = 'player-time'; playerTime.textContent = '00:00';
pauseButton.after(playerProgress, playerTime);

function connectPlayer(audio) {
  audio.addEventListener('loadedmetadata', () => { playerProgress.value = '0'; playerTime.textContent = `00:00 / ${Math.ceil(audio.duration)}s`; });
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    playerProgress.value = String((audio.currentTime / audio.duration) * 100);
    playerTime.textContent = `${Math.floor(audio.currentTime)}s / ${Math.ceil(audio.duration)}s`;
  });
  audio.addEventListener('ended', () => { playerProgress.value = '0'; });
}
playerProgress.addEventListener('input', () => { if (activeAudio?.duration) activeAudio.currentTime = activeAudio.duration * (Number(playerProgress.value) / 100); });
pauseButton.addEventListener('click', () => {
  if (!activeAudio) return;
  if (activeAudio.paused) { activeAudio.play(); setPauseControl(false); status.textContent = '继续播放。'; }
  else { activeAudio.pause(); setPauseControl(true); status.textContent = '已暂停。'; }
});
allAudioButton.addEventListener('click', () => {
  let index = 0;
  function next() {
    if (index >= articleAudio.length) { status.textContent = '全文播放完成。'; return; }
    const currentIndex = index++;
    activeAudio = new Audio(`audio/${articleAudio[currentIndex]}.mp3`);
    attachHighlight(activeAudio, readingParagraphs[articleParagraphMap[currentIndex]]);
    connectPlayer(activeAudio);
    activeAudio.addEventListener('ended', next);
    activeAudio.addEventListener('error', next);
    activeAudio.addEventListener('play', () => { setPauseControl(false); status.textContent = `正在播放：${articleAudio[currentIndex]}`; });
    activeAudio.play().catch(() => { status.textContent = '浏览器阻止播放，请再次点击。'; });
  }
  next();
});

function addHiddenChinese(sectionId, translations, audioPrefix) {
  const section = document.querySelector(sectionId);
  const toggle = document.createElement('button');
  toggle.type = 'button'; toggle.className = 'cn-toggle'; toggle.textContent = '显示中文';
  section.querySelector('.section-head').append(toggle);
  const rows = sectionId === '#talk' ? [...section.querySelectorAll('.talk div')] : [...section.querySelectorAll('.fill p')];
  rows.forEach((row, index) => {
    const speechText = row.textContent.trim().replace(/_+/g, 'spazio');
    const audio = document.createElement('button');
    audio.type = 'button'; audio.className = 'listen-mini'; audio.textContent = '◖'; audio.setAttribute('aria-label', 'Ascolta');
    audio.addEventListener('click', () => playAudio(`amicizie-lavoro-donne/${audioPrefix}-${String(index + 1).padStart(2, '0')}`));
    row.insertBefore(audio, row.firstChild);
    const existingChinese = row.querySelector('.cn');
    if (existingChinese) {
      existingChinese.classList.add('hidden-cn');
    } else {
      const chinese = document.createElement('span');
      chinese.className = 'exercise-cn hidden-cn'; chinese.textContent = `中文：${row.dataset.cn || translations[index]}`;
      row.append(chinese);
    }
  });
  const explanations = [...section.querySelectorAll('.exercise-cn, .cn')];
  toggle.addEventListener('click', () => {
    const show = toggle.dataset.expanded !== 'true';
    explanations.forEach((item) => item.classList.toggle('hidden-cn', !show));
    toggle.dataset.expanded = String(show);
    toggle.textContent = show ? '隐藏中文' : '显示中文';
  });
}

addHiddenChinese('#talk', ['你大部分时间都会随身带现金吗？', '最近你用现金付款变少了吗？', '你最喜欢去哪些店购物？', '你上一次买到让自己特别兴奋的东西是什么时候？', '你认识不喜欢购物的人吗？'], 'talk');
addHiddenChinese('#exercise', ['我很少有时间弹吉他。', '在典型的一周里，我锻炼三小时。', '我不想随身带现金。', '许多家庭有宠物。', '我没有随身带现金。'], 'exercise');

const chineseRevisions = new Map([
  ['中文：美国人使用更少的现金，但仍会随身携带。', '中文：美国人用现金越来越少，但仍会随身携带。'],
  ['中文：许多国家使用现金的情况正在减少。', '中文：许多国家的现金使用量正在下降。'],
  ['有现金在身', '身上有现金'],
  ['中文：家庭；家庭成员', '中文：家庭；共同生活的一家人'],
  ['中文：收入更高的家庭使用更少现金。', '中文：收入更高的家庭使用现金更少。'],
  ['什么也不带', '什么也不随身带'],
  ['中文：皮尤研究中心的一项新调查显示了这一点。5 月至 6 月，该机构询问了近一万名美国成年人如何使用现金。', '中文：皮尤研究中心的一项最新调查显示了这一趋势。该中心在 5 月至 6 月期间询问了近万名美国成年人平时如何使用现金。'],
  ['中文：如今，42% 的人表示在典型的一周里完全不用现金付款。2015 年该比例为 24%。', '中文：现在，42% 的人表示自己在典型的一周里完全不使用现金支付；2015 年这一比例为 24%。'],
  ['中文：对收入较高的人群来说，现金没那么重要。', '中文：对于收入较高的人来说，现金没那么重要。'],
  ['中文：在年收入至少 10 万美元的家庭中，只有 4% 表示几乎所有消费都使用现金；收入低于 3 万美元的家庭中，比例仍为 26%。', '中文：在年收入至少为 10 万美元的家庭中，仅 4% 的人表示自己会在全部或几乎全部消费中使用现金；年收入不足 3 万美元的家庭中，仍有 26% 的人如此表示。'],
  ['中文：年轻美国人也很少用现金。30 岁以下成年人中超过一半在典型的一周里不用现金；而 65 岁及以上人群中，只有三分之一这样说。', '中文：美国年轻人也很少使用现金。30 岁以下成年人中，超过半数在典型的一周内不使用现金；相比之下，65 岁及以上人群中只有三分之一表示不用现金。'],
  ['中文：尽管使用得更少，许多美国人仍随身带现金。46% 的人总是或大部分时间这样做；65 岁及以上人群中该比例升至 69%。', '中文：尽管比以前使用得少，许多美国人仍会随身携带现金。46% 的人称自己总是或大部分时间这样做；65 岁及以上人群中，这一比例升至 69%。'],
  ['中文：30 岁以下成年人中，只有 29% 总是或几乎总是携带现金；45% 表示很少或从不携带。', '中文：30 岁以下成年人中，只有 29% 总是或几乎总是随身携带现金；45% 的人称自己很少或从不这样做。'],
  ['中文句型：我用……比以前少。', '中文句型：我比以前少用……。'],
  ['中文：我用的现金比以前少。', '中文：我比以前少用现金。']
]);
document.querySelectorAll('.cn, .translation, .word aside em').forEach((element) => {
  const revision = chineseRevisions.get(element.textContent.trim());
  if (revision) element.textContent = revision;
});

let selected = '';
const tokens = [...document.querySelectorAll('.bank button')];
const blanks = [...document.querySelectorAll('.fill span[data-answer]')];
tokens.forEach((token) => token.addEventListener('click', () => {
  selected = token.textContent;
  tokens.forEach((item) => item.classList.toggle('selected', item === token));
}));
blanks.forEach((blank) => blank.addEventListener('click', () => { if (selected) blank.textContent = selected; }));
document.querySelector('#check').addEventListener('click', () => {
  let score = 0;
  blanks.forEach((blank) => {
    const correct = blank.textContent === blank.dataset.answer;
    blank.style.color = correct ? '#2d805c' : '#c44d4d';
    if (correct) score += 1;
  });
  document.querySelector('#result').textContent = `${score}/5 corrette`;
});
document.querySelector('#redo').addEventListener('click', () => {
  selected = '';
  tokens.forEach((token) => token.classList.remove('selected'));
  blanks.forEach((blank) => { blank.textContent = '______'; blank.style.color = ''; });
  document.querySelector('#result').textContent = '';
});

// Lessons without prerecorded MP3s use the browser's Italian speech engine.
function speakItalian(text, paragraph = null, onEnd = null) {
  if (!('speechSynthesis' in window)) { status.textContent = '当前浏览器不支持语音朗读。'; return; }
  speechSynthesis.cancel();
  clearHighlight();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'it-IT'; utterance.rate = .88;
  const words = paragraph ? [...paragraph.querySelectorAll('.article-word')] : [];
  let cursor = 0;
  utterance.onboundary = (event) => {
    if (!words.length || event.name !== 'word') return;
    words.forEach((word) => word.classList.remove('is-speaking'));
    words[Math.min(cursor++, words.length - 1)]?.classList.add('is-speaking');
  };
  utterance.onend = () => { words.forEach((word) => word.classList.remove('is-speaking')); onEnd?.(); };
  status.textContent = '正在朗读意大利语。';
  speechSynthesis.speak(utterance);
}

document.querySelectorAll('[data-speech]').forEach((button, index) => {
  button.classList.add('audio-orb'); button.textContent = ''; button.setAttribute('aria-label', 'Ascolta la pronuncia');
  button.addEventListener('click', () => playAudio(`amicizie-lavoro-donne/speech-${String(index + 1).padStart(2, '0')}`, button.closest('.reading p')));
});

if (!document.querySelector('.reading [data-audio]')) {
  const oldListen = document.querySelector('#all-audio');
  const listen = oldListen.cloneNode(true); oldListen.replaceWith(listen);
  listen.addEventListener('click', () => {
    let index = 0;
    const next = () => {
      if (index >= readingParagraphs.length) { status.textContent = '全文朗读完成。'; return; }
      const paragraph = readingParagraphs[index++];
      if (activeAudio) { activeAudio.pause(); activeAudio.currentTime = 0; }
      activeAudio = new Audio(`audio/amicizie-lavoro-donne/article-${String(index).padStart(2, '0')}.mp3?v=1`);
      attachHighlight(activeAudio, paragraph); connectPlayer(activeAudio);
      activeAudio.addEventListener('ended', next, { once: true });
      activeAudio.addEventListener('error', () => { status.textContent = '音频文件加载失败，请刷新后重试。'; });
      activeAudio.addEventListener('play', () => { setPauseControl(false); status.textContent = `正在播放第 ${index} 段。`; });
      activeAudio.play().catch(() => { status.textContent = '浏览器阻止播放，请再次点击。'; });
    };
    next();
  });
  pauseButton.onclick = null;
}

// Add the missing per-item audio controls to the reading and pattern panels.
readingParagraphs.forEach((paragraph, index) => {
  if (paragraph.querySelector('[data-speech], [data-audio]')) return;
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'audio-orb'; button.textContent = '';
  button.dataset.speech = paragraph.innerText.trim();
  button.setAttribute('aria-label', 'Ascolta il paragrafo');
  button.addEventListener('click', () => playAudio(`amicizie-lavoro-donne/article-${String(index + 1).padStart(2, '0')}`, paragraph));
  paragraph.append(' ', button);
});

document.querySelectorAll('#patterns article').forEach((card, index) => {
  const heading = card.querySelector('h3');
  if (!heading || heading.querySelector('[data-speech], [data-audio]')) return;
  const example = card.querySelector('b')?.textContent.trim() || '';
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'audio-orb'; button.textContent = '';
  button.dataset.speech = `${heading.textContent.replace(/_+/g, '').trim()}. ${example}`;
  button.setAttribute('aria-label', 'Ascolta l’espressione');
  button.addEventListener('click', () => playAudio(`amicizie-lavoro-donne/pattern-${String(index + 1).padStart(2, '0')}`));
  heading.append(' ', button);
});
