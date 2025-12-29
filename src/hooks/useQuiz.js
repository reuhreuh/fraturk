import { useEffect, useState } from 'react';

export function useQuiz(generateQuestion, setScore) {
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [clicked, setClicked] = useState(null);

  const next = () => {
    setQuestion(generateQuestion());
    setFeedback(null);
    setClicked(null);
  };

  useEffect(() => {
    next();
  }, []);

  const handleAnswer = (answer, event) => {
    setClicked(answer);
    if (answer === question.correct) {
      setFeedback('correct');
      setTimeout(() => {
        setScore((s) => s + 1);
        next();
      }, 300);
    } else {
      setFeedback(answer);
      setTimeout(() => {
        setScore(0);
        setClicked(null);
        setFeedback(null);
      }, 300);
    }
  };

  return { question, feedback, clicked, handleAnswer };
}
