const questions = document.querySelector('.quiz__questions');

const renderQuestions = (length, active) => {
  questions.innerHTML = '';
  for (let i = 0; i < length; i += 1) {
    const question = document.createElement('li');
    question.className = i === active ? 'quiz__question quiz__question_active' : 'quiz__question';
    question.innerHTML = ` ${i + 1}`;
    questions.appendChild(question);
  }
};

export default renderQuestions;
