var numOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector('#message');
var headerBground = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.btnMode');

//start game
init();

function init() {
  setupModeBtnListeners();
  setupSquareListeners();
  reset();
}

function setupModeBtnListeners() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function() {
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      this.classList.add('selected');
      this.textContent === 'Easy' ? (numOfSquares = 3) : (numOfSquares = 6);
      reset();
    });
  }
}

function setupSquareListeners() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function() {
      var clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'Correct!';
        changeColors(clickedColor);
        headerBground.style.backgroundColor = clickedColor;
        resetButton.textContent = 'Play Again?';
      } else {
        this.style.backgroundColor = '#232323';
        messageDisplay.textContent = 'Try Again';
      }
    });
  }
}

resetButton.addEventListener('click', function() {
  reset();
});

function reset() {
  colors = generateRandomColors(numOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;

  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
  headerBground.style.backgroundColor = 'steelblue';
  resetButton.textContent = 'New Colors';
  messageDisplay.textContent = '';
}

//change all square colors when guess is right
function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

//pick random color from color array
function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

//generate random colors for color array
function generateRandomColors(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

//create a random rgb color
function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
