$(document).ready(function() {
  // console.log( "ready!" );

  // track which question we are on
  var questionCounter = 0;
  // initial time of 15 seconds for each question
  var time = 15;
  // will keep tally of right guesses for end game
  var correctGuesses = 0;
  //will keep tally of wrong guesses for end game
  var incorrectGuesses = 0;

  // question & answer array
  var questions = [
    {
    question: "What color was Monica's apartment?",
    choices: ["Pink", "Purple", "Blue", "Grey"],
    correctAnswer: "Purple",
    image: "<img src='images/purple.jpg' class='img-rounded shadow'>"
  }, 
  {
    question: "Where did Ross marry Emily?",
    choices: ["London", "New York", "Ireland", "Yemen"],
    correctAnswer: "London",
    image: "<img src='images/image.gif' class='img-rounded shadow'>"
  }, 

  {
    question: "How many babies did Phoebe have?",
    choices: ["1", "2", "3", "4"],
    correctAnswer: "3",
    image: "<img src='images/triplets.jpg' class='img-rounded shadow'>"
  }, 
  {
    question: "What is Chandler's last name?",
    choices: ["Bing", "Bang", "Bong", "Green"],
    correctAnswer: "Bing",
    image: "<img src='images/woopah.gif' class='img-rounded shadow'>"
  },
  {
    question: "What is Monica's job?",
    choices: ["Doctor", "Chef", "Actor", "Nurse"],
    correctAnswer: "Chef",
    image: "<img src='images/monica.jpg' class='img-rounded shadow'>"
  },
    
  {
    question: "Who did Joey play on Days of Our Lives?",
    choices: ["Dr. Drake Ramoray", "Joseph Tribbiani", "Ken Adams", "Gunther"],
    correctAnswer: "Dr. Drake Ramoray",
    image: "<img src='images/drake.gif' class='img-rounded shadow'>"
  },
  {
    question: "Who is Marcel?",
    choices: ["Joey's brother", "Phoebe's boyfriend", "Ross's pet monkey", "Monica's neighbor"],
    correctAnswer: "Ross's pet monkey",
    image: "<img src='images/marcel.jpg' class='img-rounded shadow'>"
  },

  {
    question: "Who was Phoebe's twin?",
    choices: ["Mandy", "Janice", "Karen", "Ursula"],
    correctAnswer: "Ursula",
    image: "<img src='images/ursula.png' class='img-rounded shadow'>"
  },

  {
    question: "What did Ross and Rachel name their baby?",
    choices: ["Emma", "Ruth", "Isabella", "Delilah"],
    correctAnswer: "Emma",
    image: "<img src='images/emma2.gif' class='img-rounded shadow'>"
  },

  {
    question: "Who did Chandler marry?",
    choices: ["Janice", "Monica", "Rachel", "Phoebe"],
    correctAnswer: "Monica",
    image: "<img src='images/wedding.jpg' class='img-rounded shadow'>"
  },
  {
    question: "How many times was Ross divorced?",
    choices: ["1", "2", "3", "4"],
    correctAnswer: "3",
    image: "<img src='images/divorce.gif' class='img-rounded shadow'>"
  }];
  

// create question contents according to question count
function questionContent() {
  // a for loop would be cool here...
    $("#gameScreen").append("<p><strong>" + 
      questions[questionCounter].question + 
      "</p><p class='choices'>" + 
      questions[questionCounter].choices[0] + 
      "</p><p class='choices'>" + 
      questions[questionCounter].choices[1] + 
      "</p><p class='choices'>" + 
      questions[questionCounter].choices[2] + 
      "</p><p class='choices'>" + 
      questions[questionCounter].choices[3] + 
      "</strong></p>");
}

// user guessed correctly
function userWin() {
  $("#gameScreen").html("<p>You got it right!</p>");
  correctGuesses++;
  var correctAnswer = questions[questionCounter].correctAnswer;
  $("#gameScreen").append("<p>The answer was <span class='answer'>" + 
    correctAnswer + 
    "</span></p>" + 
    questions[questionCounter].image);
  setTimeout(nextQuestion, 4000);
  questionCounter++;
}

// user guessed incorrectly
function userLoss() {
  $("#gameScreen").html("<p>Nope, that's not it!</p>");
  incorrectGuesses++;
  var correctAnswer = questions[questionCounter].correctAnswer;
  $("#gameScreen").append("<p>The answer was <span class='answer'>" + 
    correctAnswer + 
    "</span></p>" + 
    questions[questionCounter].image);
  setTimeout(nextQuestion, 4000);
  questionCounter++;
}

// user ran out of time
function userTimeout() {
  if (time === 0) {
    $("#gameScreen").html("<p>You ran out of time!</p>");
    incorrectGuesses++;
    var correctAnswer = questions[questionCounter].correctAnswer;
    $("#gameScreen").append("<p>The answer was <span class='answer'>" + 
      correctAnswer + 
      "</span></p>" + 
      questions[questionCounter].image);
    setTimeout(nextQuestion, 4000);
    questionCounter++;
  }
}

// screen that shows final score and nice message :)
function resultsScreen() {
  if (correctGuesses === questions.length) {
    var endMessage = "Someone's a Superfan!";
  }
  else if (correctGuesses > incorrectGuesses) {
    var endMessage = "Good work! But you can do better...";
  }
  else {
    var endMessage = "Your homework is to go binge watch on netflix";
  }
  $("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
    correctGuesses + "</strong> right.</p>" + 
    "<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p> <br>");
  $("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
  $("#bottomText").html(bottomText);
  gameReset();
  $("#start").click(nextQuestion);
}

// game clock currently set to 15 seconds
function timer() {
  clock = setInterval(countDown, 1000);
  function countDown() {
    if (time < 1) {
      clearInterval(clock);
      userTimeout();
    }
    if (time > 0) {
      time--;
    }
    $("#timer").html("<strong>" + time + "</strong>");
  }
}

// moves question counter forward to show next question
function nextQuestion() {
  if (questionCounter < questions.length) {
    time = 15;
    $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    questionContent();
    timer();
    userTimeout();
  }
  else {
    resultsScreen();
  }
// console.log(questionCounter);
// console.log(questions[questionCounter].correctAnswer);
}

// reset score and counter parameters on restart
function gameReset() {
  questionCounter = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
}

  function startGame() {
    $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    $("#start").hide();
    // $("#gameScreen").append("<div id='question'>");
    // var nextQuestion = questionContent(questionCounter);
    // $("#gameScreen").append(nextQuestion);

  // $("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
  // questionCounter++;
  questionContent();
    timer();
    userTimeout();
  }

  // this starts the game
  $("#start").click(nextQuestion);

  // click function to trigger right or wrong screen
$("#gameScreen").on("click", ".choices", (function() {
  // alert("clicked!");
  var userGuess = $(this).text();
  if (userGuess === questions[questionCounter].correctAnswer) {
    clearInterval(clock);
    userWin();
  }
  else {
    clearInterval(clock);
    userLoss();
  }
}));
});