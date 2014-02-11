goog.provide('Tofu.service');

Tofu.service.TofuService = function() {

};

Tofu.service.TofuService.reloadRegistered = function(searchKey, searchTag) {
	var registeredWordsDom = $('#registered-words-list');
	registeredWordsDom.html('');
	var i = 1;
	for (var key in localStorage) {
		if (searchKey &&
			!key.match(new RegExp('^.*' + searchKey + '.*$'))) continue;
		var data = JSON.parse(localStorage[key]);
		if (searchTag && !_.contains(data.tags, searchTag)) continue;
		var divTag = "word-" + i;
		var appendHtml = '<p><span id="' + divTag + '">' +
			key + ': ' + data.description +
			' (tags: ' + data.tags + ')' +
			'</span></p>';
		registeredWordsDom.append(appendHtml);
		$('#' + divTag).click(key, function(key) {Tofu.service.TofuService.showWordDetail(key);});
		i++;
	}
};

Tofu.service.TofuService.registerWord = function() {
	var word = $("#word").val();
	var desc = $("#description").val();
	var tags = $("#tags").val().split(" ");
	localStorage[word] = JSON.stringify(new Tofu.model.Word(word, desc, tags));
	reloadRegistered();
};

Tofu.service.TofuService.searchWords = function() {
	var searchKey = $("#search-word").val();
	var searchTag = $("#search-tag").val();
	reloadRegistered(searchKey, searchTag);
};

Tofu.service.TofuService.showWordDetail = function(wordName) {
	wordName = wordName.data; //FIXME
	var data = JSON.parse(localStorage[wordName]);
	$("#registered-word-name").text(wordName);
	$("#registered-word-tags").text(data.tags);
	$("#registered-word-description").text(data.description);
};