var path = window.location.pathname;
var match_str = ["\/groups\/([0-9]*)?(\/members)?(\/friends)?"];

match_str.forEach(function(value, index){
	mat = path.match(value);
	if(mat != null){
        let res = mat[0];
        if (res[res.length-1] == "/") res = res.slice(0, res.length-1)
        if (!res.includes("members")) {
			window.location.replace(res+"/members/friends");
        }
        else if(!res.includes("friends")) {
			window.location.replace(res+"/friends");
        }

        scrollToBottom();
		return ;
	}
});

// Ugly QQ
function scrollToBottom() {
    var scrollInterval = null;
    var prevH = 0;
    window.scrollBy(0, 99999);
    scrollInterval = setInterval(compare, 800);

    function compare() {
        function updatePrevH() {
            if (prevH == document.body.scrollHeight) {
                clearInterval(scrollInterval); 
                getPage(null);
            }
            prevH = document.body.scrollHeight;
        }

        window.scrollBy(0, 99999);
        setTimeout(updatePrevH, 500);
    }
}

function getPage(page){
    var arr = document.querySelectorAll('div.ofv0k9yr.cwj9ozl2 > div > div a.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.oo9gr5id.gpro0wi8.lrazzd5p');
	var names = [];
	for(i=0; i<arr.length; i++){
        names.push(arr[i].innerText);
	}

	var output_string = "";
	names.forEach(function(value){
        if (value.length)
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

    alert("OK!");
}
