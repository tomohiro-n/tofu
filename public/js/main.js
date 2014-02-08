function reloadRegistered() {
	var registeredWordsDom = $('#registered-words');
	registeredWordsDom.html('');
	for(var key in localStorage) {
		registeredWordsDom.append('<p>')
		registeredWordsDom.append(key + ': ' + localStorage[key]);
		registeredWordsDom.append('</p>')
	};
};

function registerWord() {
	var word = $("#word").val();
	var desc = $("#description").val();
	localStorage[word] = desc;
	reloadRegistered();
};