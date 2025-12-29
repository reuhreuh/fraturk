import React, { useEffect, useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { generateVerbQuestion } from '../logic/generateVerbQuestion';

function Verbs({ score, setScore }) {

  const { question, feedback, clicked, handleAnswer } = useQuiz(() => generateVerbQuestion(), setScore);
  if (!question) return <div>Chargement...</div>;

  return (
    <>
      <h2>Traduisez ce verbe :</h2>
      <h1 className="display-4 my-3">{question.text}</h1>
      <div className="d-flex justify-content-center flex-wrap gap-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => handleAnswer(opt, e)}
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

export default Verbs;
