import quizDataRu from './data';
import quizDataEn from './birdDataEn';
import renderAsk from './ask';
import renderAnswers from './answers';
import { changeAnversData, createAnswersData, getRandomQuestion } from './healper';
import renderResults from './results';
import renderInfoBird from './info';
import renderQuestions from './questions';
import renderGallery from './gallery';
import langArr from './language';

let quizData = quizDataEn;

const applause = new Audio('./assets/audio/applause.mp3');
const mistake = new Audio('./assets/audio/mistake.mp3');
const right = new Audio('./assets/audio/right.mp3');

const scoreNum = document.querySelector('.header__score-num');
const select = document.querySelector('.lang');
const quizNextBtn = document.querySelector('.quiz__next-btn');

let quizCount = 0;
let answersData;
let ask;
let rightAnswerId;
let mistakes;
let score = 0;

const maxScoreAnswer = 5;
const maxScoreAnswers = quizData.length * maxScoreAnswer;
const scoreDelta = 1;
let flag = true;
let resultsData = [];
let renderObject = null;

const renderAllHandler = (param) => {
  answersData = createAnswersData(quizData[quizCount]);
  ask = getRandomQuestion(quizData[quizCount]);
  rightAnswerId = ask.id;
  mistakes = 0;
  renderAsk(ask, param);
  renderAnswers(answersData, rightAnswerId);
  renderInfoBird(renderObject);
  renderQuestions(quizData.length, quizCount);
  quizNextBtn.disabled = true;
  flag = true;
};
const checkAnswer = (target) => {
  const id = parseInt(target.dataset.id, 10);
  renderObject = quizData[quizCount].find((a) => a.id === id);

  if (renderObject && !flag) {
    renderInfoBird(renderObject);
  }

  if (renderObject && flag) {
    answersData = changeAnversData(answersData, id);
    renderAnswers(answersData, rightAnswerId);
    if (id === rightAnswerId) {
      const result = {
        question: quizCount,
        score: maxScoreAnswer - mistakes * scoreDelta,
        mistakes,
      };
      flag = false;
      score += maxScoreAnswer - mistakes * scoreDelta;
      scoreNum.innerHTML = score;
      resultsData.push(result);
      renderAsk(ask, true);
      quizNextBtn.disabled = false;
      right.play();
    } else {
      mistakes = mistakes * scoreDelta === maxScoreAnswer ? mistakes : mistakes + 1;
      mistake.play();
    }
    renderInfoBird(renderObject);
  }
};

const nextQuiz = () => {
  if (quizCount === quizData.length - 1) {
    window.location.hash = '#results';
    renderResults(resultsData, score, maxScoreAnswers);
    if (maxScoreAnswer === score) {
      applause.play();
    }
    resultsData = [];
    quizCount = 0;
    score = 0;
    scoreNum.innerHTML = score;
    renderAllHandler(false);
  } else {
    quizCount += 1;
    renderAllHandler(false);
  }
};

const startGame = () => {
  window.location.hash = '#quiz';
  resultsData = [];
  quizCount = 0;
  score = 0;
  scoreNum.innerHTML = score;
  renderObject = null;
  renderAllHandler(false);
};

const changeUrlLanguage = () => {
  const lang = select.value;
  quizData = lang === 'en' ? quizDataEn : quizDataRu;
  localStorage.setItem('lang', lang);
  const keys = Object.keys(langArr);

  if (renderObject) {
    renderObject = quizData[quizCount].find((a) => a.id === renderObject.id);
    renderInfoBird(renderObject);
  }

  keys.forEach((key) => {
    const elem = document.querySelector(`[data-lang=${key}`);
    if (elem) {
      elem.innerHTML = langArr[key][lang];
    }
  });
};

const getLangFromLocalStorage = () => {
  const lang = localStorage.getItem('lang');
  if (lang) {
    select.value = lang;
  }
};

window.location.hash = '#home';
getLangFromLocalStorage();
renderAllHandler(false);
getLangFromLocalStorage();
changeUrlLanguage();

select.addEventListener('change', changeUrlLanguage);

document.addEventListener('click', (e) => {
  if (e.target.closest('.start-btn')) {
    startGame();
  }
  if (e.target.closest('[data-lang="quiz"]')) {
    startGame();
  }
  if (e.target.closest('.logo__icon')) {
    window.location.hash = '#gallery';
    renderGallery(quizData.flat(1));
  }
  if (e.target.closest('.quiz__next-btn')) {
    nextQuiz();
  }
  if (e.target.closest('.answers__answer')) {
    checkAnswer(e.target.closest('.answers__answer'));
  }
});
