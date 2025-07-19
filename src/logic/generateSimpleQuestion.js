const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateSimpleQuestion(data) {
  const correct = getRandom(data);
  const textLang = Math.random() < 0.5 ? 'fr' : 'tr';
  const answerLang = textLang === 'fr' ? 'tr' : 'fr';
  const questionText = correct[textLang];
  const correctAnswer = correct[answerLang];

  const wrongAnswers = [];
  while (wrongAnswers.length < 4) {
    const wrong = getRandom(data);
    const wrongAnswer = wrong[answerLang];
    if (wrong !== correct && !wrongAnswers.includes(wrongAnswer)) {
      wrongAnswers.push(wrongAnswer);
    }
  }

  const options = [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());

  return {
    text: questionText,
    correct: correctAnswer,
    options
  };
}
