function reloadRegistered() {
	var tmp = "";
	for(var key in localStorage) {
		tmp += (key + " " + localStorage[key] + "\n");
	};
	alert(tmp);
};

function registerWord() {
	var word = $("#word").val();
	var desc = $("#description").val();
	localStorage[word] = desc;
	reloadRegistered();
};