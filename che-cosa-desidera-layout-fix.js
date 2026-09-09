(() => {
  const card = document.querySelector('#exercise .exercise-card');
  if (!card) return;
  const rows = [
    ['$1.00', 'un dollaro', 'price-01'],
    ['$1.50', 'un dollaro e cinquanta centesimi', 'price-02'],
    ['$5.65', 'cinque dollari e sessantacinque centesimi', 'price-03'],
    ['$25.00', 'venticinque dollari', 'price-04'],
    ['$33.80', 'trentatré dollari e ottanta centesimi', 'price-05'],
    ['$78.25', 'settantotto dollari e venticinque centesimi', 'price-06']
  ];
  const options = rows.map(row => row[1]);
  card.innerHTML = `
    <h3>1 · Abbina i prezzi</h3>
    <p class="cn hidden-cn">中文：将阿拉伯数字价格与对应的意大利语表达匹配。</p>
    <div class="number-match-grid">
      ${rows.map((row, index) => `
        <div class="number-match-row">
          <strong>${index + 1}. ${row[0]}</strong>
          <select data-answer="${row[1]}">
            <option value="">Scegli l’espressione…</option>
            ${options.map(option => `<option>${option}</option>`).join('')}
          </select>
          <button class="audio-orb" data-audio="${row[2]}" aria-label="Ascolta"></button>
        </div>`).join('')}
    </div>`;
  card.querySelectorAll('[data-audio]').forEach(button => {
    button.addEventListener('click', () => {
      const player = new Audio(`audio/che-cosa-desidera-conversazione/${button.dataset.audio}.mp3`);
      player.play();
    });
  });
})();
