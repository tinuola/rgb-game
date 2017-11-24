
var numOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");

//display rgb code of target color to be matched
var colorDisplay = document.getElementById("colorDisplay");
//display guess confirmation (right or wrong guess)
var messageDisplay = document.querySelector("#message");
//display game header
var headerBground = document.querySelector("h1");
//game buttons
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".btnMode");

//start game
init();

function init(){
	//mode button listeners
	setupModeBtnListeners();
	//color square listeners
	setupSquareListeners();
	//pick colors
	reset();
}

function setupModeBtnListeners() {
	for (var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;
			reset();
		});
	}
}

function setupSquareListeners(){
	for (var i = 0; i < squares.length; i++) {
		//add listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedColor
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				//change all squares if guess correct
				changeColors(clickedColor);
				//change header background color
				headerBground.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}


resetButton.addEventListener("click", function(){
	reset();
});


function reset() {
	colors = generateRandomColors(numOfSquares);
	//pick new random color
	pickedColor = pickColor();
	//change color code display to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares to match colors in array
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display= "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	headerBground.style.backgroundColor = "steelblue";
	//remove "Play again"
	resetButton.textContent = "New Colors";
	//remove "Correct"
	messageDisplay.textContent = "";
}


//change all square colors when guess is right
function changeColors(color) {
	// loop thru all squares
	for (var i = 0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

//pick random color from color array
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//generate random colors for color array
function generateRandomColors(num){
	//create an array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++){
		//get random color and push into array
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

//create a random rgb color
function randomColor(){
	//pick red from 0-255
	var r = Math.floor(Math.random() * 256);
	//pick green from 0-255
	var g = Math.floor(Math.random() * 256);
	//pick blue from 0-255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
