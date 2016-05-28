var userGuess;
var correctGuesses = 0;
var incorrectGuesses = 0;
var questionBank = [
	new triviaQuestion ("how old am i", "23", ["21", "22", "24"]),
	new triviaQuestion ("test question 2", "c", ["a", "b", "d"])
];



function triviaQuestion (question, correctAnswer, incorrectAnswers){
	this.question = question;
	this.correctAnswer = correctAnswer;

	//returns an array containing every possible answer choice, randomly sorted
	this.answerShuffler = function() {
		var tempAnswers = [correctAnswer];
		var shuffledAnswers = [];
		var addedAnswers = [];

		for(var i = 0; i < incorrectAnswers.length; i++){
			tempAnswers.push(incorrectAnswers[i]);
		}

		var tempIndex = 0;
		while(tempIndex < tempAnswers.length){
			var tempValue = Math.floor((Math.random() * (tempAnswers.length - 1)) + 0.5);
			if(addedAnswers.indexOf(tempAnswers[tempValue]) == -1){
				shuffledAnswers.push(tempAnswers[tempValue]);
				addedAnswers.push(tempAnswers[tempValue]);
				tempIndex++;
			}
		}

		return shuffledAnswers;
	}
	//this.shuffledAnswers = triviaQuestion.questionShuffler;
}