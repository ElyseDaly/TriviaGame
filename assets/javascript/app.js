$(document).ready(function() {

// INITIAL VARIABLES
var start;
var gameHTML;
var counter = 20;
var questionArray = [
	"What is the capital of Australia?", 
	"What is the capital of Liberia?", 
	"What is the capital of Taiwan?", 
	"What is the capital of Japan?", 
	"What is the capital of China?", 
	"What is the capital of Turkey?", 
	"What is the capital of Colombia?", 
	"What is the capital of India?"];
var answerArray = [
	["Canberra", "Melbourne", "Sydney", "Darwin"], 
	["Arthington","Monrovia","Tuzon","Marshall"], 
	["Tainan City", "Taichung", "Taipei", "Hsinchu"], 
	["Kyoto","Hiroshima","Tokyo","Osaka"], 
	["Hong Kong", "Macau", "Shanghai", "Beijing"], 
	["Ankara","Istanbul","Antalya","Bursa"], 
	["Medellin", "Bogota", "Cartagena", "Cali"], 
	["Mumbai","Hyderabad","Bangalore","New Delhi"]];
var correctAnswersArray = [
	"A. Canberra", 
	"B. Monrovia", 
	"C. Taipei", 
	"C. Tokyo", 
	"D. Beijing", 
	"A. Ankara", 
	"B. Bogota", 
	"D. New Delhi"];
var questionCounter = 0;
var selectedAnswer;
var clock;
var howManyRight = 0;
var howManyWrong = 0;
var howManyUnanswered = 0;



// START BUTTON/SCREEN
function start() {
	start = "<p class='text-center main-button-container'><a class='btn btn-primary start-btn' href='#' role='button'>Start</a></p>";
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
	gameHTML = "<h2 class='text-center'>" + questionArray[questionCounter] + "</h2>" 
		+ "<p class='text-center timer-p'> Time Remaining: <span class='timer'>20</span> </p>" 
		+ "<p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p>"
		+ "<p class='answer'>B. " + answerArray[questionCounter][1] + "</p>"
		+ "<p class='answer'>C. " + answerArray[questionCounter][2] + "</p>"
		+ "<p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
	$(".contentArea").html(gameHTML);
}


// TIMER - 20 SECONDS and QUESTION ITERATOR
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
	gameHTML = "<h3 class='text-center'>Correct! The answer is: " + correctAnswersArray[questionCounter] + "</h3>";
	$(".contentArea").html(gameHTML);
	setTimeout(wait, 3000);
}

// IF PICKED WRONG ANSWER
function pickedWrongAnswer() {
	howManyWrong++;
	gameHTML = "<h3 class='text-center'>Wrong! The correct answer is: "+ correctAnswersArray[questionCounter] + "</h3>";
	$(".contentArea").html(gameHTML);
	setTimeout(wait, 3000);
}

// IF DIDN'T PICK AN ANSWER (RAN OUT OF TIME)
function ranOutOfTime() {
	howManyUnanswered++;
	gameHTML = "<h3 class='text-center'>You ran out of time!  The correct answer was: " + correctAnswersArray[questionCounter] + "</h3>";
	$(".contentArea").html(gameHTML);
	setTimeout(wait, 3000);
}



// ANSWER SCREEN
function answerScreen() {
	gameHTML = "<p class='text-center'>Results" + "</p>" 
		+ "<p class='summary-correct'>Correct Answers: " + howManyRight + "</p>" 
		+ "<p>Wrong Answers: " + howManyWrong + "</p>" 
		+ "<p>Unanswered: " + howManyUnanswered + "</p>" 
		+ "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
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

$("body").on("click", ".reset-button", function(event){
	resetGame();
});



});  //  Closes doc.ready