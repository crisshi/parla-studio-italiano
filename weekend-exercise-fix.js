(() => {
  const card = document.querySelector('#exercise .exercise-card');
  if (!card) return;
  const questions = [
    ['andare al lavoro', '去上班', 'un giorno feriale', 'activity-06'],
    ['alzarsi presto', '早起', 'un giorno feriale', 'activity-02'],
    ['dormire fino a tardi', '睡懒觉', 'il fine settimana', 'activity-03'],
    ['andare al cinema', '去电影院', 'il fine settimana', 'activity-04']
  ];
  card.innerHTML = `
    <h3>1 · Giorno feriale o fine settimana?</h3>
    <p class="cn hidden-cn">中文：观察每张图片，判断这项活动更符合工作日还是周末。</p>
    <div class="weekend-sort-grid">
      ${questions.map((question, index) => `
        <article class="weekend-sort-card">
          <div class="weekend-sort-image"></div>
          <div class="weekend-sort-body">
            <h4>${index + 1}. ${question[0]}</h4>
            <span class="cn hidden-cn">中文：${question[1]}</span>
            <select data-answer="${question[2]}">
              <option value="">Scegli…</option>
              <option>un giorno feriale</option>
              <option>il fine settimana</option>
            </select>
            <button class="audio-orb" data-audio="${question[3]}" aria-label="Ascolta"></button>
          </div>
        </article>`).join('')}
    </div>`;
  card.querySelectorAll('[data-audio]').forEach(button => {
    button.addEventListener('click', () => {
      new Audio(`audio/cosa-fa-nel-fine-settimana-conversazione/${button.dataset.audio}.mp3`).play();
    });
  });
})();
