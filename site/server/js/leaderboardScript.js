let conInfoEL = document.getElementById("connectionInfo");

let mainTableEl = document.getElementById("mainTable");
let newestTableEl = document.getElementById("newestTable");
let clientTableEl = document.getElementById("clientTable");

let ip = "api.cookie";
let showDebug = true;

let results;
let clients;

const socket = io(`http://${ip}`);
// const socket = new WebSocket(`ws://api.cookie/socket.io/`)

socket.on("resultat", data => {results.push(data); render();});

// Async function for getting init data, and starting websocket.
// Async because of fetch which "needs" await
async function startup(){
	results = await fetch(`http://${ip}`).then((r)=>{return r.json()});
	clients = await fetch(`http://${ip}/klienter`).then((r)=>{return r.json()});
	sort2d(clients, "cid");

	render();
}

function socketError(){
	conInfoEL.innerHTML = "Disconnected :(";
	conInfoEL.style.background = "red";
}

// Render function, takes the arrays, sorts them and outputs to table
function render(){
	mainTableEl.innerHTML = "";
	newestTableEl.innerHTML = "";
	clientTableEl.innerHTML = "";

	// Adding values to both arrays
	for (let i = 0; i < results.length; i++) results[i]["itemI"] = i;
	for (let i = 0; i < clients.length; i++) clients[i]["runs"] = 0;
	
	// First sort/adding possition and calculating clients
	let toppsorted = sort2d(Array.from(results), "ak");
	for (let i = 0; i < toppsorted.length; i++) {
		toppsorted[i]["pos"] = i+1;
		clients[toppsorted[i]["cid"]]["runs"] += 1;
	}
	let timesorted = sort2dts(Array.from(toppsorted), "ts");
	// Adding the results to the table
	for (let i = 0; i < results.length; i++) {
		let topClientName = clients[toppsorted[i]["cid"]]["navn"].toLowerCase();
		mainTableEl.innerHTML+= `<tr onclick="remove('${toppsorted[i]["itemI"]}')"><th class=\"placement\">#${toppsorted[i]["pos"]}</th><td class=\"num\">${toppsorted[i]["ak"]}</td><td>${toppsorted[i]["navn"]}</td><td><img src=\"images/ClientImages/${topClientName}.png\"alt=\"${topClientName}\" title=\"${topClientName}\"></td></tr>`;
		newestTableEl.innerHTML += `<tr onclick="remove('${timesorted[i]["itemI"]}')"><th class=\"placement\">#${timesorted[i]["pos"]}</th><td class=\"num\">${timesorted[i]["ak"]}</td><td>${timesorted[i]["navn"]}</td></tr>`
	}
	let runsSorted = sort2d(Array.from(clients), "runs");
	// Client sorting/output
	for (let i = 0; i < clients.length; i++) {
		let name = runsSorted[i]["navn"].toLowerCase();
		clientTableEl.innerHTML += `<tr><th>#${i+1}</th><td class=\"num\">${runsSorted[i]["runs"]}</td><td>${runsSorted[i]["navn"]}</td><td><img src=\"images/ClientImages/${name}.png\"alt=\"${name}\" title=\"${name}\"></td></tr>`;
	}
}

// Removing ellements from results (in case offensive ++)
function remove(i){
	results.splice(i, 1);
	render();
}

// 2d sorting functions
// Timestamp couldn't be sorted in the 2d sort so it needed custom functions
function sort2d(arr, val, asc = true){return arr.sort((a, b)=>{return asc?(b[val] - a[val]):(a[val] - b[val]);});}
function sort2dts(arr, val){return arr.sort((a, b)=>{return Date.parse(b[val]) - Date.parse(a[val]);});}

startup();