const answers = document.querySelector('.quiz__answers');
const getStyle = (isAnswer, id, rightId) => {
  if (!isAnswer) {
    return 'answers__indicate';
  }
  if (rightId === id) {
    return 'answers__indicate answers__indicate_right';
  }
  return 'answers__indicate answers__indicate_wrong';
};

const createAnswerElement = (bird, rightId) => {
  const { name, id, isAnswer } = bird;
  const style = getStyle(isAnswer, id, rightId);
  const answer = document.createElement('li');
  answer.className = 'answers__answer';
  answer.setAttribute('data-id', id);
  answer.innerHTML = `<span class="${style}"></span>${name}`;
  return answer;
};

const renderAnswers = (data, rightId) => {
  const answersList = document.createElement('ul');
  answersList.className = 'answers__list';
  data.forEach((bird) => {
    const answer = createAnswerElement(bird, rightId);
    answersList.appendChild(answer, rightId);
  });

  answers.innerHTML = '';
  answers.appendChild(answersList);
};

export default renderAnswers;
