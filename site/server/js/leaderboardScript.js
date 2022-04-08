let conInfoEL = document.getElementById("connectionInfo");

let mainTableEl = document.getElementById("mainTable");
let newestTableEl = document.getElementById("newestTable");
let clientTableEl = document.getElementById("clientTable");

let soccAddr = "10.22.39.100:8000";
let showDebug = false;

let results;
let clients = {};
let clientsRaw;
let clientKeys;

// Async function for getting init data, and starting websocket.
// Async because of fetch which "needs" await
async function startup(){
	let socket = io(`ws://${soccAddr}`);
	results = await fetch(`http://${soccAddr}`).then((r)=>{return r.json()});
	clientsRaw = await fetch(`http://${soccAddr}/klienter`).then((r)=>{return r.json()});

	for (let i = 0; i < clientsRaw.length; i++) {clients["cid"+clientsRaw[i]["klient_id"]] = clientsRaw[i];}
	clientKeys = Object.keys(clients);

	// On message, add to results and rerender
	socket.on("message", data => {results.push(data); render();});

	if (showDebug){
		socket.on("connection", ()=>{
			conInfoEL.innerHTML = "Connected";
			conInfoEL.style.background = "green";
		});
		socket.on('disconnect', socketError);
		socket.on("connect_error", socketError);
	}
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
	console.log(clients);

	// Adding values to both arrays
	for (let i = 0; i < results.length; i++) results[i]["itemI"] = i;
	for (let i = 0; i < clientKeys.length; i++) {
		clients[clientKeys[i]]["runs"] = 0; console.log(i);
	}
	
	// First sort/adding possition and calculating clients
	let toppsorted = sort2d(Array.from(results), "ak");
	for (let i = 0; i < toppsorted.length; i++) {
		toppsorted[i]["pos"] = i+1;
		console.log(toppsorted[i]["cid"], clients["cid"+toppsorted[i]["cid"]]);
		clients["cid"+toppsorted[i]["cid"]]["runs"] += 1;
	}
	let timesorted = sort2dts(Array.from(toppsorted));
	// Adding the results to the table
	for (let i = 0; i < results.length; i++) {
		let topClientName = clients["cid"+toppsorted[i]["cid"]]["navn"].toLowerCase();
		mainTableEl.innerHTML+= `<tr onclick="remove('${toppsorted[i]["itemI"]}')"><th class=\"placement\">#${toppsorted[i]["pos"]}</th><td class=\"num\">${toppsorted[i]["ak"]}</td><td>${toppsorted[i]["navn"]}</td><td><img src=\"images/ClientImages/${topClientName}.png\"alt=\"${topClientName}\" title=\"${topClientName}\"></td></tr>`;
		newestTableEl.innerHTML += `<tr onclick="remove('${toppsorted[i]["itemI"]}')"><th class=\"placement\">#${timesorted[i]["pos"]}</th><td class=\"num\">${timesorted[i]["ak"]}</td><td>${timesorted[i]["navn"]}</td></tr>`
	}
	sort2d(clientKeys, "runs");
	// Client sorting/output
	for (let i = 0; i < clientKeys.length; i++) {
		console.log(clients[clientKeys[i]]["navn"]);
		let name = clients[clientKeys[i]]["navn"].toLowerCase();
		clientTableEl.innerHTML += `<tr><th>#${i+1}</th><td class=\"num\">${clients[clientKeys[i]]["runs"]}</td><td>${clients[clientKeys[i]]["navn"]}</td><td><img src=\"images/ClientImages/${name}.png\"alt=\"${name}\" title=\"${name}\"></td></tr>`;
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