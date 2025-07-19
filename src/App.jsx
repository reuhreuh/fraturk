import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import Verbes from './components/Verbs';
import Adverbes from './components/Adverbs';
import Adjectifs from './components/Adjectives';

function App() {
  const [score, setScore] = useState(0);
  const [activeMenu, setActiveMenu] = useState('verbes');

  const renderQuiz = () => {
    switch (activeMenu) {
      case 'verbes':
        return <Verbes score={score} setScore={setScore} />;
      case 'adverbes':
        return <Adverbes score={score} setScore={setScore} />;
      case 'adjectifs':
        return <Adjectifs score={score} setScore={setScore} />;
      default:
        return <div>Choisissez un menu</div>;
    }
  };

  return (
    <div className="container text-center mt-4" style={{ paddingTop: '80px' }}>
      <Menu active={activeMenu} setActive={(menu) => {
        setActiveMenu(menu);
        setScore(0); // ✅ reset le score quand on change de menu
      }} />
      {renderQuiz()}
    </div>
  );
}

export default App;