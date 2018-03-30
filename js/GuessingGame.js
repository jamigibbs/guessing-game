function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
  return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function(){
  return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(num){
  if(num < 1 || num > 100 || typeof num !== 'number'){
    throw('That is an invalid guess.');
  }

  this.playersGuess = num;

  if(this.pastGuesses.length > 3){
    return "You Lose.";
  }

  return this.checkGuess();
}

Game.prototype.checkGuess = function(){
  if(this.playersGuess === this.winningNumber){
    return 'You Win!'
  }

  if(this.pastGuesses.includes(this.playersGuess)){
    return 'You have already guessed that number.';
  };

  this.pastGuesses.push(this.playersGuess);

  var diff = this.difference();
  switch(true){
    case diff < 10:
      return "You\'re burning up!";
      break;
    case diff < 26:
      return "You\'re lukewarm.";
      break;
    case diff < 50:
      return "You\'re a bit chilly.";
      break;
    default:
      return "You\'re ice cold!";
  }
}

Game.prototype.provideHint = function(){
  var winningNum = this.winningNumber;

  var hintArr = [0, 0, 0].map(function(val, i){
    return i !== 0 ? generateWinningNumber() : winningNum;
  })

  return shuffle(hintArr);
}

/* 

  Utility Functions   

*/

function newGame(){
  return new Game()
}

function generateWinningNumber(){
  return Math.floor( Math.random() * 100 ) + 1;
}

function shuffle(arr){
  var length = arr.length;

  while(length){
    var randomIndex = Math.floor(Math.random() * length--);
    var t = arr[length];

    arr[length] = arr[randomIndex];
    arr[randomIndex] = t;
  }
  return arr;
}
