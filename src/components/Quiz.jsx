import React from 'react';

function Quiz({ question, onAnswer, clicked, feedback, score }) {
  return (
    <div className="container text-center mt-5">
      <h2>Traduisez ce verbe :</h2>
      <h1 className="display-4 my-4">{question.text}</h1>
      <div className="d-flex justify-content-center flex-wrap gap-3">
        {question.options.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer)}
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
	  <p className="mt-4 fs-4">Score : {score}</p>
    </div>
  );
}

export default Quiz;
