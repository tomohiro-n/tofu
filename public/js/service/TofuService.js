goog.provide('Tofu.service');

Tofu.service.TofuService = angular.module('tofuControllers', []);

Tofu.service.TofuService.controller('tofuController', function($scope) {
	$scope.words = [];
	for(var key in localStorage) {
		if (key != undefined) $scope.words.push(JSON.parse(localStorage[key]));
	}
});

Tofu.service.TofuService.registerNewWord = function() {
	var word = $("#word").val();
	var desc = $("#description").val();
	var tags = $("#tags").val().split(" ");
	Tofu.service.TofuService.registerWord(word, desc, tags);
};

Tofu.service.TofuService.updateWord = function() {
	var word = $("#registered-word-name").text();
	var desc = $("#registered-word-description-txt").val();
	var tags = $("#registered-word-tags").text();
	Tofu.service.TofuService.registerWord(word, desc, tags);
}

Tofu.service.TofuService.registerWord = function(word, desc, tags) {
	localStorage[word] = JSON.stringify(new Tofu.model.Word(word, desc, tags));
};

Tofu.service.TofuService.showWordDetail = function(wordName) {
	wordName = wordName.data; //FIXME
	var data = JSON.parse(localStorage[wordName]);
	$("#registered-word-name").html(data.word);
	$("#registered-word-tags").html(data.tags);
	$("#registered-word-description").html(
		'<input readonly="readonly" id="registered-word-description-txt" value="' +
		data.description + '">');
	$("#registered-word-description").dblclick(function(){
		$("#registered-word-description-txt").attr('readonly', false);
	});
};