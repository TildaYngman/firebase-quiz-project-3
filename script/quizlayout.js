/* QUIZ */

let questionsArray = [];
let questionsAnswers = [];
let questionCounter = 0;
let shrinkingTimerBar;
let quizPoints = 1;
let questions = [];

async function loadedQuestionsFromApi() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
  );

  //Questions contain the formatted json response. The response is an object, containging two propertys the response code and the results. The results is an array of the 10 objects (questions).

  //questionsArray is an array of 10 objects (questions)

  //waiting for the response to be formatted to json.

  //we write return so we can use the value of resoponse.json outside of the function.
  return await response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    //the variable questions is wating for the loadedQuestionsFromApi function to return response.json
    questions = await loadedQuestionsFromApi();
  } catch (e) {
    console.log("Error!");
    console.log(e);
  }

  //Questions contain the formatted json response. The response is an object, containging two propertys the response code and the results. The results is an array of the 10 objects (questions).
  console.log(questions);

  //questionsArray is an array of 10 objects(questions)
  questionsArray = questions.results;
  console.log(questionsArray);

  // questionsAnswers = questions.results.map((question) => {
  //     return formatQuestion(question);
  // });
  // console.log(questionsAnswers);
});

const startBtn = document.getElementById("start-quiz-btn");

startBtn.addEventListener("click", hideBtn);

function hideBtn() {
  console.log("started");
  document.getElementById("quiz-landing-logo").classList.add("hide");
  startBtn.classList.add("hide");
  createPreviewCard();
}

// function formatQuestion(loadedQuestion) {
//   const formattedQuestion = {
//     question: loadedQuestion.question,
//   };

//   const answerChoices = [...loadedQuestion.incorrect_answers];
//   console.log(formattedQuestion);
//   formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
//   answerChoices.splice(
//     formattedQuestion.answer - 1,
//     0,
//     loadedQuestion.correct_answer
//   );
//   //puts correct answer somewhere in the array [0-3]

//   answerChoices.forEach((choice, index) => {
//     formattedQuestion["choice" + (index + 1)] = choice;
//   });
//   //choice = [choice1, choice2...] in formattedQuestion object
//   return formattedQuestion;
// }
function createPreviewCard() {
  console.log("running function");
  var wrapper = document.getElementById("postsSummaries");
  let i = questionCounter;
  console.log(questionsArray);
  if (questionCounter < 10) {
    wrapper.innerHTML = `
        <div id="display-score"></div>
        <div class="question-container">

        <p>${questionsArray[i].question}</p>
        </div> 
        
        <div class="timer-bar">
          <div class="shrinking-timer-bar"></div>
        </div>
        
        <div class="answer-container">
        <button class="answerBtn" onclick = "createPreviewCard(), restartTimer()" >${questionsArray[i].correct_answer}</button> 
        <button class="answerBtn" onclick = "createPreviewCard(), restartTimer()">${questionsArray[i].incorrect_answers[0]}</button> 
        <button class="answerBtn" onclick = "createPreviewCard(), restartTimer()">${questionsArray[i].incorrect_answers[1]}</button> 
        <button class="answerBtn" onclick = "createPreviewCard(), restartTimer()"> ${questionsArray[i].incorrect_answers[2]}</button>
        </div>`;
    questionCounter++;
    shrinkingTimerBar = document.querySelector(".shrinking-timer-bar");
    checkIftimesOut();
    initilizeButtons();
    console.log(questionCounter);
  } else {
    // document.getElementById("time-bar-container").style.display = "none"
    wrapper.innerHTML = `
        <div class="higscore-container">
        <h4>Your Score:</h4>
        <h3>${quizPoints}</h3>
        <p>Enter your username:</p>
        <input type="text" placeholder="Username..." id="username" />
        <button id="saveHighScore">Submit</button>
        </div>`;
    // window.location.href = "highscore.html";
    //try to insert export
    console.log("your sccore", quizPoints);
    createEventListener(quizPoints);
  }
  shuffle();
}

function createEventListener(score) {
  document
    .getElementById("saveHighScore")
    .addEventListener("click", function () {
      var username = document.getElementById("username").value;
      console.log(username, score);
      window.addUser(username, score);
      document.getElementById("username").value = "";
      setTimeout(function () {
        window.location.href = "./highscore.html";
      }, 400);
    });
  // onclick="window.addUser(${document.getElementById("username").value}, ${quizPoints})
}

function initilizeButtons() {
  const buttons = document.querySelectorAll(".answerBtn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log(button.innerText);
      console.log(questionsArray[questionCounter - 2].correct_answer);
      if (!document.getElementById("display-score")) {
        return null;
      }
      if (
        button.innerText == questionsArray[questionCounter - 2].correct_answer
      ) {
        console.log("Win");
        quizPoints *= 4;
        document.getElementById(
          "display-score"
        ).innerHTML = `Score: ${quizPoints}`;
        console.log(quizPoints);
      } else {
        quizPoints /= 2;
        document.getElementById(
          "display-score"
        ).innerHTML = `Score: ${quizPoints}`;
      }
    });
  });
}
function shuffle() {
  const cards = document.querySelectorAll(".answerBtn");
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 4);
    card.style.order = randomPos;
  });
} // Lets try to understand this

function restartTimer() {
  shrinkingTimerBar.style.animation = 'none';
  shrinkingTimerBar.style.animation = null;
}

function checkIftimesOut() { //called in createpreviewcard
  shrinkingTimerBar.addEventListener("webkitAnimationEnd", timeOutWrongAnswer, false); //timeOutWrongAnswer() defined further down. and called in 
  shrinkingTimerBar.addEventListener("animationend", timeOutWrongAnswer, false);
}

function timeOutWrongAnswer() {
  createPreviewCard();
  quizPoints /= 2;
  document.getElementById("display-score").innerHTML = `Score: ${quizPoints}`;
}
