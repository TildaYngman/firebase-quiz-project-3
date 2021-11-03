const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = {};

async function loadedQuestionsFromApi() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
  );
  //variabel questions is waiting for the response to be formatted to json.

  //Questions contain the formatted json response. The response is an object, containging two propertys the response code and the results. The results is an array of the 10 objects (questions).
  let questions = await response.json();

  return questions;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    //questions is wating for the loadedQuestonsFromApi function to retrun questions
    questions = await loadedQuestionsFromApi();
  } catch (e) {
    console.log("Error!");
    console.log(e);
  }

  console.log(questions);
  var questionsAnswers = questions.results.map((question) => {
    return formatQuestion(question);
  });
  //loops throw the array, and formats each question
  //questionsAnswers is an array of 10 objects(questions)
  console.log(questionsAnswers);
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

const MAX_QUESTIONS = 10;

getNewQuestion = () => {
  const questionIndex = Math.floor(Math.random() * 10);
  //random questions from the available questions
  currentQuestion = questions[questionIndex];

  return currentQuestion;
};
