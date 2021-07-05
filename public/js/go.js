let base64String = "";
var another;
function imageUploaded() {
	var file = document.querySelector(
		'input[type=file]')['files'][0];
    var image = document.createElement("img");
    image.src = "set1.jpg";
	var reader = new FileReader();
	console.log("next");
	
	reader.onload = function () {
		base64String = reader.result.replace("data:", "")
			.replace(/^.+,/, "");

		imageBase64Stringsep = base64String;
		var newz = {'b64':imageBase64Stringsep};
        var bad = eval({b64:imageBase64Stringsep});
		const newDiv = document.createElement("input");
		newDiv.name = imageBase64Stringsep
		// alert(imageBase64Stringsep);
		// http://20.102.61.113:5000/classifier/predict/
		// https://jsonplaceholder.typicode.com/posts
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method:"POST",
            body: JSON.stringify(bad),
            headers:{"Content-type":"application/json;charset=UTF-8"}
        })
        .then(response => response.json())
        .then(json => {
			another = json
			console.log(json)
		});
		
		
		// var data = JSON.parse(response);
		console.log(base64String);
	}
	reader.readAsDataURL(file);
}

function displayString() {
	console.log("Base64String about to be printed");
	alert(JSON.stringify(another));
}
