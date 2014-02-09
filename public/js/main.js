function reloadRegistered(searchKey) {
	var registeredWordsDom = $('#registered-words');
	registeredWordsDom.html('');
	for (var key in localStorage) {
		if (searchKey) {
			if (!key.match(new RegExp('^.*' + searchKey + '.*$'))) continue;
		}
		registeredWordsDom.append('<p>')
		registeredWordsDom.append(key + ': ' + localStorage[key]);
		registeredWordsDom.append('</p>')
	}
};

function registerWord() {
	var word = $("#word").val();
	var desc = $("#description").val();
	localStorage[word] = desc;
	reloadRegistered();
};

function searchWords() {
	var searchKey = $("#searchWord");
	reloadRegistered(searchKey);
};
