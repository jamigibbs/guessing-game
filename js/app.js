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

    function boardHighlight(el, value, cssClass){
      var re = new RegExp( " " + value + " ", 'g' );

      $(el).html(function(__, html){
        return html.replace(re, ` <span class="guessed ${cssClass}">${value}</span> `);
      })
    }

  })

});