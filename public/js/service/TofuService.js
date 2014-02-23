goog.provide('Tofu.service');

Tofu.service.TofuService = angular.module('tofuControllers', []);

Tofu.service.TofuService.controller('tofuController', function($scope) {

	$scope.words = [];
	$scope.wordReadOnlyMode = true;
	for(var key in localStorage) {
		if (key != undefined) $scope.words.push(JSON.parse(localStorage[key]));
	}

	$scope.registerWord = function() {
		var wordName = $scope.wordName;
		var word = new Tofu.model.Word(wordName, $scope.wordDescription, $scope.wordTags);
		$scope.words = $scope.words.filter(function(word) {
			return word.word != wordName;
		}, this);
		localStorage[$scope.wordName] = JSON.stringify(word);
		$scope.words.push(word);
		$scope.wordReadOnlyMode = true;
	};

	$scope.registerNewWord = function() {
		$scope.wordName = '';
		$scope.wordDescription = '';
		$scope.wordTags = '';
		$scope.wordReadOnlyMode = false;
	};

	$scope.showWordDetail = function(word) {
		$scope.wordName = word.word;
		$scope.wordDescription = word.description;
		$scope.wordTags = word.tags;
		$scope.wordReadOnlyMode = true;
	};
});

Tofu.service.TofuService.directive('xngFocus', function() {
	return function(scope, element, attrs) {
		scope.$watch(attrs.xngFocus,
			function (newValue) {
				newValue && element.focus();
			},true);
	};
});