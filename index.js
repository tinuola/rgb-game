var colors = generateRandomColors(6);
//Target the game squares
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();

//show target color to be matched
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;

//display guess confirmation (right or wrong guess)
var messageDisplay = document.querySelector("#message");

var headerBground = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

//Game reset
resetButton.addEventListener("click", function(){
	//when clicked, generate new colors
	colors = generateRandomColors(6);
	//pick new random color
	pickedColor = pickColor();
	//change color display to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
	headerBground.style.backgroundColor = "#232323";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
});

//Generate one RGB color instance
function randomColor(){
	//pick red
	var r = Math.floor(Math.random() * 256);
	//pick green
	var g = Math.floor(Math.random() * 256);
	//pick blue
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}

//Generate random colors for the game 
function generateRandomColors(num){
	//create an array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++){
		//get random color and push into array
		arr.push(randomColor());
	}
	return arr;
}

//After a match, change all squares to winning color
function changeColors(color) {
	// loop thru all squares
	for (var i = 0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

//Select random color to be matched
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//Game logic
for (var i = 0; i < squares.length; i++) {	
	//add initial colors to squares
	squares[i].style.backgroundColor = colors[i];
	
	//add listeners to squares
	squares[i].addEventListener("click", function(){
	
		//grab color of clicked square
		var clickedColor = this.style.backgroundColor;
	
		//compare to pickedColor
		if(clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			changeColors(clickedColor);
			headerBground.style.backgroundColor = clickedColor;
			resetButton.textContent = "Play Again?";
		} else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
	});
}