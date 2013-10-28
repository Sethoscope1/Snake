(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Coord = SnakeGame.Coord = function(x, y) {
    this.x = x;
    this.y = y;
  }

  Coord.plus = function(coord1, coord2) {
    return new Coord((coord1.x + coord2.x), (coord1.y + coord2.y));
  }

  var Snake = SnakeGame.Snake = function() {
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
    this.segments = this.snakerator([[15, 15], [15, 14], [15, 13], [15, 12], [15, 11]]);
  }



  Snake.prototype.snakerator = function(segArray) {
    array = [];
    segArray.forEach(function(seg){
      array.push(new Coord(seg[0], seg[1]));
    })
    return array;
  }

  Snake.prototype.move = function(){
    this.segments.shift();
    var head = _.last(this.segments);
    var newHead = Coord.plus(head, this.DIRECTIONS[this.direction]);
    this.segments.push(newHead);
  }

  Snake.prototype.turn = function(direction){
    this.direction = direction;
  }

  var Board = SnakeGame.Board = function() {
    this.snake = new Snake();
    this.apples = [];
  }

  Board.prototype.render = function(width, height) {
    var board = [];
    for(var i=0; i < height; i++) {
      var row = [];
      for(var j=0; j < width; j++) {
        row.push(" __ ");
      }
      board.push(row);
    }

    this.snake.segments.forEach(function(segment) {
      board[segment.y][segment.x] = ".^.";
    });

    return board;
  };

  Board.prototype.stringify = function(array) {
    var board = []
    for(i = 0; i < array.length; i++) {
      var row = "<p>" + array[i].join(" ") + "</p>";
      board.push(row);
    }
    return board.join("\n");
  };

})(this);


