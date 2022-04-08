let cookiEl = document.getElementById("cookie");
let clicksEl = document.getElementById("clicks");
let formEl = document.getElementById("form");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

let cookieImage = new Image()
cookieImage.src = "images/Cookie.png";
let cookieArr = [];

let timerEl = document.getElementById("timer");
let timeupEl = document.getElementById("timeup");
let clickResEl = document.getElementById("clickRes");
let statusEl = document.getElementById("status")

let inputAkEl = document.getElementById("ak");

let timerLen = 30000; // Timer length in milliseconds
let CID = 12;

let clicks = 0;
let endtime;
let stoptimer = false;

// Event handelers for both click and enter key.
cookiEl.addEventListener("click", cookieClick);

// registering clicks and starting timer
function cookieClick(){
	if(!stoptimer){
		if (clicks == 0) {
			endtime = Date.now() + timerLen;
			requestAnimationFrame(timer);
		}
		clicks++;
		clicksEl.innerHTML = clicks+" klikk ";
		newCookie();
	}
}

// When the time runs out, reset text boxes, and show timeupbox.
function timeup(){
	clickResEl.innerHTML = clicks+" kjeks på "+(timerLen/1000); // timerLen is milliseconds /1000 to get seconds
	timerEl.innerHTML = "Start ved å klikke på Kjeksen";
	clicksEl.innerHTML = "";

	timeupEl.style.display = "flex";
}

function tryAgain(){
	clicks = 0;
	stoptimer = false;
	timeupEl.style.display = "none";

	cookieArr = [];
	resize();
}

// Timer function
function timer(){
	let time = Date.now();
    if(time >= endtime) stoptimer = true;
	timerEl.innerHTML = endtime-time;
    if(stoptimer) timeup();
	else requestAnimationFrame(timer);
}

formEl.addEventListener("submit", function(e){
	e.preventDefault();
	sendData(formEl, CID, clicks);
	tryAgain();
});

function resize(){
	width = window.innerWidth;
	height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	for (let i = 0; i < cookieArr.length; i++) {
		let tempS = Math.floor(cookieArr[i][0] * 100);
		let tempX = Math.floor(cookieArr[i][1] * (width-tempS));
		let tempY = Math.floor(cookieArr[i][2] * (height-tempS));

		ctx.drawImage(cookieImage, tempX, tempY, tempS, tempS);
	}
}

window.addEventListener("resize", resize);

function newCookie(){
	let tempS = Math.random();
	let tempX = Math.random();
	let tempY = Math.random();

	cookieArr.push([tempS, tempX, tempY]);

	tempS = Math.floor(tempS * 100);
	tempX = Math.floor(tempX * (width-tempS));
	tempY = Math.floor(tempY * (height-tempS));

	ctx.drawImage(cookieImage, tempX, tempY, tempS, tempS);
}

resize()