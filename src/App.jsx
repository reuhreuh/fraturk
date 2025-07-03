import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Quiz from './components/Quiz';
import { generateQuestion } from './logic/generateQuestion';

function App() {
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [clicked, setClicked] = useState(null);
  const [score, setScore] = useState(0);

  const loadNewQuestion = () => {
    setQuestion(generateQuestion());
    setFeedback(null);
    setClicked(null);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const handleAnswer = (answer) => {
    setClicked(answer);
    if (answer === question.correct) {
      setScore(prev => prev + 1);  
      setFeedback('correct');
      setTimeout(() => loadNewQuestion(), 300);
    } else {
      setFeedback(answer);
      setTimeout(() => {
		setScore(0);     
        setFeedback(null);
        setClicked(null);
      }, 300);
    }
  };



  if (!question) return <div className="text-center mt-5">Chargement...</div>;

  return (
    <Quiz
      question={question}
      onAnswer={handleAnswer}
      clicked={clicked}
      feedback={feedback}
	  score={score}
    />
  );
}

export default App;
