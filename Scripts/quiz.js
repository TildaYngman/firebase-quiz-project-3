const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
/* const progressText = document.getElementById("progressText"); */
const scoreText = document.getElementById("score");
/* const progressBarFull = document.getElementById("progressBarFull"); */
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [];
let questionsAnswers = [];

async function loadedQuestionsFromApi() {
  let response = await fetch(
    "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
  );
  //variabel questions is waiting for the response to be formatted to json.

  //Questions contain the formatted json response. The response is an object, containging two propertys the response code and the results. The results is an array of the 10 objects (questions).
  return await response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    //questions is wating for the loadedQuestonsFromApi function to return questions
    questions = await loadedQuestionsFromApi();
  } catch (e) {
    console.log("Error!");
    console.log(e);
  }

  /* console.log(questions); */

  questionsAnswers = questions.results.map((question) => {
    return formatQuestion(question);
  });
  //loops throw the array, and formats each question
  //questionsAnswers is an array of 10 objects(questions)
  /* console.log(questionsAnswers); */
  startGame();
});

//formats question into correct format
function formatQuestion(loadedQuestion) {
  const formattedQuestion = {
    //gets the specific question in the question/loadedQuestion object
    question: loadedQuestion.question,
  };
  //gets the incorrect answers form the question/loadedQuestion object
  const answerChoices = [...loadedQuestion.incorrect_answers];

  //is going to be a random number between 1-4 ex 1, puts answer in the object formattedQuestion, answer: 1
  formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;

  //splice(start = formattedQuestion.answer - 1, deleteCount = 0, item1 = loadedQuestion.correct_answer)
  //puts the correct answer somewhere in the answerChoicesarray [0-3]
  answerChoices.splice(
    formattedQuestion.answer - 1,
    0,
    loadedQuestion.correct_answer
  );
  //exempel ['24', '15', '18']
  answerChoices.forEach((choice, index) => {
    //choice = [choice1: ..., choice2: ...] in formattedQuestion object
    //choice1 : 24
    formattedQuestion["choice" + (index + 1)] = choice;
  });
  return formattedQuestion;
}
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questionsAnswers];
  console.log(availableQuesions);
  /* availableQuesions = [...questions]; */
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuesions.length === 0) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }

  /* questionCounter++; */
  let questionIndex = Math.floor(Math.random() * availableQuesions.length);
  //random questions from the available questions
  console.log(availableQuesions);

  currentQuestion = availableQuesions[questionIndex];
  console.log(questionsAnswers);
  console.log(currentQuestion);
  question.innerHTML = currentQuestion.question;
  console.log(currentQuestion.question);

  choices.forEach((choice) => {
    //takes the dataset number from the html ex 2
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  console.log(availableQuesions);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    //om acceptingAnswers inte är true skickas man tillbaka. Går inte att klicka om inte acceptingAnswers = true
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    //Get the element that triggered a specific event
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
