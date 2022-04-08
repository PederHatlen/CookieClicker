async function sendData(form, CID, clicks){
	let formdata = new FormData(form);
	formdata.append("cid", CID);
	formdata.append("ak", clicks);

	await fetch("http://api.cookie", {
		method: 'POST',
		mode: 'no-cors',
		headers: {'Content-Type' : 'multipart/formdata'},
		body: formdata,
	});
}