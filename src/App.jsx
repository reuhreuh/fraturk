import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import verbsData from './verbes_fr_tr.json'; // Place ce fichier dans /src

function App() {
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [clicked, setClicked] = useState(null); // bouton cliqué

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generateQuestion = () => {
    const verbs = verbsData.verbs;

    // Étape 1 : choisir un verbe au hasard
    const selected = getRandomElement(verbs);

    // Étape 2 : choisir une langue de départ (fr ou tr)
    const fromLang = Math.random() < 0.5 ? 'fr' : 'tr';
    const toLang = fromLang === 'fr' ? 'tr' : 'fr';

    // Étape 3 : choisir la forme (infinitive, firstPerson, negativeFirstPerson)
    const formKeys = ['infinitive', 'firstPerson', 'negativeFirstPerson'];
    const formKey = getRandomElement(formKeys);

    const questionText = formKey === 'infinitive'
      ? selected[fromLang][formKey]
      : selected[fromLang]['present'][formKey];

    const correctAnswer = formKey === 'infinitive'
      ? selected[toLang][formKey]
      : selected[toLang]['present'][formKey];

    // Étape 5 : quatre mauvaises réponses
    const otherVerbs = verbs.filter(v => v !== selected);
    const wrongAnswers = [];

    while (wrongAnswers.length < 4) {
      const wrongVerb = getRandomElement(otherVerbs);
      const wrongAnswer = formKey === 'infinitive'
        ? wrongVerb[toLang][formKey]
        : wrongVerb[toLang]['present'][formKey];
      if (!wrongAnswers.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
        wrongAnswers.push(wrongAnswer);
      }
    }

    // Mélange les réponses
    const options = [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());

    setQuestion({
      text: questionText,
      correct: correctAnswer,
      options
    });

    setFeedback(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

	const handleAnswer = (answer) => {
	  setClicked(answer);

	  if (answer === question.correct) {
		setFeedback('correct');
		setTimeout(() => {
		  setClicked(null);
		  generateQuestion();
		}, 500); // délai pour montrer le vert
	  } else {
		setFeedback(answer);
		setTimeout(() => {
		  setFeedback(null);
		  setClicked(null);
		}, 500);
	  }
	};

  if (!question) return <div className="text-center mt-5">Chargement...</div>;

  return (
    <div className="container text-center mt-5">
      <h2>Translate this verb :</h2>
      <h1 className="display-4 my-4">{question.text}</h1>
      <div className="d-flex justify-content-center flex-wrap gap-3">
		{question.options.map((answer, index) => (
		  <button
			key={index}
			onClick={() => handleAnswer(answer)}
			className={`btn btn-lg ${
			  feedback === answer
				? 'btn-danger'
				: clicked === answer && feedback === 'correct'
				? 'btn-success'
				: 'btn-outline-primary'
			}`}
			style={{ minWidth: '200px', transition: 'background 0.3s' }}
		  >
			{answer}
		  </button>
		))}
      </div>
    </div>
  );
}

export default App;
