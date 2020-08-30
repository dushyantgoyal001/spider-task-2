
const questionNumber = document.querySelector(".question-Number");
const questionText = document.querySelector(".question-Text");
const optionContainer = document.querySelector(".option-Container");
const answerIndicatorContainer = document.querySelector(".answers-Indicators");


const homeBox = document.querySelector(".firstPage-Container");
const quizBox = document.querySelector(".quiz-Box");
const resultBox = document.querySelector(".result-Box");


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

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
    for (let i = 0; i < optionLen; i++) {
        
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[i];
        option.id = i;;
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
        console.log(correctAnswers)
    }
    else {
        // adding a class wrong so can add red color
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");
    }


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
function next() {

    if (questionCounter === quiz.length) {

        quizOver();
    }
    else {
        getNewQuestion();

    }
}
function quizOver() {
    // hide quiz homeBox
    quizBox.classList.add("hide");
    //  show result box 
    resultBox.classList.remove("hide");
    quizResult();
}


function quizResult() {
    resultBox.querySelector(".total-Question").innerHTML = quiz.length;
    
    resultBox.querySelector(".total-Correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-Wrong").innerHTML = attempt - correctAnswers;
    const percentages = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector(".percentage-").innerHTML = percentages.toFixed() + "%";
    resultBox.querySelector(".total-Score").innerHTML = correctAnswers + " / " + quiz.length;
}
function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz() {
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}


function goToHome(){
    // hide result box 
    resultBox.classList.add("hide");
    // shoe home box 
    homeBox.classList.remove("hide");
    resetQuiz();
}

// #######Starting page#########


function startQuiz() {
   console.log("working")
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
}

