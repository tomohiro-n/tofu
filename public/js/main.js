function reloadRegistered(searchKey, searchTag) {
	var registeredWordsDom = $('#registered-words');
	registeredWordsDom.html('');
	for (var key in localStorage) {
		if (searchKey &&
			!key.match(new RegExp('^.*' + searchKey + '.*$'))) continue;
		var data = JSON.parse(localStorage[key]);
		if (searchTag && !_.contains(data.tags, searchTag)) continue;
		registeredWordsDom.append('<p>')
		registeredWordsDom.append(key + ': ' + data.description);
		registeredWordsDom.append(" (tags: " + data.tags + ")");
		registeredWordsDom.append('</p>')
	}
};

function registerWord() {
	var word = $("#word").val();
	var desc = $("#description").val();
	var tags = $("#tags").val().split(" ");
	localStorage[word] = JSON.stringify(new Tofu.model.Word(word, desc, tags));
	reloadRegistered();
};

function searchWords() {
	var searchKey = $("#search-word").val();
	var searchTag = $("#search-tag").val();
	reloadRegistered(searchKey, searchTag);
};
