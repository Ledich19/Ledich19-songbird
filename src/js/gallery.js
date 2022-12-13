import langArr from './language';

const gallery = document.querySelector('.gallery__wrapper');
const lan = document.querySelector('.lang').value;

gallery.addEventListener('click', (e) => {
  if (e.target.dataset.bird) {
    const id = e.target.dataset.bird;
    const audio = document.getElementById(id);

    if (!audio.paused) {
      audio.pause();
      e.target.innerHTML = '&#9658;';
    } else {
      e.target.innerHTML = '&#10073&#10073';
      audio.play();
    }
  }
});

const createGalleryElement = (bird) => {
  const { id, name, species, description, image, audio } = bird;
  const item = document.createElement('li');
  item.className = 'gallery__item';
  item.setAttribute('data-id', id);
  item.innerHTML = `
  <div class="gallery__photo">
              <img src='${image}' alt="${name}">
            </div>
            <div class="gallery__wrapper">
              <div class="gallery__name">${name}
                <div class="gallery__audio">
                  <audio id="${id}" src="${audio}"></audio>
                  <button data-bird="${id}" class="gallery__play">&#9658;</button>
                </div>
              </div>
              <div class="gallery__line"></div>
              <div class="gallery__species">${species}</div>
              <div class="gallery__line"></div>
            </div>
            <div class="gallery__description">
              ${description}
            </div>
  `;
  return item;
};

 const renderGallery = (birds) => {
  gallery.innerHTML = '';
  const galleryList = document.createElement('ul');
  galleryList.className = 'gallery__list';
  birds.forEach((bird) => {
    const item = createGalleryElement(bird);
    galleryList.appendChild(item);
  });
  gallery.appendChild(galleryList);
};

export default renderGallery;
