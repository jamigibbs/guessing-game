$(function() {
  let game = new Game();

  // Guess Submitted
  $('#input-parent input').keypress(function(event) {
    const keycode = event.keyCode || event.which;

    if (keycode == '13') {
      // enter key
      let number = +$(this).val();
      let result = game.playersGuessSubmission(number);

      $('#input-parent input').val('');
      $('#message p').remove();
      $('#message').append(`<p>${result}</p>`);
      $('#guess-count').text(4 - game.pastGuesses.length);

      // Valid guess
      if (game.resultCode === 3) {
        let hint = game.isLower() ? 'Too low.' : 'Too high.';
        let element = `#guesses:contains(${number})`;
        $('#message p').append(` ${hint}`);

        boardHighlight(element, number);
      }

      // Guessed a winning or losing number
      if (game.resultCode === 0 || game.resultCode === 1) {
        $('#input-parent')
          .find(':input:not(:disabled)')
          .prop('disabled', true);
        $('#guess-count').text(0);

        let winningNumber = game.winningNumber;
        let winNumElement = `#guesses:contains(${winningNumber})`;
        let element = `#guesses:contains(${number})`;

        if (game.resultCode === 1) {
          $('#header h2').text(
            `You won in ${game.pastGuesses.length + 1} moves!`
          );
          boardHighlight(winNumElement, winningNumber, 'winner');
        } else {
          $('#header h2').text(
            `Sorry, the winning number was ${game.winningNumber}.`
          );
          boardHighlight(element, number);
          boardHighlight(winNumElement, winningNumber, 'winner');
        }
      }
    }
  });

  // Reset Button
  $('#menu-btns #reset').on('click', function(event) {
    event.preventDefault();

    // Reset game board
    let arr = game.pastGuesses;
    arr.push(game.playersGuess, game.winningNumber);

    arr.forEach(function(value) {
      let el = `.num-${value}`;
      $(el).replaceWith(value);
    });

    // New instance
    game = new Game();

    // Reset messages and other stuff
    $('#header h2').html(
      `You have <span id="guess-count">4</span> guesses remaining`
    );
    $('#message p').remove();
    $('#input-parent')
      .find(':input(:disabled)')
      .prop('disabled', false);
  });

  // Hint button
  $('#menu-btns #hint').on('click', function(event) {
    event.preventDefault();

    if (game.resultCode > 1 || game.resultCode === null) {
      let hintArr = game.provideHint();
      let hint = `The winning number is either ${hintArr[0]}, ${
        hintArr[1]
      }, or ${hintArr[2]}`;

      $('#message #hint').remove();
      $('#message').append(`<p id="hint">${hint}</p>`);
    }
  });

  function boardHighlight(el, value, cssClass) {
    let re = new RegExp(' ' + value + ' ', 'g');
    cssClass = cssClass || '';

    $(el).html(function(__, html) {
      return html.replace(
        re,
        ` <span class="guessed num-${value} ${cssClass}">${value}</span> `
      );
    });
  }
});
