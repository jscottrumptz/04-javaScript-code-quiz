let pageContentEl = document.querySelector("#page-content");
let startBtnEl = document.querySelector("#start-btn");
let answerSectionEl = document.querySelector("#answers");
let infoSectionEl = document.querySelector("#info");
let answered = false;
let timer = 75;
let questionNumber = 0;

let beginQuiz = function(){
    // clear main page
    // start timer
    // go through questions
}

let endQuiz = function() {
    // get initials
    // post high scores
}

let askQuestions = function() {
    // call each question object one by one
    for (var i = 0; i < quizQuestions.length; i++) {
        // clear info section
        infoSectionEl.innerHTML = "";

        // write question to document
        document.getElementById("question").innerHTML = quizQuestions[i].question;

        // clear previous answers if there are any
        answerSectionEl.innerHTML = "";

        // generate answer buttons
        for (var a = 0; a < quizQuestions[i].answers.length; a++) {
            

            // create an answer button
            let answerButtonEl = document.createElement("button");
            answerButtonEl.textContent = quizQuestions[i].answers[a];

            // set if the button is the correct answer
            if (quizQuestions[i].answers[a] === quizQuestions[i].correctAnswer) {
                answerButtonEl.setAttribute("data-correct", true);
            } else {
                answerButtonEl.setAttribute("data-correct", false);
            }

            // place the button in the answers section
            answerSectionEl.appendChild(answerButtonEl);
        }
    }
}

let testAnswer = function(event) {
    //get target element from event
    let targetEl = event.target;

    if((targetEl.matches("button")) && (targetEl.getAttribute("data-correct") === "true")) {
        alert("You did it!");
        answered = true;
    } else if((targetEl.matches("button")) && (targetEl.getAttribute("data-correct") === "false")) {
        alert("You failed!");
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
startBtnEl.addEventListener("click", askQuestions);
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



