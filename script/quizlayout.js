async function loadedQuestionsFromApi() {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
    );
    //variabel questions is waiting for the response to be formatted to json.
    const questions = await response.json();
  
    return questions;
}

  let questionsAnswers = [];
  let questionCounter = 0;
  
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

  

  function createPreviewCard(card) {
    var wrapper = document.getElementById("postsSummaries")
        let i = questionCounter;
        wrapper.innerHTML = `<p>${questionsAnswers[i].question}</p> 
        <button>${questionsAnswers[i].choice1}</button> 
        <button>${questionsAnswers[i].choice2}</button> 
        <button>${questionsAnswers[i].choice3}</button> 
        <button>${questionsAnswers[i].choice4}</button>`;
        questionCounter++;
  };
console.log(questionsAnswers);

