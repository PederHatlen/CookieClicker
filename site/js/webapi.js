async function sendData(form, CID, clicks){
	let formdata = new FormData(form);
	formdata.append("cid", CID);
	formdata.append("ak", clicks);

	await fetch("http://10.22.39.100:8000", {
		method: 'POST',
		mode: 'no-cors',
		headers: {'Content-Type' : 'multipart/formdata'},
		body: formdata,
	});
}