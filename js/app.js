$(function() {

  var game = new Game();

  $('#input-parent input').keypress(function(event){
    var keycode = event.keyCode || event.which;

    if(keycode == '13'){ // enter key
      var number = +$(this).val();
      var result = game.playersGuessSubmission(number);

      $('#input-parent input').val('');
      $('#message p').remove();
      $('#message').append(`<p>${result}</p>`);
      $('#guess-count').text(4 - game.pastGuesses.length)
      
      // Valid guess
      if(game.resultCode === 3){
        var hint = game.isLower() ? 'Too low.' : 'Too high.';
        var element = `#guesses:contains(${number})`;
        $('#message p').append(` ${hint}`);

        boardHighlight(element, number);
      }

      // Guessed a winning or losing number
      if(game.resultCode === 0 || game.resultCode === 1){
        $('#input-parent').find(':input:not(:disabled)').prop('disabled', true);
        $('#guess-count').text(0);

        var winningNumber = game.winningNumber;
        var winNumElement = `#guesses:contains(${winningNumber})`;
        var element = `#guesses:contains(${number})`;

        boardHighlight(element, number);
        boardHighlight(winNumElement, winningNumber, 'winner');
      }
    }

  })

  // Reset Button
  $('#menu-btns #reset').on('click', function(event){
    event.preventDefault();

    // Reset game board
    var arr = game.pastGuesses;
    arr.push(game.playersGuess, game.winningNumber);

    arr.forEach(function(value){
      var el = `.num-${value}`;
      $(el).replaceWith( value );
    })

    // New instance
    game = new Game();

    // Reset other stuff
    $('#guess-count').text(4 - game.pastGuesses.length);
    $('#message p').remove();
    $('#input-parent').find(':input(:disabled)').prop('disabled', false);
  })

  function boardHighlight(el, value, cssClass){
    var re = new RegExp( " " + value + " ", 'g' );
    var cssClass = cssClass || '';

    $(el).html(function(__, html){
      return html.replace(re, ` <span class="guessed num-${value} ${cssClass}">${value}</span> `);
    })
  }

});