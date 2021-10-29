/* const question = document.getElementById("question");
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

let questions = []; */

async function loadedQuestionsFromApi() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
  );
  //variabel questions is waiting for the response to be formatted to json.
  const questions = await response.json();

  return questions;
}

document.addEventListener("DOMContentLoaded", async () => {
  let questions = [];

  try {
    questions = await loadedQuestionsFromApi();
  } catch (e) {
    console.log("Error!");
    console.log(e);
  }
  console.log(questions);
});

/* 
fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
); */
/* .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });

    startGame();
  })
  .catch((err) => {
    console.error(err);
  });
 */
