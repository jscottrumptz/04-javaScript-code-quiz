let pageContentEl = document.querySelector("#page-content");
let startBtnEl = document.querySelector("#start-btn");
let answerSectionEl = document.querySelector("#answers");
let infoSectionEl = document.querySelector("#info");
let correctSectionEl = document.getElementById("correct");
let answered = false;
let timer = 75;

let beginQuiz = function(){

    let waitForAnswer = function() {
        document.getElementById("timer").innerHTML = "Time: " + timer;
        timer--;
        if (timer === 0){
            alert("GAME OVER!");
            clearInterval(startTimer);
        }
    }
    
    let startTimer = setInterval(waitForAnswer, 1000);

    // call each question object one by one
    for (var i = 0; i < quizQuestions.length; i++) {
        // clear info section
        infoSectionEl.innerHTML = "";

        if(timer > 0){

            let pickedQuestion = quizQuestions[i];

            // clear previous answers and notifications if there are any
            answerSectionEl.innerHTML = "";
            document.getElementById("correct-section").style.display = "none"

            // asks the first question to the user
            askQuestions(pickedQuestion);

            // wait for answer
            // waitForAnswer();

            // reset answer to false
            // answer = false;

        } else {
            endQuiz();
        }
    }
}

let endQuiz = function() {
    // get initials
    // post high scores
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
        document.getElementById("correct-section").style.display = "unset"
        targetEl.setAttribute("data-clicked", true);
        correctSectionEl.innerHTML = "CORRECT!";
        answered = true;
    } else if((targetEl.matches("button")) && (targetEl.getAttribute("data-correct") === "false") && (answered === false)) {
        document.getElementById("correct-section").style.display = "unset"
        targetEl.setAttribute("data-clicked", true);
        correctSectionEl.innerHTML = "WRONG!";
        timer = timer - 10;
        answered = true;
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