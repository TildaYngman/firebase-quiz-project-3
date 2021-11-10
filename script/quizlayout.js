

/* QUIZ */

let questionsArray = []
let questionsAnswers = [];
let questionCounter = 0;
let shrinkingTimerBar;
let quizPoints = 1;

async function loadedQuestionsFromApi() {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
    );
    //variabel questions is waiting for the response to be formatted to json.
    const questions = await response.json();
      questionsArray = questions.results

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
    // questionsAnswers = questions.results.map((question) => {
    //     return formatQuestion(question);
    // });
    // console.log(questionsAnswers);
});

const startBtn = document.getElementById("start-quiz-btn");

startBtn.addEventListener('click', hideBtn);

function hideBtn() {
  console.log("started")
  startBtn.classList.add('hide');
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
    console.log("running function")
    var wrapper = document.getElementById("postsSummaries")
        let i = questionCounter;
        console.log(questionsArray)
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
        <p>Enter Username:</p>
        <input type="text" placeholder="Username" id="username" />
        <p>Your Score:</p>
        <p>${quizPoints}</p>
        <button id="saveHighScore">Submit</button>
        </div>`;
        // window.location.href = "highscore.html";
        //try to insert export
        console.log("your sccore", quizPoints)
        createEventListener(quizPoints)
      }
      shuffle();
  };
  
  function createEventListener(score) {
    document.getElementById("saveHighScore").addEventListener('click', function() {
      var username = document.getElementById("username").value
      console.log(username, score)
      window.addUser(username, score)
    })
    // onclick="window.addUser(${document.getElementById("username").value}, ${quizPoints})
  }

  function initilizeButtons() {
    const buttons = document.querySelectorAll('.answerBtn')
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        console.log(button.innerText)
        console.log(questionsArray[questionCounter - 2].correct_answer)
        if(!document.getElementById("display-score")){
    return null
  }
        if(button.innerText == questionsArray[questionCounter - 2].correct_answer) {
          console.log('Win')
          quizPoints *= 4;
          document.getElementById('display-score').innerHTML = `Score: ${quizPoints}`;
          console.log(quizPoints);
        } else  {
          quizPoints /= 2 
        document.getElementById('display-score').innerHTML = `Score: ${quizPoints}`;
      }
      });
    })

  }
function shuffle() {
  const cards = document.querySelectorAll('.answerBtn');
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 4)
    card.style.order = randomPos
  })
} // Lets try to understand this

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
  createPreviewCard();
  quizPoints /= 2 
  document.getElementById('display-score').innerHTML = `Score: ${quizPoints}`;
}