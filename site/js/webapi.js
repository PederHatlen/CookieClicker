async function sendData(e, form, CID, clicks){
	e.preventDefault();

	let formdata = new FormData(form);
	formdata.append("cid", CID);
	formdata.append("ak", clicks);

	await fetch("http://10.2.2.98:8000", {
		method: 'POST',
		mode: 'no-cors',
		headers: {'Content-Type' : 'multipart/formdata'},
		body: formdata,
	});
}