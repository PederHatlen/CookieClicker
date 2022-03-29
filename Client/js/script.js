let cookiEl = document.getElementById("cookie");
let clicksEl = document.getElementById("clicks");

let timerEl = document.getElementById("timer");
let timeupEl = document.getElementById("timeup");
let clickResEl = document.getElementById("clickRes");

let clicks = 0;
let timerLen = 3000; // Timer length in milliseconds
let endtime;
let stop = false;

// Event handelers for both click and enter key.
cookiEl.addEventListener("click", cookieClick);

// Starting timer and 
function cookieClick(){
	if (clicks === 0) {
		endtime = Date.now() + timerLen;
		stop = false;
		requestAnimationFrame(timer);
	}
	clicks++;
	clicksEl.innerHTML = clicks;
}

function timeup(){
	clickResEl.innerHTML = clicks+" kjeks på "+(timerLen/1000);

	clicks = 0;
	clicksEl.innerHTML = clicks;
	timerEl.innerHTML = "Start ved å klikke på Kjeksen";

	timeupEl.style.display = "flex";
}

// Timer function
function timer(){
	let time = Date.now();
    if(time >= endtime) stop = true;
	timerEl.innerHTML = endtime-time;
    if(stop) timeup();
	else requestAnimationFrame(timer);
}