import verbsData from '../verbes_fr_tr.json';

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateQuestion() {
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

  while (wrongAnswers.length < 4) {
    const wrongVerb = getRandomElement(otherVerbs);
	const wrongForm = getRandomElement(formKeys);
    const wrongAnswer =
      wrongForm === 'infinitive'
        ? wrongVerb[toLang][wrongForm]
        : wrongVerb[toLang].present[wrongForm];
    if (!wrongAnswers.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
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
