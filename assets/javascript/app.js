var correctGuesses = 0;
var incorrectGuesses = 0;
var currentQuestionIndex = 0;
var hasChosenAnswer = true;
var timer;
var questionBank = [
	new triviaQuestion("The Dude abides.", "The Big Lebowski", ["Airplane", "Clerks", "Top Gun"]),
	new triviaQuestion("Hail to the king, baby.", "Army of Darkness", ["Scarface", "Lethal Weapon", "The Terminator"]),
	new triviaQuestion("Get out of my way son, you're usin' my oxygen.", "One Flew Over the Cuckoo's Nest", ["Midnight Cowboy", "Crocodile Dundee", "The Untouchables"]),
	new triviaQuestion("Oh, I'm sorry. Did I break your concentration?", "Pulp Fiction", ["Mystic River", "Men In Black", "Die Hard"]),
	new triviaQuestion("Every man dies, not every man truly lives.", "Braveheart", ["Saving Private Ryan", "Pearl Harbor", "Troy"])
];

function triviaQuestion (question, correctAnswer, incorrectAnswers){
	this.question = question;
	this.correctAnswer = correctAnswer;

	//returns an array containing every possible answer choice, randomly sorted
	this.answerShuffler = function() {
		var tempAnswers = [correctAnswer];
		var shuffledAnswers = [];
		var addedAnswers = [];

		for(var i = 0; i < incorrectAnswers.length; i++)
			tempAnswers.push(incorrectAnswers[i]);

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
}

function playGame(){
	timer = clearTimeout();
	if(currentQuestionIndex < questionBank.length){
		if(hasChosenAnswer == false){
			hasChosenAnswer = true;
			timer = clearTimeout();
			timer = setTimeout(playGame, 1000 * 4);
			incorrectGuesses++;
			$('#questionDisplay').html('<h2>Out of time<br>Correct Answer: ' + questionBank[currentQuestionIndex].correctAnswer);
			currentQuestionIndex++;
		}
		else{
			timer = clearTimeout();
			timer = setTimeout(playGame, 1000 * 10);
			hasChosenAnswer = false;
			if(currentQuestionIndex < questionBank.length){
				$('#questionDisplay').html('<h1>Quote #' + (currentQuestionIndex + 1) + '</h1><br><h2>' + 
					questionBank[currentQuestionIndex].question);
				var currentAnswerChoices = questionBank[currentQuestionIndex].answerShuffler();
				for(var i = 0; i < currentAnswerChoices.length; i++){
					$('#questionDisplay').append('<button class="answerChoice">' + currentAnswerChoices[i] + '</button><br>');
				}
				$('.answerChoice').on('click', function(){
					hasChosenAnswer = true;
					timer = clearTimeout();
					if($(this).text() == questionBank[currentQuestionIndex].correctAnswer){
						correctGuesses++;
						$('#questionDisplay').html('<h2>Correct</h1>');
					}
					else{
						incorrectGuesses++;
						$('#questionDisplay').html('<h2>Incorrect<br>Correct Answer: ' + 
							questionBank[currentQuestionIndex].correctAnswer);
					}
					currentQuestionIndex++;
				});
			}
			else{
				timer = clearTimeout();
				$('#questionDisplay').removeClass();
				$('#questionDisplay').addClass('hidden');
				$('#endDisplay').removeClass();
				$('#endDisplay').addClass('shown');
				$('#endDisplay').html('<h1>Finished!</h1><br><h2>Correct: ' + correctGuesses + 
					'<br>Incorrect: ' + incorrectGuesses);
				$('#resetButton').removeClass();
				$('#resetButton').addClass('shown');
			}
		}
	}
	else{
		timer = clearTimeout();
		$('#questionDisplay').removeClass();
		$('#questionDisplay').addClass('hidden');
		$('#endDisplay').removeClass();
		$('#endDisplay').addClass('shown');
		$('#endDisplay').html('<h1>Finished!</h1><br><h2>Correct: ' + correctGuesses + 
			'<br>Incorrect: ' + incorrectGuesses);
		$('#resetButton').removeClass();
		$('#resetButton').addClass('shown');
	}
}


$('#startButton').on('click', function(){
	timer = clearTimeout();
	$('#startDisplay').removeClass();
	$('#startDisplay').addClass('hidden');
	$('#questionDisplay').removeClass();
	$('#questionDisplay').addClass('shown');
	$('#startDisplay').Hide;
	$('#questionDisplay').Show;
	playGame();
});

$('#resetButton').on('click', function(){
	timer = clearTimeout();
	$('#resetButton').removeClass();
	$('#resetButton').addClass('hidden');
	$('#questionDisplay').removeClass();
	$('#questionDisplay').addClass('hidden');
	$('#endDisplay').removeClass();
	$('#endDisplay').addClass('hidden');
	$('#startDisplay').removeClass();
	$('#startDisplay').addClass('shown');
	currentQuestionIndex = 0;
	correctGuesses = 0;
	incorrectGuesses = 0;
});