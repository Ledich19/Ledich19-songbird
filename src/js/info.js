import bird from '@images/bird.webp';
import langArr from './language';

const infoBird = document.querySelector('.quiz__info-bird');

infoBird.addEventListener('click', (e) => {
  const { player } = e.target.dataset;

  if (player) {
    const { audioId } = e.target.closest('[data-audio-id]').dataset;
    const audio = document.getElementById(audioId);
    const positionBar = document.querySelector('.audio-info__position-bar');
    const status = document.querySelector('.audio-info__status');

    if (player === 'play') {
      if (!audio.paused) {
        audio.pause();
        e.target.innerHTML = '&#9658;';
      } else {
        e.target.innerHTML = '&#10073&#10073';
        audio.play();
      }

      audio.addEventListener('timeupdate', () => {
        const widthValue = (audio.currentTime / audio.duration) * 100;
        const timeValue = Math.round(audio.currentTime * 100) / 100;
        positionBar.style.width = `${widthValue}%`;
        status.innerHTML = `${timeValue}сек`;
      });
    }
  }
});

const renderInfoBird = (data) => {
  const lan = document.querySelector('.lang').value;

  infoBird.innerHTML = `
  <div class="info-bird__back">
    <div class="info-bird__wrapper">
      <div class="info-bird__photo">
        <img src=${data ? data.image : bird} alt="bird name">
      </div>
      <div class="info-bird__ifo">
        <div class="info-bird__name">${data ? data.name : '*******'}</div>
        <div class="info-bird__line"></div>

        <div class="info-bird__species">${data ? data.species : '*******'}</div>
        <div class="info-bird__line"></div>

        <div data-audio-id="audioInfo${data ? data.id : ''}" class="info-bird__audio audio-info">
          <audio id="audioInfo${data ? data.id : ''}"
            src=${data ? data.audio : '#'}></audio>

          <button ${!data ? 'disabled' : ''} data-player="play" class="audio-info__play">&#9658;</button>

          <div class="audio-info__container-bar">
            <div class="audio-info__duration-bar">
              <div class="audio-info__position-bar">
                <span class="audio-info__status">0:0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-bird__description">
    ${data ? data.description : `<span data-lang="and-massage">${langArr['and-massage'][lan]}</span>`}
    </div>
  </div>`;
};

export default renderInfoBird;
