function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomQuestion(arr) {
  const num = getRandomInt(0, arr.length - 1);
  return arr[num];
}

export const createAnswersData = (quizArr) => {
  const answersData = quizArr.map((ask) => {
    const answer = {
      id: ask.id,
      name: ask.name,
      isAnswer: false,
    };
    return answer;
  });
  return answersData;
};

export const changeAnversData = (answersData, id) => {
  const result = answersData.map((a) => {
    if (id === a.id) {
      return {
        id: a.id,
        name: a.name,
        isAnswer: true,
      };
    }
    return a;
  });
  return result;
};
