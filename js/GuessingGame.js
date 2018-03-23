// - [ ] Game
// - [ ] Game.prototype.playersGuessSubmission
// - [ ] Game.prototype.checkGuess
// - [ ] Game.prototype.difference
// - [ ] Game.prototype.isLower
// - [ ] Game.prototype.provideHint
// - [x] generateWinningNumber
// - [ ] newGame
// - [x] shuffle

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
