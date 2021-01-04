let pageContentEl = document.querySelector("#page-content");
let startBtnEl = document.querySelector("#start-btn");
let answerSectionEl = document.querySelector("#answers");
let infoSectionEl = document.querySelector("#info");
let correctSectionEl = document.getElementById("correct");
let answered = false;
let timer = 75;
let questionNumber = 0;
let questionsLeft = true;
let score = 0;

let beginQuiz = function(){

    questionNumber = 0;
    questionsLeft = true;
    score = 0;

    let countdown = function() {
        document.getElementById("timer").innerHTML = "Time: " + timer;
        timer--;
        if (timer === 0){
            endQuiz();
            clearInterval(startTimer);
        }
    }
    
    let startTimer = setInterval(countdown, 1000);

    // ask the first question
    nextQuestion();

}

let endQuiz = function() {
    alert("QUIZ IS OVER!");

    // get initials
    // post high scores
}

let nextQuestion = function() {
    
    // see if there are questions left
    if(!questionsLeft) {
        endQuiz();
    } else {
        // set answered to false
        answered = false;

        // clear info section
        infoSectionEl.innerHTML = "";

        // pick question
        let pickedQuestion = quizQuestions[questionNumber];

        // clear previous answers and notifications if there are any
        answerSectionEl.innerHTML = "";
        document.getElementById("correct-section").style.display = "none"

        // asks the first question to the user
        askQuestions(pickedQuestion);
    }
}

let askQuestions = function(quizQuestions) {

    // Writes the question to h1 question id
    document.getElementById("question").innerHTML = quizQuestions.question;

    // generate answer buttons
    for (var i = 0; i < quizQuestions.answers.length; i++) {
        
        // create an answer button
        let answerButtonEl = document.createElement("button");
        answerButtonEl.textContent = quizQuestions.answers[i];

        // see if the button is the correct answer if so set data-correct to true
        if (quizQuestions.answers[i].charAt(0) === quizQuestions.correctAnswer) {
            answerButtonEl.setAttribute("data-correct", true);
        } else {
            answerButtonEl.setAttribute("data-correct", false);
        }

        // place the button in the answers section
        answerSectionEl.appendChild(answerButtonEl);
    }
    
}

let testAnswer = function(event) {
    //get target element from event
    let targetEl = event.target;

    if((targetEl.matches("button")) && (targetEl.getAttribute("data-correct") === "true") && (answered === false)) {
        // make the correct section visable
        document.getElementById("correct-section").style.display = "unset"
        // set data clicked to true for css styling
        targetEl.setAttribute("data-clicked", true);
        // let the user know they were correct
        correctSectionEl.innerHTML = "CORRECT!";
        // set answered to true so user cannot select another answer
        answered = true;
        // set up for next question
        questionNumber++;
        // check if there is a next question if not set questions left to false
        if ((questionNumber > quizQuestions.length - 1) || (timer <= 0)) {
            score = timer;
            questionsLeft = false;
        }
        // wait 5 seconds and ask the next question
        var wait = setTimeout(nextQuestion, 5000);
    } else if((targetEl.matches("button")) && (targetEl.getAttribute("data-correct") === "false") && (answered === false)) {
        // make the correct section visable
        document.getElementById("correct-section").style.display = "unset"
        // set data clicked to true for css styling
        targetEl.setAttribute("data-clicked", true);
        // let the user know they were wrong
        correctSectionEl.innerHTML = "WRONG!";
        // penalize the player -10 secs for being incorrect
        timer = timer - 10;
        // set answered to true so user cannot select another answer
        answered = true;
        // set up for next question
        questionNumber++;
        // check if there is a next question if not set questions left to false
        if ((questionNumber > quizQuestions.length - 1) || (timer <= 0)) {
            score = timer;
            questionsLeft = false;
        }
        // wait 5 seconds and ask the next question
        var wait = setTimeout(nextQuestion, 5000);
    }
}

// create question objects and store them into an array
let quizQuestions = [
    {
        question: "How many fucks are given?",
        answers: ["1. zero","2. one","3. two","4. three"],
        correctAnswer: "1"
    },
    {
        question: "Who does number two work for?",
        answers: ["1. Bill Burr", "2. George Carlin", "3. Dr. Evil", "4. Bill Hicks"],
        correctAnswer: "3"
    }
]

// EVENT LISTENERS
// start button listener to begin quiz
startBtnEl.addEventListener("click", beginQuiz);
answerSectionEl.addEventListener("click", testAnswer);