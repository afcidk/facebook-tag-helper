var path = window.location.pathname;
var match_str = ["/groups/([0-9]*?)/"];
var add_str = ["members"];

match_str.forEach(function(value, index){
	mat = path.match(value);
	if(mat != null){
		console.log(path)
		if(mat[0] === path){
			window.location.replace(path+"members/");
			path = window.location.pathname;
		}
		getPage(null);
		return ;
	}
});

function getPage(page){
	var arr = document.getElementsByClassName("fsl fwb fcb");
	var names = [];
	console.log(arr.length);
	for(i=0; i<arr.length; i++){
		var name = arr[i].innerText;
		if(($.inArray(name, names))==-1){
			names.push(name);
		}
	}

	var output_string = "";
	names.forEach(function(value){
		output_string += "@"+value+" ";
	});
	cpyText(output_string);
}

function cpyText(text){
	var dum = document.createElement("input");
	document.body.appendChild(dum);
	dum.setAttribute("id", "dum");
	dum.select();
	document.execCommand("copy");
	document.getElementById("dum").value = text;
	dum.select();
	document.execCommand("copy");
	document.body.removeChild(dum);
}
