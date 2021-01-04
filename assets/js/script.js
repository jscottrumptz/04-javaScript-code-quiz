let pageContentEl = document.querySelector("#page-content");
let startBtnEl = document.querySelector("#start-btn");
let answerSectionEl = document.querySelector("#answers");
let infoSectionEl = document.querySelector("#info");
let correctSectionEl = document.getElementById("correct");
let answered = false;
let timer = 75;

let beginQuiz = function(){
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
            waitForAnswer(pickedQuestion);

            // reset answer to false
            answer = false;

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

    document.getElementById("question").innerHTML = quizQuestions.question;

    // generate answer buttons
    for (var i = 0; i < quizQuestions.answers.length; i++) {
        
        // create an answer button
        let answerButtonEl = document.createElement("button");
        answerButtonEl.textContent = quizQuestions.answers[i];

        // see if the button is the correct answer if so set data-correct to true
        if (quizQuestions.answers[i] === quizQuestions.correctAnswer) {
            answerButtonEl.setAttribute("data-correct", true);
        } else {
            answerButtonEl.setAttribute("data-correct", false);
        }

        // place the button in the answers section
        answerSectionEl.appendChild(answerButtonEl);
    }
    
}



let waitForAnswer = function(quizQuestions) {
    // do {
    //     console.log("waiting...");
    // } while((!answered) && (timer > 0))
}

let testAnswer = function(event) {
    //get target element from event
    let targetEl = event.target;

    if((targetEl.matches("button")) && (targetEl.getAttribute("data-correct") === "true")) {
        document.getElementById("correct-section").style.display = "unset"
        correctSectionEl.innerHTML = "CORRECT!";
        answered = true;
    } else if((targetEl.matches("button")) && (targetEl.getAttribute("data-correct") === "false")) {
        document.getElementById("correct-section").style.display = "unset"
        correctSectionEl.innerHTML = "WRONG!";
        answered = true;
    }
}



// check answer for correctness

// create question objects and store them into an array
let quizQuestions = [
    {
        question: "How many fucks are given?",
        answers: ["1. zero","2. one","3. two","4. three"],
        correctAnswer: "1. zero"
    },
    {
        question: "Who does number two work for?",
        answers: ["1. Bill Burr", "2. George Carlin", "3. Austion Powers", "4. Bill Hicks"],
        correctAnswer: "3. Austion Powers"
    }
]



// EVENT LISTENERS
// start button listener to begin quiz
startBtnEl.addEventListener("click", beginQuiz);
answerSectionEl.addEventListener("click", testAnswer);













// let askQuestion = function() {
//     let buttonItemEl = document.createElement("button");
//     buttonItemEl.className = "answer-button";

//     add answer id as a custom attribute
//     buttonItemEl.setAttribute("data-answer-id", answerIdCounter);

//     document.getElementById("answers").innerHTML = toString(this.quizQuestion.answers[0]);
// }

// let shuffleAnswers = function(quizQuestion) {
//     let i, j, k;
//     for (i = points.length -1; i > 0; i--) {
//     j = Math.floor(Math.random() * i)
//     k = quizQuestion.answers[i]
//     quizQuestion.answers[i] = quizQuestion.answers[j]
//     quizQuestion.answers[j] = k
//     }
//     document.getElementById("answers").innerHTML = quizQuestion.answers;
// }



