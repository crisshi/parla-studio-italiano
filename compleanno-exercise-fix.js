(() => {
  const panel = document.querySelector('#exercise');
  if (!panel) return;
  const cards = [...panel.querySelectorAll('.exercise-card')];
  cards[0]?.remove();
  cards[1]?.remove();

  const dateCard = cards[2];
  const dates = [
    ['12/09', 'dodici settembre', 'date-01'],
    ['21/04', 'ventuno aprile', 'date-02'],
    ['30/07', 'trenta luglio', 'date-03'],
    ['16/01', 'sedici gennaio', 'date-04']
  ];
  const options = dates.map(row => row[1]);
  dateCard.innerHTML = `
    <h3>1 · Abbina le date</h3>
    <p class="cn hidden-cn">中文：将数字日期与对应的意大利语日期表达匹配。</p>
    <div class="date-match-grid">
      ${dates.map((row, index) => `
        <div class="date-match-row">
          <strong>${index + 1}. ${row[0]}</strong>
          <select data-answer="${row[1]}">
            <option value="">Scegli la data…</option>
            ${options.map(option => `<option>${option}</option>`).join('')}
          </select>
          <button class="audio-orb" data-audio="${row[2]}" aria-label="Ascolta"></button>
        </div>`).join('')}
    </div>`;

  const remaining = [...panel.querySelectorAll('.exercise-card')];
  remaining.forEach((card, index) => {
    const heading = card.querySelector('h3');
    if (heading) heading.textContent = heading.textContent.replace(/^\d+\s*·/, `${index + 1} ·`);
  });
  const title = panel.querySelector('.section-head h2');
  if (title) title.textContent = 'Sette attività';

  dateCard.querySelectorAll('[data-audio]').forEach(button => {
    button.addEventListener('click', () => {
      new Audio(`audio/quando-e-il-tuo-compleanno-conversazione/${button.dataset.audio}.mp3`).play();
    });
  });

  const check = document.querySelector('#check');
  check.onclick = () => {
    let correct = 0;
    let total = 0;
    panel.querySelectorAll('select[data-answer]').forEach(select => {
      const ok = select.value === select.dataset.answer;
      select.classList.toggle('correct', ok);
      select.classList.toggle('wrong', !ok);
      correct += Number(ok);
      total++;
    });
    panel.querySelectorAll('span[data-answer]').forEach(blank => {
      const ok = blank.textContent === blank.dataset.answer;
      blank.classList.toggle('correct', ok);
      blank.classList.toggle('wrong', !ok);
      correct += Number(ok);
      total++;
    });
    panel.querySelectorAll('.ordering').forEach(group => {
      const result = group.querySelector('.order-result');
      const ok = result.textContent === group.dataset.answer;
      result.classList.toggle('correct', ok);
      result.classList.toggle('wrong', !ok);
      correct += Number(ok);
      total++;
    });
    document.querySelector('#result').textContent = `${correct}/${total}`;
  };
})();
