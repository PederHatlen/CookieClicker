let cookiEl = document.getElementById("cookie");
let clicksEl = document.getElementById("clicks");
let formEl = document.getElementById("form");

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
		if (clicks === 0) {
			endtime = Date.now() + timerLen;
			requestAnimationFrame(timer);
		}
		clicks++;
		clicksEl.innerHTML = clicks+" klikk ";
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