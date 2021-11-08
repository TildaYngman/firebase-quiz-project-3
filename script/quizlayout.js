let questionsAnswers = [];
let questionCounter = 0;
let shrinkingTimerBar;

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
    questionsAnswers = questions.results.map((question) => {
        return formatQuestion(question);
    });
    console.log(questionsAnswers);
});

const startBtn = document.getElementById("start-quiz-btn");

startBtn.addEventListener('click', hideBtn);

function hideBtn() {
  console.log("started")
  startBtn.classList.add('hide');
}
  
  function formatQuestion(loadedQuestion) {
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
    //puts correct answer somewhere in the array [0-3]
  
    answerChoices.forEach((choice, index) => {
      formattedQuestion["choice" + (index + 1)] = choice;
    });
    //choice = [choice1, choice2...] in formattedQuestion object
    return formattedQuestion;
  }

  function createPreviewCard() {
    var wrapper = document.getElementById("postsSummaries")
        let i = questionCounter;
        if (questionCounter < 10) {
        wrapper.innerHTML = `
        <div class="question-container">
          <p>${questionsAnswers[i].question}</p>
        </div>

        <div class="timer-bar">
          <div class="shrinking-timer-bar"></div>
        </div>

        <div class="answer-container">
        <button class="answerBtn" onclick = "createPreviewCard(); restartTimer()">${questionsAnswers[i].choice1}</button> 
        <button class="answerBtn" onclick = "createPreviewCard(); restartTimer()">${questionsAnswers[i].choice2}</button> 
        <button class="answerBtn" onclick = "createPreviewCard(); restartTimer()">${questionsAnswers[i].choice3}</button> 
        <button class="answerBtn" onclick = "createPreviewCard(); restartTimer()">${questionsAnswers[i].choice4}</button>
        </div>`;
        questionCounter++;
        shrinkingTimerBar = document.querySelector(".shrinking-timer-bar");
        checkIftimesOut();
      } else {
        window.location.href = "index.html";
      }
  };
console.log(questionsAnswers);

function restartTimer(){
  shrinkingTimerBar.style.animation = 'none';
  shrinkingTimerBar.offsetHeight; /* trigger reflow */
  shrinkingTimerBar.style.animation = null; 
} 

function checkIftimesOut() {
  shrinkingTimerBar.addEventListener("webkitAnimationEnd", timeOutWrongAnswer, false);
  shrinkingTimerBar.addEventListener("animationend", timeOutWrongAnswer, false);
}

function timeOutWrongAnswer() {
  alert("The time is out");
}