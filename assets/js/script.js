// querySelectors
let pageContentEl = document.querySelector("#page-content");
let startBtnEl = document.querySelector("#start-btn");
let answerSectionEl = document.querySelector("#answers");
let infoSectionEl = document.querySelector("#info");
let correctSectionEl = document.getElementById("correct");
let h1El = document.getElementById("question");
let timeDisplayEl = document.getElementById("timer");
let correctDisplayEl = document.getElementById("correct-section");
let initialsFormEl = document.getElementById("initials-form");
let viewHighBtnEl = document.getElementById("view-high");
let highScoresEl = document.getElementById("high-scores");
let scoreOlEl = document.getElementById("score-list");
let goBackBtnEl = document.getElementById("go-back");
let clearScoresBtnEl = document.getElementById("clear-scores");
let topScoreLiEl = document.getElementById("top-score");

// variables
let answered = false;
let timer = 75;
let questionNumber = 0;
let questionsLeft = true;
let score = 0;
let playerInitials = "";
let highScore = 0;
let quizHighScores = []

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

    // reset variables before a new quiz
    questionNumber = 0;
    questionsLeft = true;
    timer = 75;
    score = 0;

    // hide page elements
    initialsFormEl.style.display = "none"
    highScoresEl.style.display = "none"
    startBtnEl.style.display = "none"

    // function that cycles through questions in the quizQuestions array
    nextQuestion();

}

// cycles through quizQuestions
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

// asks question and populates answer buttons
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

// checks for correct or incorrect answers
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

// handles post answer logic
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
    var wait = setTimeout(nextQuestion, 3000);
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

    // clear answer buttons and the correct section
    answerSectionEl.innerHTML = "";
    correctDisplayEl.style.display = "none"

    // get initials
    initialsFormEl.style.display = "flex"
}

// capture user's initials and check for high score
let sumbitScore = function(event) {
    // stop page from refreshing
    event.preventDefault();
    // set variables
    playerInitials = document.querySelector("input[name='player-initials']").value;

    if (playerInitials === "") {
        alert("Please enter your intials")
    } else if (playerInitials.length > 3) {
        alert("Just your intials please")
    } else if (isNaN(playerInitials) === false) {
        alert("Initials please, not a number")
    }else if(score > highScore) {
        highScore = score;
        alert("New high score! " + playerInitials + " - " + score);
        let topScoreObj = {
            initials: playerInitials,
            score: score
        }
        // add the new high score into the array
        quizHighScores.unshift(topScoreObj);
        // save the high scores
        saveScores();
        // show the high scores
        displayHighScores();
    } else {
    alert("Sorry, you didn't beat the high score...");
        displayHighScores();
    }
}

// builds the high score list
let createHighScore = function() {
    
    for (let i = 0; i < quizHighScores.length; i++) {
    // create list item
    let scoreListItemEl = document.createElement("li");
    scoreListItemEl.className = "top-score";
    scoreListItemEl.innerHTML = quizHighScores[i].initials + " - " + quizHighScores[i].score;
    scoreOlEl.appendChild(scoreListItemEl);
    }
}

// displays the high score list
let displayHighScores = function() {
    
    // stop quiz timer if it was running
    clearInterval(quizTimer);

    // hide all elements so this can be used any time
    answerSectionEl.style.display = "none";
    infoSectionEl.style.display = "none";
    correctSectionEl.style.display = "none";
    h1El.style.display = "none";
    timeDisplayEl.style.display = "none";
    correctDisplayEl.style.display = "none";
    initialsFormEl.style.display = "none";
    startBtnEl.style.display = "none";
    viewHighBtnEl.style.display = "none";

    // make the high scores section visable
    highScoresEl.style.display = "unset";

    // load the high scores
    createHighScore();

}

// saves high scores to localStorage
let saveScores = function() {
    localStorage.setItem("quizHighScores", JSON.stringify(quizHighScores));
    localStorage.setItem("highScore", highScore);
}

// loads high scores from localStorage
let loadScores = function() {
    quizHighScores = JSON.parse(localStorage.getItem("quizHighScores"));
    highScore = localStorage.getItem("highScore");

    // if there are no locally stored scores, set up empty array
    if (!quizHighScores) {
        quizHighScores = [];
    }
}

// clears high scores from localStorage
let clearHighScores = function(){
    scoreOlEl.textContent = "";
    quizHighScores = [];
    highScore = 0;
    saveScores();
}

let restartQuiz = function(){
    location.reload();
}

// create question objects and store them into an array
let quizQuestions = [
    {
        question: "What is the function localStorage.setItem() used for?",
        answers: ["1. Creates data items inside local storage","2. Putting objects into an array","3. That is not a function","4. Setting an object to a local storage id"],
        correctAnswer: "1"
    },
    {
        question: "Which is a propper if statement in JavaScript?",
        answers: ["1. if i = 5 then", "2. if i == 5 then", "3. if( i == 5 )", "4. if( i = 5 )"],
        correctAnswer: "3"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["1. <js>", "2. <script>", "3. <javascript>", "4. <scripting>"],
        correctAnswer: "2"
    },
    {
        question: 'What is the correct syntax for referring to an external script called "script.js"?',
        answers: ['1. <script href="script.js">', '2. <script name="script.js">', '3. <script js="script.js">', '4. <script src="script.js">'],
        correctAnswer: "4"
    },
    {
        question: "How do you call a function named myFunction?",
        answers: ["1. call myFunction", "2. myFunction()", "3. function().myFunction", "4. let myfunction = function()"],
        correctAnswer: "2"
    }
]

// EVENT LISTENERS
// start button listener to begin quiz
startBtnEl.addEventListener("click", beginQuiz);
// answer buttons listener
answerSectionEl.addEventListener("click", testAnswer);
// initial form sumbmit button
document.addEventListener("submit", sumbitScore);
// go back button
goBackBtnEl.addEventListener("click", restartQuiz);
// view high scores button
viewHighBtnEl.addEventListener("click", displayHighScores);
// clear high scroes button
clearScoresBtnEl.addEventListener("click", clearHighScores);

// call a function to load high scores from localStorage
loadScores();