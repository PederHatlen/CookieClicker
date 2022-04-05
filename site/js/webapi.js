async function sendData(e, form, CID, clicks){
	let formdata = new FormData(form);
	formdata.append("cid", CID);
	formdata.append("ak", clicks);

	console.log("sending");
	await fetch("http://10.22.39.100:8000", {
		method: 'POST',
		mode: 'no-cors',
		headers: {'Content-Type' : 'multipart/formdata'},
		body: formdata,
	}).then(e, function(e){
		console.log(e.status);
	})
}