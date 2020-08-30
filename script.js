
const questionNumber = document.querySelector(".question-Number");
const questionText = document.querySelector(".question-Text");
const optionContainer = document.querySelector(".option-Container");
const answerIndicatorContainer = document.querySelector(".answers-Indicators");


const homeBox = document.querySelector(".firstPage-Container");
const quizBox = document.querySelector(".quiz-Box");
const resultBox = document.querySelector(".result-Box");
// const highscore = document.querySelector(".high-score");


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;
let timeTaken = 0;
let counter = 60;
// push the questions into available questions Array
function setAvailableQuestions() {
    const totalQuestion = quiz.length;

    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }


}

// this function will set all questions , question number and PushSubscriptionOptions
function getNewQuestion() {

    // set questionNumber
    questionNumber.innerHTML = " Question  " + (questionCounter + 1) + "  of  " + quiz.length;

    // set questionText
    // random availableQuestions
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.question;


    // get the position of questionIndex from availableQuestions Array

    const index1 = availableQuestions.indexOf(questionIndex);

    // remove the questionIndex form the availableQuestions Array so that the question does not repat
    availableQuestions.splice(index1, 1);

    // get options
    // get length of options 
    const optionLen = currentQuestion.options.length

    // put options into availableOptions array 
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i)
    }
    // console.log(availableOptions)
    optionContainer.innerHTML = '';
    // create options in HTML 

    let animationDelay = 0.1;
    for (let i = 0; i < optionLen; i++) {

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[i];
        option.id = i;;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.1;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");

    }
    questionCounter++;
}

// get result of current attempt question
function getResult(element) {
    // console.log(element.id)
    const id = parseInt(element.id);
    // get answer by comparing with thier id of clicked option
    if (id === currentQuestion.answer) {
        // console.log("correct");

        // adding a class correct so can add green color
        element.classList.add("correct");

        // set green color to indicator 
        updateAnswerIndicator("correct");
        correctAnswers++;
        // console.log(correctAnswers)
    }
    else {
        // adding a class wrong so can add red color
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");

        // if answer is incorrect then show correct answer 
        const optionsLen = optionContainer.children.length;
        for (let i = 0; i < optionsLen; i++) {
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
   unclickableOptions();

    attempt++;
}

function answerIndicator() {
    answerIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {

    answerIndicatorContainer.children[questionCounter - 1].classList.add(markType)
}
// make all option unclickable when user chooses a option 
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
        
    }
}
function next() {

    if (questionCounter === quiz.length) {

        quizOver();
    }
    else {
        getNewQuestion();

    }


}

// adding timer 

function startTimer() {
    var counter = 60;
    setInterval(function () {
        counter--;
        if (counter >= 0) {
            span = document.getElementById("count");
            span.innerHTML = "Time : " + counter;
            timeTaken++;
        }
        if (counter >= 0 && counter <= 10) {

            span = document.getElementById("count");
            span.innerHTML = "Time : " + counter;
            span = document.getElementById("count");
            span.style = "color:red;";
            timeTaken++;
        }

        if (counter === 0) {
            timeUp();
            clearInterval(counter);

        }
    }, 1000);
}


function timeUp() {
    // hide quiz box 
    quizBox.classList.add("hide");
    // show result Box
    resultBox.classList.remove("hide");
    quizResult();
}
function quizOver() {
    // hide quiz homeBox
    quizBox.classList.add("hide");
    //  show result box 
    resultBox.classList.remove("hide");
    quizResult();
    console.log(timeTaken);
}


function quizResult() {
    resultBox.querySelector(".total-Question").innerHTML = quiz.length;
    resultBox.querySelector(".time-taken").innerHTML = timeTaken;

    resultBox.querySelector(".total-Correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-Wrong").innerHTML = attempt - correctAnswers;
    const percentages = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector(".percentage-").innerHTML = percentages.toFixed() + "%";
    resultBox.querySelector(".total-Score").innerHTML = correctAnswers + " / " + quiz.length;

    // storing in local storage 
    // high-score

    var highscores;
  
        if (correctAnswers > parseInt(localStorage.getItem("highscore"))) {
        localStorage.setItem("highscore", correctAnswers);
        }
       highscore = localStorage.getItem("highscore");
       resultBox.querySelector(".high-score").innerHTML = highscore + " / " + quiz.length;



}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz() {
    startTimer();
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
    timeTaken=0;
}


function goToHome() {
    // hide result box 
    resultBox.classList.add("hide");
    // shoe home box 
    homeBox.classList.remove("hide");
    resetQuiz();
}

// #######Starting page#########


function startQuiz() {
    //    console.log("working")
    // hide home box 
    homeBox.classList.add("hide");
    // show quizBox
    quizBox.classList.remove("hide");
    // first we will set all questions to availableQuestions Array
    setAvailableQuestions();
    //  second we will call getNewQuestion() function
    getNewQuestion();

    // answer Indicator 
    answerIndicator();

    let userInput1 = document.getElementById("userInput1").value;
    document.getElementById("firstName").innerHTML = userInput1;
    // console.log(userInput1);

    let userInput2 = document.getElementById("userInput2").value;
    document.getElementById("lastName").innerHTML = userInput2;
    // console.log(userInput2);
    // start timer 
    startTimer();
    timeTaken = 0;
    
    if (localStorage.getItem("highscore") === null) {
        localStorage.setItem("highscore", "0");
      }

}

var preloader = document.getElementById("loading");
function myFunction(){
preloader.style.display = 'none';
};

// ********HACKER MODE**********

// localStorage.clear();
