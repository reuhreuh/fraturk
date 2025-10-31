import React, { useEffect, useState } from 'react';
import { generateSimpleQuestion } from '../logic/generateSimpleQuestion';
import { useQuiz } from '../hooks/useQuiz';
import nounsData from '../data/noms_fr_tr.json';

function Nouns({ score, setScore }) {

  const { question, feedback, clicked, handleAnswer } = useQuiz(() => generateSimpleQuestion(nounsData), setScore);
  if (!question) return <div>Loading...</div>;

  return (
    <>
      <h2>Traduisez ce nom :</h2>
      <h1 className="display-4 my-3">{question.text}</h1>
      <div className="d-flex justify-content-center flex-wrap gap-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className={`btn btn-lg ${
              feedback === opt ? 'btn-danger' :
              clicked === opt && feedback === 'correct' ? 'btn-success' :
              'btn-outline-primary'
            }`}
            style={{ minWidth: '200px' }}
          >
            {opt}
          </button>
        ))}
      </div>
      <p className="mt-4 fs-4">Score : {score}</p>
    </>
  );
}

export default Nouns;
