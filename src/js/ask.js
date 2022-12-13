import bird from '@images/bird.webp';

const ask = document.querySelector('.quiz__ask');

ask.addEventListener('click', (e) => {
  const { player } = e.target.dataset;
  if (player) {
    const { audioId } = e.target.closest('[data-audio-id]').dataset;

    const audio = document.getElementById(audioId);
    const positionBar = document.querySelector('.audio-ask__position-bar');
    const volumeValue = document.querySelector('.audio-ask__volume-value');
    const status = document.querySelector('.audio-ask__status');

    if (player === 'play') {
      if (!audio.paused) {
        audio.pause();
        e.target.innerHTML = '&#9658;';
      } else {
        e.target.innerHTML = '&#10073&#10073';
        audio.play();
      }
    } else if (player === 'up' && audio.volume < 1) {
      audio.volume += 0.05;
      volumeValue.innerHTML = Math.round(audio.volume * 100);
    } else if (player === 'down' && audio.volume >= 0.1) {
      audio.volume -= 0.05;
      volumeValue.innerHTML = Math.round(audio.volume * 100);
    }

    audio.addEventListener('timeupdate', () => {
      const widthValue = (audio.currentTime / audio.duration) * 100;
      const timeValue = Math.round(audio.currentTime * 100) / 100;
      positionBar.style.width = `${widthValue}%`;
      status.innerHTML = `${timeValue}сек`;
    });
  }
});

const renderAsk = (data, visible) => {
  const {
    name, image, audio, id,
  } = data;

  ask.innerHTML = `
    <div class="ask__photo ask__photo_right">
      <img src="${visible ? image : bird}" alt="bird name">
    </div>

    <div class="ask__wrapper">
      <div class="ask__name ask__name_right">${visible ? name : '******'}</div>
      <div class="ask__line"></div>

      <div data-audio-id="audioAsk${id}" class="ask__audio audio-ask">
        <audio loop id='audioAsk${id}' src="${audio}"></audio>
        <div class="audio-ask__buttons">
          <btn data-player="play" class="audio-ask__btn">&#9658;</btn>
          <div class="audio-ask__volume-btn">
            <div data-player="down" class="audio-ask__btn">-</div>
            <div class="audio-ask__volume-value">100</div>
            <div data-player="up" class="audio-ask__btn">+</div>
          </div>
        </div>
        <div class="audio-ask__container-bar">
          <div class="audio-ask__duration-bar">
            <div class="audio-ask__position-bar">
              <span class="audio-ask__status">0:5</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
};

export default renderAsk;
