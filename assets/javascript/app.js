$(document).ready(function() {

// INITIAL VARIABLES
var start;
var gameHTML;
var counter = 20;
var questionArray = [
	"1. Who is the author of Game of Thrones?", 
	"2. What is the symbol of House Stark?", 
	"3. What is the capital of Westeros (Where the 'Iron Throne' is located)?", 
	"4. What is the name of Arya's sword?", 
	"5. How many dragons does Daenerys have?", 
	"6. Who is Joffrey Lannister's real father?", 
	"7. What is the name of Jon Snow's direwolf?", 
	"8. What is the nickname of Lord Petyr Baelish?"];
var answerArray = [
	["James S.A. Corey", "George R.R. Martin", "J.R.R. Tolkien", "Robert Jordan"], 
	["Direwolf","Stag","Kraken","Rose"], 
	["Harrenhal", "Riverrun", "King's Landing", "Winterfell"], 
	["Nymeria","Needle","Sting","Winter"], 
	["One", "Two", "Three", "Four"], 
	["Ned Stark","Robert Baratheon","Rhaegar Targaryen","Jaime Lannister"], 
	["Ghost", "Grey Wind", "Summer", "Lady"], 
	["The Hound","Mockingbird","The Spider","Little Finger"]];
var correctAnswersArray = [
	"B. George R.R. Martin", 
	"A. Direwolf", 
	"C. King's Landing", 
	"B. Needle", 
	"C. Three", 
	"D. Jaime Lannister", 
	"A. Ghost", 
	"D. Little Finger"];
var questionCounter = 0;
var selectedAnswer;
var clock;
var howManyRight = 0;
var howManyWrong = 0;
var howManyUnanswered = 0;



// START BUTTON/SCREEN
function start() {
	start = "<h4 class = text-center id='instructions'>You have 20 seconds to answer each question. Click 'Start' to begin!</h4>" 
	+ "<p class='text-center main-button-container'><a class='btn btn-primary start-btn' href='#' role='button'>Start</a></p>";
	$(".contentArea").html(start);
}
start();

$("body").on("click", ".start-btn", function(event){
	event.preventDefault();
	generateHTML();
	timer();
});



// HTML GENERATION
function generateHTML() {
	gameHTML = "<h2 class='text-center' id='questionText'>" + questionArray[questionCounter] + "</h2>"  
		+ "<p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p>"
		+ "<p class='answer'>B. " + answerArray[questionCounter][1] + "</p>"
		+ "<p class='answer'>C. " + answerArray[questionCounter][2] + "</p>"
		+ "<p class='answer'>D. " + answerArray[questionCounter][3] + "</p>"
		+ "<h4 class='text-center timer-wrapper'> Time: <span class='timer'>20</span> </h4>";
	$(".contentArea").html(gameHTML);
}


//TIMER - 20 SECONDS and QUESTION ITERATOR
function timer() {
	clock = setInterval(twentySeconds, 1000); 
	function twentySeconds() {
		if (counter === 0) {
			clearInterval(clock);
			ranOutOfTime();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 20;
	timer();
	}
	else {
		answerScreen();
	}
}


// CHOOSING AN ANSWER
$("body").on("click", ".answer", function(event){
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswersArray[questionCounter]) {
		clearInterval(clock);
		pickedRightAnswer();
	}
	else {
		clearInterval(clock);
		pickedWrongAnswer();
	}
});



// IF PICKED RIGHT ANSWER
function pickedRightAnswer() {
	howManyRight++;
	gameHTML = "<h3 class='text-center' id='rightFeedback'>Correct! The answer is: " + correctAnswersArray[questionCounter] + "</h3>";
	$(".contentArea").html(gameHTML);
	setTimeout(wait, 3000);
}

// IF PICKED WRONG ANSWER
function pickedWrongAnswer() {
	howManyWrong++;
	gameHTML = "<h3 class='text-center' id='wrongFeedback'>Wrong! The correct answer is: "+ correctAnswersArray[questionCounter] + "</h3>";
	$(".contentArea").html(gameHTML);
	setTimeout(wait, 3000);
}

// IF DIDN'T PICK AN ANSWER (RAN OUT OF TIME)
function ranOutOfTime() {
	howManyUnanswered++;
	gameHTML = "<h3 class='text-center' id='unansweredFeedback'>You ran out of time!  The correct answer was: " + correctAnswersArray[questionCounter] + "</h3>";
	$(".contentArea").html(gameHTML);
	setTimeout(wait, 3000);
}



// ANSWER SCREEN
function answerScreen() {
	gameHTML = "<h3 class='text-center' id='results'>Results</h3>" 
		+ "<p class='summary-right'>Correct Answers: " + howManyRight + "</p>" 
		+ "<p class='summary-wrong'>Wrong Answers: " + howManyWrong + "</p>" 
		+ "<p class='summary-unanswered'>Unanswered: " + howManyUnanswered + "</p>" 
		+ "<p class='text-center reset-button-container'><a class='btn btn-primary reset-btn' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".contentArea").html(gameHTML);
}


// RESET
function resetGame() {
	questionCounter = 0;
	howManyRight = 0;
	howManyWrong = 0;
	howManyUnanswered = 0;
	counter = 20;
	generateHTML();
	timer();
}

$("body").on("click", ".reset-btn", function(event){
	event.preventDefault();
	resetGame();
});



});  //  Closes doc.ready