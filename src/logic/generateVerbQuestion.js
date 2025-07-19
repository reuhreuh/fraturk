import verbsData from '../data/verbes_fr_tr.json';

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateVerbQuestion() {
  const verbs = verbsData.verbs;
  const selected = getRandomElement(verbs);
  const fromLang = Math.random() < 0.5 ? 'fr' : 'tr';
  const toLang = fromLang === 'fr' ? 'tr' : 'fr';

  const formKeys = 
  [
  'infinitive', 
  'firstPerson', 
  'negativeFirstPerson',	
  'secondPerson', 
  'negativeSecondPerson',
  'thirdPerson', 
  'negativeThirdPerson', 
  'firstPersonPlural', 
  'negativeFirstPersonPlural',
  'secondPersonPlural', 
  'negativeSecondPersonPlural',
  'thirdPersonPlural', 
  'negativeThirdPersonPlural'
  ];
 
  const formKey = getRandomElement(formKeys);

  const questionText =
    formKey === 'infinitive'
      ? selected[fromLang][formKey]
      : selected[fromLang].present[formKey];

  const correctAnswer =
    formKey === 'infinitive'
      ? selected[toLang][formKey]
      : selected[toLang].present[formKey];

  const otherVerbs = verbs.filter((v) => v !== selected);

  const wrongAnswers = [];

  // Generate 1 2 or 3 wrong answer of the same form (to make it harder)
  const lookAlikeWrongAnswers = Math.floor(Math.random() * 3) + 1;
  //console.log("lookAlikeWrongAnswers = " + lookAlikeWrongAnswers);
  while(wrongAnswers.length < lookAlikeWrongAnswers){
    const wrongVerb = getRandomElement(otherVerbs);
    const wrongAnswer = formKey === 'infinitive' ? wrongVerb[toLang][formKey] : wrongVerb[toLang].present[formKey];
    if (!wrongAnswers.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
      wrongAnswers.push(wrongAnswer);
    }
  }

  // Complete with random forms answers
  while (wrongAnswers.length < 4) {
    const wrongVerb = getRandomElement(otherVerbs);
	  const wrongForm = getRandomElement(formKeys);
    const wrongAnswer = wrongForm === 'infinitive' ? wrongVerb[toLang][wrongForm] : wrongVerb[toLang].present[wrongForm];
    if (!wrongAnswers.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
      wrongAnswers.push(wrongAnswer);
    }
  }
  
  // Shuffle answers
  const options = [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());

  return {
    text: questionText,
    correct: correctAnswer,
    options
  };
}
