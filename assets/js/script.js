let pageContentEl = document.querySelector("#page-content");
let startBtnEl = document.querySelector("#start-btn");
let answerSectionEl = document.querySelector("#answers");
let infoSectionEl = document.querySelector("#info");
let correctSectionEl = document.getElementById("correct");
let h1El = document.getElementById("question");
let timeDisplayEl = document.getElementById("timer");
let correctDisplayEl = document.getElementById("correct-section");
let initialsFormEl = document.getElementById("initials-form");
let answered = false;
let timer = 75;
let questionNumber = 0;
let questionsLeft = true;
let score = 0;
let playerInitials = "";
let highScore = 0;

// countdown funtion for the quizTimer
let countdown = function() {
    timer--;
    timeDisplayEl.innerHTML = "Time: " + timer;
    if (timer === 0){
        endQuiz();
    }
}

// sets the timer to 1 sec increments
let quizTimer = setInterval(countdown, 1000);

// stops the timer
clearInterval(quizTimer);

// starts the quiz
let beginQuiz = function(){

    questionNumber = 0;
    questionsLeft = true;
    timer = 75;
    score = 0;
    initialsFormEl.style.display = "none"

    // function that cycles through questions in the quizQuestions array
    nextQuestion();

}

// ends the quiz
let endQuiz = function() {
    // stops the timer
    clearInterval(quizTimer);

    // announce it has ended    
    h1El.innerHTML = "All done!";
    h1El.style.textAlign = "left";
    h1El.style.margin = "0 0 10px 0";
    // display final score
    infoSectionEl.innerHTML = "Your final score is " + score + ".";
    infoSectionEl.style.textAlign = "left";
    infoSectionEl.style.margin = "0";

    // clear answer buttons an correct section
    answerSectionEl.innerHTML = "";
    correctDisplayEl.style.display = "none"

    // get initials
    initialsFormEl.style.display = "flex"
    // post high scores
}

let nextQuestion = function() {

    // starts the timer
    quizTimer = setInterval(countdown, 1000);
    
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
        correctDisplayEl.style.display = "none"

        // asks the first question to the user
        askQuestions(pickedQuestion);
    }
}

let askQuestions = function(quizQuestions) {

    // Writes the question to h1 question id
    h1El.innerHTML = quizQuestions.question;
    h1El.style.textAlign = "center";

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
    
    // if it is the right answer
    if((targetEl.matches("button")) && (targetEl.getAttribute("data-correct") === "true") && (answered === false)) {
        // make the correct section visable
        correctDisplayEl.style.display = "unset"
        // set data clicked to true for css styling
        targetEl.setAttribute("data-clicked", true);
        // let the user know they were correct
        correctSectionEl.innerHTML = "CORRECT!";
        answerHandler();

        // if it is the wrong answer
    } else if((targetEl.matches("button")) && (targetEl.getAttribute("data-correct") === "false") && (answered === false)) {
        // make the correct section visable
        correctDisplayEl.style.display = "unset"
        // set data clicked to true for css styling
        targetEl.setAttribute("data-clicked", true);
        // let the user know they were wrong
        correctSectionEl.innerHTML = "WRONG!";
        // penalize the player -10 secs for being incorrect
        timer = timer - 10;
        answerHandler();
    }
}

let answerHandler = function() {
    timeDisplayEl.innerHTML = "Time: " + timer;
    // set answered to true so user cannot select another answer
    answered = true;
    // set up for next question
    questionNumber++;
    // check if there is a next question if not set questions left to false
    if ((questionNumber > quizQuestions.length - 1) || (timer <= 0)) {
        score = timer;
        questionsLeft = false;
    }
    // pause the timer and wait 5 seconds and ask the next question
    clearInterval(quizTimer);
    var wait = setTimeout(nextQuestion, 5000);
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
    },
    {
        question: "Who's the boss?",
        answers: ["1. Tony", "2. Angelia", "3. Mona", "4. Samantha"],
        correctAnswer: "2"
    }
]

let sumbitScore = function(event) {
    // stop page from refreshing
    event.preventDefault();
    // set variables
    playerInitials = document.querySelector("input[name='player-initials']").value;

    if (playerInitials === "") {
        alert("Please enter your intials")
    } else if(score > highScore ) {
        highScore = score;
    alert(playerInitials + " has a score of " + score);
    } else {
    alert("Sorry, you didn't beat the high score...")
    }
}

// EVENT LISTENERS
// start button listener to begin quiz
startBtnEl.addEventListener("click", beginQuiz);
answerSectionEl.addEventListener("click", testAnswer);
document.addEventListener("submit", sumbitScore);