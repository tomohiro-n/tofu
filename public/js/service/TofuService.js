goog.provide('Tofu.service');

Tofu.service.TofuService = angular.module('tofuControllers', []);

Tofu.service.TofuService.controller('tofuController', function($scope) {
	$scope.words = [];
	$scope.wordReadOnlyMode = true;
	for(var key in localStorage) {
		if (key != undefined) $scope.words.push(JSON.parse(localStorage[key]));
	}

	$scope.registerNewWord = function() {
		var tags = $scope.newWordTags.split(" ");
		var word = new Tofu.model.Word($scope.newWord, $scope.newWordDescription, tags);
		localStorage[$scope.newWord] = JSON.stringify(word);
		$scope.words.push(word);

		$scope.newWord = '';
		$scope.newWordDescription = '';
		$scope.newWordTags = '';
	};

	$scope.showWordDetail = function(word) {
		$scope.registeredWordName = word.word;
		$scope.registeredWordDescription = word.description;
		$scope.registeredWordTags = word.tags;
	};

	$scope.updateWord = function() {
		var wordName = $scope.registeredWordName;
		$scope.words = $scope.words.filter(function(word) {
			return word.word != wordName;
		}, this);
		var word = new Tofu.model.Word(wordName, $scope.registeredWordDescription, $scope.registeredWordTags);
		localStorage[$scope.registeredWordName] = JSON.stringify(word);
		$scope.words.push(word);
		$scope.wordReadOnlyMode = true;
	};

	$scope.editMode = function() {
		$scope.wordReadOnlyMode = false;
	};
});
