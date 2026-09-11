const tabs = [...document.querySelectorAll('nav button')];
const panels = [...document.querySelectorAll('.panel')];
const status = document.querySelector('#audio-status');
let reading = false;
let followSession = 0;

const style = document.createElement('style');
style.textContent = `
body{background:#f4f0e8}.wrap{max-width:1160px}.hero{padding:70px 0 55px}.hero>div{max-width:670px}.hero img{box-shadow:12px 12px 0 #e4dac9}.panel.active{min-height:520px}.section-head,.word,.patterns{max-width:none;margin-left:0;margin-right:0}.panel#words{padding-top:52px}.panel#words .section-head{border-bottom:1px solid #d9dde3;padding-bottom:20px}
.word-studio{display:grid;grid-template-columns:280px minmax(0,1fr);border:1px solid #d8d2c6;background:#fff;min-height:440px;box-shadow:8px 8px 0 #e5dbc8}.word-list{padding:18px 0;background:#f8f3e9;border-right:1px solid #d8d2c6}.word-list-title{display:flex;justify-content:space-between;padding:0 18px 15px;font-size:10px;letter-spacing:.12em;color:#7a7282;border-bottom:1px solid #ded7ca}.word-select{display:flex;align-items:center;gap:11px;width:100%;border:0;border-left:3px solid transparent;background:transparent;text-align:left;padding:15px 18px;color:#4f5364;font:600 15px Georgia,serif;cursor:pointer}.word-select small{display:grid;place-items:center;width:20px;height:20px;border:1px solid #c9c3b8;border-radius:50%;font:10px Arial;color:#987d63}.word-select.active,.word-select:hover{background:#fff;color:#d85045;border-left-color:#d85045}.word-select.active small{background:#d85045;color:#fff;border-color:#d85045}.word-detail{padding:33px 38px}.word-detail .word{display:grid;grid-template-columns:1fr;gap:13px;border:0;padding:0;margin:0;max-width:none}.word-detail .word h3{font-size:42px!important;line-height:1.05}.word-detail .word aside span{background:#f1f3f5;min-width:auto}
.sub-head{margin:46px 0 18px;padding-bottom:12px;border-bottom:1px solid #d9dde3}.sub-head b{font-size:10px;letter-spacing:.14em;color:#d85045}
.country-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}.country{background:#fff;border:1px solid #ddd6ca;padding:20px 22px;box-shadow:6px 6px 0 #e5dbc8}.country h3{margin:0 0 10px;font:600 19px Georgia,serif;color:#4c55a7}.country p{margin:0 0 2px;font-size:15.5px}
.tools{max-width:none!important;margin:0 0 28px!important;display:flex;align-items:center;gap:10px;background:#fff;padding:16px 18px!important;border:1px solid #d9d2c8!important;border-left:5px solid #d85045!important}.tools #all-audio{display:inline-flex;align-items:center;gap:8px;border-radius:999px!important;padding:10px 16px!important}.tools #all-audio:before{content:'▶';font-size:11px}.pause-btn{display:inline-flex!important;align-items:center;gap:7px;border:1px solid #d4d8dd!important;border-radius:999px!important;background:#fff!important;color:#16243a!important;padding:9px 13px!important}.pause-symbol{display:inline-block;width:10px;height:13px;border-left:3px solid currentColor;border-right:3px solid currentColor}.pause-btn.is-resume .pause-symbol{width:0;height:0;border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:11px solid currentColor;border-right:0}
.reading{max-width:none!important;margin:0!important;padding:32px 38px;background:#fffdf9;border-top:3px solid #16243a;box-shadow:10px 10px 0 #e5dbc8}.reading p{max-width:920px;font-size:23px;line-height:1.78}.translation{max-width:920px}
.dialogo p em.who{display:inline-block;min-width:86px;margin-right:12px;padding:5px 9px;border-radius:3px;vertical-align:middle;font:600 10px/1 Arial;letter-spacing:.12em;text-transform:uppercase;color:#fff;background:#4c55a7}.dialogo p em.who.studente{background:#d85045}
.audio-orb{display:inline-grid!important;place-items:center;width:30px!important;height:30px!important;margin-left:7px!important;padding:0!important;border:1px solid #ccd1d9!important;border-radius:50%!important;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234c55a7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 9v6h4l5 4V5L9 9H5z'/%3E%3Cpath d='M18 9.5a4 4 0 0 1 0 5'/%3E%3C/svg%3E") center/15px no-repeat!important;color:transparent!important;vertical-align:middle!important;cursor:pointer}.audio-orb:hover{background-color:#fff5e8!important;box-shadow:0 3px 0 #e5a469}
.deck{margin:0 0 44px}.deck-head{display:flex;justify-content:space-between;align-items:baseline;gap:14px;flex-wrap:wrap;padding:0 2px 12px;border-bottom:1px solid #d9dde3}.deck-head b{font-size:12px;letter-spacing:.12em;color:#d85045}.deck-head span{font-size:12.5px;color:#8c94a1}
.bank{max-width:none!important;margin:0!important;padding:20px;background:#16243a;border-top:4px solid #d85045}.bank button{border-color:#536078;background:#263650;color:#fff}.bank button.selected{background:#f2c86b;color:#16243a;border-color:#f2c86b}
.fill{max-width:none!important;margin:0!important;padding:25px 30px 14px;background:#fffdf9;border:1px solid #ddd6ca;border-top:0;font-size:18px}.fill p{margin:0 0 14px}.fill span[data-answer]{cursor:pointer;color:#4c55a7;font-weight:600}.exercise-cn{display:block;margin:6px 0 0;color:#b55c54;font:13px/1.5 Arial}
.actions{max-width:none!important;margin:0!important;padding:0 30px 28px;background:#fffdf9;border:1px solid #ddd6ca;border-top:0}.actions .check{background:#d85045;border:0}.actions .redo{border:1px solid #cbd1d8;background:#fff}.actions .result{margin-left:10px;color:#16243a}
.match{padding:6px 30px 14px;background:#fffdf9;border:1px solid #ddd6ca;border-top:0}.match-q{padding:14px 0;border-bottom:1px dashed #e3dccb;font-size:17px}.match-q:last-child{border-bottom:0}.match-q .q{font-weight:600;margin:0 0 8px}.match-q .q .cn{display:block;margin:5px 0 8px;font:13px/1.45 Arial;color:#b55c54;font-weight:400}.match-q label{display:inline-block;margin-right:22px;font-size:15.5px;color:#4f5364;cursor:pointer}.match-q label .cn{display:inline-block;margin:0 0 0 8px;font:12.5px/1.45 Arial;color:#b55c54;font-weight:400;vertical-align:middle}.match-q input{margin-right:6px;accent-color:#d85045}
.verdict{display:inline-block;margin-left:12px;font-size:13px}.verdict.ok{color:#2d805c}.verdict.ko{color:#c44d4d}
.ord{position:relative;padding:16px 18px 14px;background:#fffdf9;border:1px solid #ddd6ca;border-top:0}.ord .scrambled{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}.ord .scrambled button{border:1px solid #ccd1d9;background:#fff;border-radius:999px;padding:6px 14px;font-size:15px;color:#16243a;cursor:pointer}.ord .scrambled button.used{opacity:.35;pointer-events:none}.ord .slot{min-height:46px;border:1.5px dashed #c9c3b8;border-radius:8px;padding:8px;display:flex;flex-wrap:wrap;gap:8px}.ord .chip{background:#f2c86b;color:#16243a;border-radius:6px;padding:4px 12px;font-size:15px;font-weight:600}.ord .reset{position:absolute;top:10px;right:12px;border:1px solid #cbd1d8;background:#fff;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:13px;color:#16243a}.ord .verdict{display:block;margin:10px 0 0}
.talk{max-width:none!important;border-top:3px solid #16243a;background:#fffdf9}.talk div{display:block!important;position:relative;padding:20px 25px!important;font-size:20px;line-height:1.5}.talk div p{margin:7px 0 0}.advanced{margin-top:48px}
.model-answers{margin:10px 25px 26px;padding:16px 20px;background:#f7f0df;border-left:4px solid #d85045}.model-answers b{display:block;font-size:11px;letter-spacing:.12em;color:#987d63;margin-bottom:8px}.model-answers p{margin:0 0 7px;font-size:17px}
.cn-toggle{display:inline-flex;align-items:center;gap:7px;position:relative;border:1px solid #c7cdd5;background:#fff;color:#4c55a7;padding:7px 14px 7px 30px;font:600 12px Arial;cursor:pointer;border-radius:999px;transition:background .15s,color .15s,border-color .15s,box-shadow .15s}.cn-toggle::before{content:'中';display:grid;place-items:center;position:absolute;left:5px;top:50%;transform:translateY(-50%);width:18px;height:18px;background:#4c55a7;color:#fff;border-radius:50%;font:bold 10px/1 Arial;letter-spacing:0}.cn-toggle:hover{background:#f7f0df;border-color:#d85045}.cn-toggle[aria-pressed=true]{background:#d85045;border-color:#d85045;color:#fff;box-shadow:0 3px 0 #b03c33}.cn-toggle[aria-pressed=true]::before{background:#fff;color:#d85045}.cn-toggle:focus-visible{outline:2px solid #4c55a7;outline-offset:2px}.hidden-cn{display:none!important}
@media(max-width:760px){.word-studio{grid-template-columns:1fr}.word-list{display:flex;overflow:auto;padding:0;border-right:0;border-bottom:1px solid #d8d2c6}.word-list-title{display:none}.word-select{min-width:145px}.word-detail,.reading{padding:24px 20px}.word-detail .word h3{font-size:32px!important}.reading p{font-size:19px}.fill,.actions{padding-left:18px;padding-right:18px}.match{padding:6px 18px 14px}.dialogo p em.who{min-width:0;margin-right:8px}}
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

const readingParagraphs=[...document.querySelectorAll('.reading p')];
function wrapWords(paragraph){[...paragraph.childNodes].forEach(node=>{if(node.nodeType!==Node.TEXT_NODE||!node.textContent.trim())return;const fragment=document.createDocumentFragment();node.textContent.split(/(\s)/).forEach(piece=>{if(!piece.trim()){fragment.append(piece);return}const span=document.createElement('span');span.className='article-word';span.textContent=piece;fragment.append(span)});node.replaceWith(fragment)})}
readingParagraphs.forEach(wrapWords);
function attachHighlight(audio,paragraph){if(!paragraph)return;const words=[...paragraph.querySelectorAll('.article-word')];let old=-1;const update=()=>{if(!audio.duration||!words.length)return;const i=Math.min(words.length-1,Math.floor(audio.currentTime/audio.duration*words.length));if(i!==old){words[old]?.classList.remove('is-speaking');words[i]?.classList.add('is-speaking');old=i}};audio.addEventListener('timeupdate',update);audio.addEventListener('ended',()=>words[old]?.classList.remove('is-speaking'),{once:true})}

function playLocal(button){followSession+=1;if(window.lessonAudio){window.lessonAudio.pause();window.lessonAudio.currentTime=0}const a=new Audio(`audio/${button.dataset.audio}.mp3?v=2`);window.lessonAudio=a;attachHighlight(a,button.closest('.reading p'));reading=true;status.textContent='正在播放本地意大利语 MP3…';a.onended=()=>{reading=false;status.textContent='播放完成。'};a.onerror=()=>{reading=false;status.textContent='音频加载失败，请刷新后重试。'};a.play().catch(()=>status.textContent='浏览器阻止播放，请再次点击喇叭。')}
document.querySelectorAll('[data-say][data-audio]').forEach(b=>{b.classList.add('audio-orb');b.type='button';b.textContent='';b.onclick=()=>playLocal(b)});

/* ── 词汇工作台 ── */
const wordsPanel = document.querySelector('#words');
const rows = [...wordsPanel.querySelectorAll('.word')];
const studio = document.createElement('div'); studio.className = 'word-studio';
const list = document.createElement('aside'); list.className = 'word-list'; list.innerHTML = '<div class="word-list-title"><span>PAROLE DELLA LEZIONE</span><span>5 / 5</span></div>';
const detail = document.createElement('div'); detail.className = 'word-detail'; studio.append(list, detail);
wordsPanel.querySelector('.section-head').after(studio);
function choose(index) { detail.replaceChildren(rows[index]); list.querySelectorAll('.word-select').forEach((item, i) => item.classList.toggle('active', i === index)); }
rows.forEach((row, index) => { const item = document.createElement('button'); item.type = 'button'; item.className = 'word-select'; item.innerHTML = `<small>${String(index + 1).padStart(2, '0')}</small><span>${row.querySelector('h3').childNodes[0].textContent.trim()}</span>`; item.onclick = () => choose(index); list.append(item); });
choose(0);

/* ── 对话全文顺序播放（本地 MP3 + 暂停/继续） ── */
const allArticle=document.querySelector('#all-audio'),pause=document.querySelector('#pause');const playerProgress=document.createElement('input');playerProgress.type='range';playerProgress.className='player-progress';playerProgress.min=0;playerProgress.max=100;playerProgress.value=0;const playerTime=document.createElement('span');playerTime.className='player-time';playerTime.textContent='00:00';pause.after(playerProgress,playerTime);let playlist=[],playlistIndex=0,playlistActive=false;
function playNext(){if(!playlistActive||playlistIndex>=playlist.length){playlistActive=false;reading=false;status.textContent='全文播放完成。';return}const b=playlist[playlistIndex++],a=new Audio(`audio/${b.dataset.audio}.mp3?v=2`);window.lessonAudio=a;attachHighlight(a,b.closest('.reading p'));reading=true;a.ontimeupdate=()=>{if(a.duration){playerProgress.value=a.currentTime/a.duration*100;playerTime.textContent=`${Math.floor(a.currentTime)}s / ${Math.ceil(a.duration)}s`}};a.onended=playNext;a.onerror=playNext;a.play().catch(()=>status.textContent='浏览器阻止播放，请再次点击播放。')}
allArticle.onclick=()=>{window.lessonAudio?.pause();playlist=[...document.querySelectorAll('.reading [data-say][data-audio]')];playlistIndex=0;playlistActive=true;status.textContent='正在播放本地意大利语 MP3…';playNext()};pause.onclick=()=>{const a=window.lessonAudio;if(!a)return;if(a.paused){a.play();pause.textContent='Pausa'}else{a.pause();pause.textContent='Continua'}};playerProgress.oninput=()=>{const a=window.lessonAudio;if(a?.duration)a.currentTime=a.duration*Number(playerProgress.value)/100};

document.querySelectorAll('.cn-toggle').forEach((toggle) => {
  toggle.setAttribute('aria-pressed', 'false');
  const scope = toggle.dataset.scope ? document.querySelector(toggle.dataset.scope) : toggle.closest('.section-head').nextElementSibling;
  const targets = [...scope.querySelectorAll('.cn, .exercise-cn, [class~="hidden-cn"]')];
  toggle.addEventListener('click', () => {
    const show = toggle.getAttribute('aria-pressed') !== 'true';
    targets.forEach((item) => item.classList.toggle('hidden-cn', !show));
    toggle.setAttribute('aria-pressed', String(show));
    toggle.textContent = show ? '隐藏中文' : '显示中文';
  });
});

/* ── 练习 1/2/4：词库选词 → 点击空格填入 → 核对/重做（按 deck 分组） ── */
document.querySelectorAll('.deck').forEach((deck) => {
  const bankButtons = [...deck.querySelectorAll('.bank button')];
  const blanks = [...deck.querySelectorAll('.fill span[data-answer]')];
  if (!bankButtons.length || !blanks.length) return;
  const result = deck.querySelector('.result');
  let selected = null;
  bankButtons.forEach((button) => button.addEventListener('click', () => {
    bankButtons.forEach((item) => item.classList.remove('selected'));
    if (selected === button) { selected = null; return; }
    selected = button;
    button.classList.add('selected');
  }));
  blanks.forEach((blank) => blank.addEventListener('click', () => {
    if (!selected) return;
    blank.textContent = selected.textContent;
    blank.dataset.filled = selected.dataset.value;
    blank.style.color = '';
    selected.classList.remove('selected');
    selected = null;
  }));
  deck.querySelector('.check')?.addEventListener('click', () => {
    let correct = 0;
    blanks.forEach((blank) => {
      const ok = blank.dataset.filled === blank.dataset.answer;
      blank.style.color = ok ? '#237251' : '#b74242';
      if (ok) correct += 1;
    });
    if (result) result.textContent = `${correct}/${blanks.length} corrette`;
  });
  deck.querySelector('.redo')?.addEventListener('click', () => {
    selected = null;
    blanks.forEach((blank) => { blank.textContent = '______'; delete blank.dataset.filled; blank.style.color = ''; });
    bankButtons.forEach((item) => item.classList.remove('selected'));
    if (result) result.textContent = '';
  });
});

/* ── 练习 3：配对 ── */
const matchDeck = document.querySelector('.match-deck');
if (matchDeck) {
  const questions = [...matchDeck.querySelectorAll('.match-q')];
  matchDeck.querySelector('.check').addEventListener('click', () => {
    let correct = 0;
    questions.forEach((question) => {
      const verdict = question.querySelector('.verdict');
      const choice = question.querySelector('input[type=radio]:checked');
      verdict.className = 'verdict';
      if (!choice) { verdict.textContent = '⚠️ 未作答'; verdict.classList.add('ko'); return; }
      const ok = choice.value === question.dataset.answer;
      verdict.textContent = ok ? '✔ Corretto' : '✘ Sbagliato — riprova';
      verdict.classList.add(ok ? 'ok' : 'ko');
      if (ok) correct += 1;
    });
    matchDeck.querySelector('.result').textContent = `${correct}/${questions.length} corrette`;
  });
}

/* ── 练习 5：连词成句 ── */
const normalize = (text) => text.toLowerCase().replace(/[?.,!']/g, '').replace(/\s+/g, ' ').trim();
document.querySelectorAll('.ord').forEach((ord) => {
  const slot = ord.querySelector('.slot');
  ord.querySelectorAll('.scrambled button').forEach((button) => button.addEventListener('click', () => {
    if (button.classList.contains('used')) return;
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = button.textContent;
    slot.append(chip);
    button.classList.add('used');
    const verdict = ord.querySelector('.verdict');
    verdict.className = 'verdict';
    verdict.textContent = '';
  }));
  ord.querySelector('.reset').addEventListener('click', () => {
    slot.innerHTML = '';
    ord.querySelectorAll('.scrambled button').forEach((item) => item.classList.remove('used'));
    const verdict = ord.querySelector('.verdict');
    verdict.className = 'verdict';
    verdict.textContent = '';
  });
});
const ordDeck = document.querySelector('.ord-deck');
if (ordDeck) {
  const items = [...ordDeck.querySelectorAll('.ord')];
  ordDeck.querySelector('.check').addEventListener('click', () => {
    let correct = 0;
    items.forEach((ord) => {
      const verdict = ord.querySelector('.verdict');
      const words = [...ord.querySelectorAll('.chip')].map((chip) => chip.textContent);
      verdict.className = 'verdict';
      if (!words.length) { verdict.textContent = '⚠️ 先点击单词排好句子'; verdict.classList.add('ko'); return; }
      const ok = normalize(words.join(' ')) === normalize(ord.dataset.answer);
      verdict.textContent = ok ? '✔ Corretto' : '✘ Non è l\'ordine giusto — 点 ⟲ 重排';
      verdict.classList.add(ok ? 'ok' : 'ko');
      if (ok) correct += 1;
    });
    ordDeck.querySelector('.result').textContent = `${correct}/${items.length} corrette`;
  });
}
