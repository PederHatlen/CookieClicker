let conInfoEL = document.getElementById("connectionInfo");

let mainTableEl = document.getElementById("mainTable");
let newestTableEl = document.getElementById("newestTable");
let clientTableEl = document.getElementById("clientTable");

let ip = "api.cookie";
let showDebug = true;

let results;
let clients;

// Websocket, using socket.io
const socket = io(`http://${ip}`);
socket.on("resultat", data => {results.push(data); render();});

// Async function for getting init data, async because fetch "needs" await
async function startup(){
	// Test data
	// results = await fetch(`./json/results.json`).then((r)=>{return r.json()});
	// clients = await fetch(`./json/clients.json`).then((r)=>{return r.json()});

	results = await fetch(`http://${ip}`).then((r)=>{return r.json()});
	clients = await fetch(`http://${ip}/klienter`).then((r)=>{return r.json()});
	sort2d(clients, "cid", null, false);

	render();
}

// Render function, takes the arrays, sorts them and outputs to table
function render(){
	mainTableEl.innerHTML = "";
	newestTableEl.innerHTML = "";
	clientTableEl.innerHTML = "";

	// Adding values to both arrays
	for (let i = 0; i < results.length; i++) results[i]["itemI"] = i;
	for (let i = 0; i < clients.length; i++) clients[i]["runs"] = 0;
	
	// Sorting results (timesort is done after, becouse leaderboard possition is also needed).
	let toppsort = sort2d(Array.from(results), "ak");
	for (let i = 0; i < toppsort.length; i++) {
		toppsort[i]["pos"] = i+1;
		clients[toppsort[i]["cid"]-1]["runs"] += 1;
	}
	let timesort = sort2d(Array.from(toppsort), "ts", (e)=>Date.parse(e));

	// Adding the results to the table
	for (let i = 0; i < results.length; i++) {
		let topCliName = clients[toppsort[i]["cid"]-1]["navn"].toLowerCase();
		mainTableEl.innerHTML+= 
		`<tr onclick="remove(${toppsort[i]["itemI"]})">
			<th class=\"placement\">#${toppsort[i]["pos"]}</th>
			<td class=\"num\">${toppsort[i]["ak"]}</td>
			<td class="spacer">${toppsort[i]["navn"]}</td>
			<td><img src=\"images/ClientImages/${topCliName}.png\"alt=\"${topCliName}\"title=\"${topCliName}\"></td>
		</tr>`;
		let newCliName = clients[timesort[i]["cid"]-1]["navn"].toLowerCase();
		newestTableEl.innerHTML += 
		`<tr onclick="remove(${timesort[i]["itemI"]})">
			<th class=\"placement\">#${timesort[i]["pos"]}</th>
			<td class=\"num\">${timesort[i]["ak"]}</td>
			<td class="spacer">${timesort[i]["navn"]}</td>
			<td><img src=\"images/ClientImages/${newCliName}.png\"alt=\"${newCliName}\"title=\"${newCliName}\"></td>
		</tr>`;
	}

	// Client sorting/output
	let runsSorted = sort2d(Array.from(clients), "runs");
	for (let i = 0; i < clients.length; i++) {
		let name = runsSorted[i]["navn"].toLowerCase();
		clientTableEl.innerHTML += 
		`<tr>
			<th>#${i+1}</th>
			<td class=\"num\">${runsSorted[i]["runs"]}</td>
			<td class="spacer">${runsSorted[i]["navn"]}</td>
			<td><img src=\"images/ClientImages/${name}.png\"alt=\"${name}\" title=\"${name}\"></td>
		</tr>`;
	}
}

// Removing ellements from results (in case offensive/other)
function remove(i){
	results.splice(i, 1);
	render();
}

// 2d sorting function, takes 
function sort2d(arr, val, func=null, asc = true){
	if (func == null) func = (e)=>e;
	return arr.sort((a, b)=>{
		return asc?(func(b[val]) - func(a[val])):(func(a[val]) - func(b[val]));
	});
}

startup();