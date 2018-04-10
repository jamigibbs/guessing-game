class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    this.resultCode = null;
  }

  difference() {
    return Math.abs(this.winningNumber - this.playersGuess);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(num) {
    if (num < 1 || num > 100 || typeof num !== 'number') {
      this.resultCode = 4;
      return 'That is an invalid guess.';
    }

    this.playersGuess = num;

    if (this.pastGuesses.length === 3 && num !== this.winningNumber) {
      this.resultCode = 0;
      return 'You Lose.';
    }

    return this.checkGuess();
  }

  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      this.resultCode = 1;
      return 'You Win!';
    }

    if (this.pastGuesses.includes(this.playersGuess)) {
      this.resultCode = 2;
      return 'You have already guessed that number.';
    }

    this.pastGuesses.push(this.playersGuess);

    let diff = this.difference();
    this.resultCode = 3;
    switch (true) {
      case diff < 10:
        return "You're burning up!";
        break;
      case diff < 26:
        return "You're lukewarm.";
        break;
      case diff < 50:
        return "You're a bit chilly.";
        break;
      default:
        return "You're ice cold!";
    }
  }

  provideHint() {
    let winningNum = this.winningNumber;

    let hintArr = [0, 0, 0].map(function(val, i) {
      return i !== 0 ? generateWinningNumber() : winningNum;
    });

    return shuffle(hintArr);
  }
}

/*

  Utility Functions

*/

function newGame() {
  return new Game();
}

function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function shuffle(arr) {
  let length = arr.length;

  while (length) {
    let randomIndex = Math.floor(Math.random() * length--);
    let t = arr[length];

    arr[length] = arr[randomIndex];
    arr[randomIndex] = t;
  }
  return arr;
}
