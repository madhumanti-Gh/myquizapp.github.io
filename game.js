// console.log("Hello!");
const question = document.getElementById("question");
const choices = Array.from( document.getElementsByClassName("choice-text") );
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
// console.log(choices);

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// put questions
let questions = [
    {
        question: "How do you write 'Hello World!' inside an alert box ?",
        choice1: "'Hello World!'",
        choice2: "<script>Hello World!</script>",
        choice3: "alert('Hello World!');",
        choice4: "alert: Hello World!",
        answer: 3
    },
    {
        question: "What is the correct syntax for refering to an external script called 'xxx.js' ?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script src='xxx.js'>",
        choice3: "<script name='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 2
    },
    {
        question: "Inside which HTML element do we put the javaScript ?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "Which statement is false ?",
        choice1: "Block elements can be nested inside block elements.",
        choice2: "Inline elements can be nested inside inline elements.",
        choice3: "Block elements can be nested inside inline elements.",
        choice4: "Inline elements can be nested inside block elements.",
        answer: 3
    },
    {
        question: "When is the link tag used ?",
        choice1: "When linking stylesheet, favicons and preloading assets.",
        choice2: "When linking stylesheet, JavaScript and icons for mobile app.",
        choice3: "When linking one webpage to another.",
        choice4: "When linking stylesheet, external URL's and favicons.",
        answer: 1
    },
    {
        question: "What is the primary purpose of HTML ?",
        choice1: "Responsible for the structures and styling of webpages.",
        choice2: "Structures and provides a rudimentary look to webpages.",
        choice3: "Structure the webpages, identifying its elements such as paragraphs, headings, and lists.",
        choice4: "Responsible for structure, styling and interactivity if webpages.",
        answer: 3
    },
    {
        question: "What does the code do ?",
        choice1: "The browser plays the sound automatically and continuously in the background. The user may stop the sound at anytime.",
        choice2: "The browser plays the sound once automatically in the background. The user has no control over the sound.",
        choice3: "When the 'Play' button is pressed, the browser plays the sound over and over again until the user stops it.",
        choice4: "The browser plays the sound automatically and continuously in the background. The user has no control over the sound.",
        answer: 4
    }
];

//constants
const Correct_Bonus = 10;
const Max_Questions = 5;   // can change

StartGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= Max_Questions){
        localStorage.setItem("mostRecentScore", score);
        // go to the end page
        return window.location.assign("end.html");
    }

    questionCounter++;
    progressText.innerText = "Question " + questionCounter + "/" + Max_Questions;
    // questionCounterText.innerText = "${questionCounter}/${Max_Questions}";

    // Update progress Bar
    // console.log((questionCounter / Max_Questions) * 100);
    progressBarFull.style.width = (questionCounter / Max_Questions) * 100 + "%";

    const questionIndex = Math.floor( Math.random() * availableQuestions.length );
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    } );

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswer = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if( !acceptingAnswer )return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        // const classToApply = 'incorrect';
        // if( selectedAnswer == currentQuestion.answer ){
        //     classToApply = 'correct';
        // }
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if(classToApply === 'correct'){
            increamentScore(Correct_Bonus);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000 );
        
    });
});

increamentScore = num => {
    score += num;
    scoreText.innerText = score;
}

StartGame();
