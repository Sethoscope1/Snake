(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var View = SnakeGame.View = function(elem) {
    this.$el = $(elem);
  };
  //
  // $(document).ready(function(){
  //   var board = new SnakeGame.Board();
  //   console.log(board.render(30, 30));
  //   // console.log(board.stringify(board.render(30, 30)));
  //
  //   var cookie = new SnakeGame.View("food");
  //   cookie.start();
  // });
  //


  View.prototype.start = function() {
    var board = new SnakeGame.Board();
    var that = this;
    $(document).on('keydown', function(event){
      if(event.keyCode === 13){
        that.interval = window.setInterval(function(){
          that.step(board)
        }, 100 );
      } else {
        that.keyHandler(event.keyCode, board);
      }
      console.log(event.keyCode);
    });
  };
	
	View.prototype.stop = function() {
		window.clearInterval();
	}

  View.prototype.step = function(board) {
		var that = this;
    var turn = board.snake.move();
		if(turn==false){
			clearInterval(that.interval);
		} else {
    	$('#board').html(board.stringify(board.render(20, 20)));
		}

  }

  View.prototype.keyHandler = function(code, board){
    if(code === 38){
      board.snake.direction = 'N';
    } else if(code === 39){
      board.snake.direction = 'E';
    } else if(code === 40){
      board.snake.direction = 'S';
    } else if(code === 37){
      board.snake.direction = 'W';
    }
  }

  // Game.prototype.start = function () {
  //    this.timerId = setInterval(
  //      this.step.bind(this),
  //      1000 / Game.FPS
  //    );
  //
  //    this.bindKeyHandlers();
  //  };

})(this);
