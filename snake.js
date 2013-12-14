(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Coord = SnakeGame.Coord = function(x, y) {
    this.x = x;
    this.y = y;
  }
	
	Coord.onBoard = function(x, y) {
		return ((x >= 0 && x <= 19) && (y >= 0 && y <= 19))
	}
	
	Coord.offSnake = function(snake, coord) {
		var segments = snake.segments;
		for (var i = 0; i < segments.length; i++) {
			if (segments[i].x == coord.x && segments[i].y == coord.y) {
				return false;
			}
		}
		return true;
	}

  Coord.plus = function(coord1, coord2) {
    return new Coord((coord1.x + coord2.x), (coord1.y + coord2.y));
  }

  var Snake = SnakeGame.Snake = function(board) {
		this.board = board;
		
    var N = new Coord(0, -1);
    var S = new Coord(0, 1);
    var W = new Coord(-1, 0);
    var E = new Coord(1, 0);

    this.DIRECTIONS = {
      "N" : N,
      "S" : S,
      "E" : E,
      "W" : W
    };

    this.direction = "N";
    // Array of coordinate objects
    this.segments = this.snakerator([[10, 10], [10, 9], [10, 8], [10, 7], [10, 6]]);
  }
	
	var Apple = SnakeGame.Apple = function() {
	}
	
	Apple.prototype.generate = function() {
		var x = Math.floor(Math.random() * 20);
		var y = Math.floor(Math.random() * 20);
		
		this.coord = new Coord(x, y);
	}

  Snake.prototype.snakerator = function(segArray) {
    array = [];
    segArray.forEach(function(seg){
      array.push(new Coord(seg[0], seg[1]));
    })
    return array;
  }

  Snake.prototype.move = function(){
    var head = _.last(this.segments);
    var newHead = Coord.plus(head, this.DIRECTIONS[this.direction]);
		
		var appX = this.board.apple.coord.x;
		var appY = this.board.apple.coord.y;
		
		if(newHead.x == appX && newHead.y == appY) {
			this.board.apple.generate();
		} else {
			this.segments.shift();
		}

		console.log(newHead.x);
		console.log(newHead);


		if(Coord.onBoard(newHead.x, newHead.y) && Coord.offSnake(this, newHead)){
    	this.segments.push(newHead);
		} else {
			return false;
		}
  }

  Snake.prototype.turn = function(direction){
    this.direction = direction;
  }

  var Board = SnakeGame.Board = function() {
    this.snake = new Snake(this);
		this.apple = new Apple();
		this.apple.generate();
  }

  Board.prototype.render = function(width, height) {
    var board = [];
    for(var i=0; i < height; i++) {
      var row = [];
      for(var j=0; j < width; j++) {
        row.push("<div class=\"square space\"></div>");
      }
      board.push(row);
    }

		var appX = this.apple.coord.x;
		var appY = this.apple.coord.y;
		
		// console.log(this.snake);
	// 	console.log(this.apple.coord);
		
		board[appY][appX] = "<div class=\"square apple\"></div>";

    this.snake.segments.forEach(function(segment) {
      board[segment.y][segment.x] = "<div class=\"square segment\"></div>";
    }
	
	
		// board[board.apple.y][board.apple.x] = "<div class=\"square apple\"></div>";
	);

    return board;
  };

  Board.prototype.stringify = function(array) {
    var board = []
    for(i = 0; i < array.length; i++) {
      var row = array[i].join(" ") + "<br>";
      board.push(row);
    }
    return board.join("\n");
  };

})(this);


