import langArr from './language';

const results = document.querySelector('.results__wrapper');
const lang = document.querySelector('.lang');

const getMessage = (score, max) => {
  const lan = lang.value;

  const congratulation = `
  <div class="congratulation">
    ${langArr['max-score-massage'][lan]}
    <span class="congratulation__max-scores">${score}<span />
    <br><br>
    ${langArr.gallery[lan]}
  </div>`;

  const resultsBoxScore = `<div class="results__box-score">
  <div class="results__player-scores">
    <span data-lang="you-have">${langArr['you-have'][lan]}</span>
    <span>${score}</span> 
    <span data-lang="scores">${langArr.scores[lan]}</span>
  </div>
  <div class="results__max-scores">
  <span data-lang="max-result">${langArr['max-result'][lan]}</span>
    <span>${max}</span>
  </div>
  <div class="results__restart">
  <span data-lang="do-you-want">${langArr['do-you-want'][lan]}</span>
  <button class="start-btn">
  <span data-lang="start">${langArr.start[lan]}</span>
  </button>
  <br><br>
  <span data-lang="gallery">${langArr.gallery[lan]}</span>
</div>
</div>`;
  return score === max ? congratulation : resultsBoxScore;
};

const createRow = (question, mistakes, score) => {
  const row = document.createElement('li');
  row.className = 'results__item';
  row.innerHTML = `
    <div class="results__question">${question}</div>
    <div class="results__wrong">${mistakes}</div>
    <div class="results__score">${score}</div>`;
  return row;
};

const renderResults = (data, playerScore, max) => {
  const lan = lang.value;
  results.innerHTML = getMessage(playerScore, max);

  const resultsList = document.createElement('ul');
  resultsList.className = 'results__list';
  const headerRow = createRow(langArr.question[lan], langArr.mistakes[lan], langArr.scores[lan]);
  resultsList.appendChild(headerRow);

  data.forEach((scores) => {
    const { question, score, mistakes } = scores;
    const row = createRow(question, mistakes, score);
    resultsList.appendChild(row);
  });
  results.appendChild(resultsList);
};

export default renderResults;
