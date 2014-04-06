goog.provide('Tofu.service');

Tofu.service.TofuService = angular.module('tofuControllers', []);

Tofu.service.TofuService.controller('tofuController', function($scope) {
	$scope.words = [];
	$scope.wordReadOnlyMode = true;
	for(var key in localStorage) {
		if (key != undefined) {
			var tmp = JSON.parse(localStorage[key]);
			$scope.words.push(new Tofu.model.Word(tmp.word, tmp.description, tmp.tags, tmp.updatedTime));
		}
	}

	$scope.registerWord = function() {
		var wordName = $scope.wordName;
		$scope.wordTags = $scope.wordTags.concat($scope.wordNewTags.split(' ')).filter(function(tag) {
			return tag != '';
		}, this);
		$scope.wordNewTags = null;
		var tags = $scope.wordTags;
		var word = new Tofu.model.Word(wordName, $scope.wordDescription, tags);
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
		$scope.wordTags = [];
		$scope.wordNewTags = "";
		$scope.wordReadOnlyMode = false;
	};

	$scope.showWordDetail = function(word) {
		$scope.wordName = word.word;
		$scope.wordDescription = word.description;
		$scope.wordTags = word.tags;
		$scope.wordUpdatedTime = word.getUpdatedTime();
		$scope.wordReadOnlyMode = true;
	};

	$scope.orderProp = 'updatedTime';

});

Tofu.service.TofuService.directive('xngFocus', function() {
	return function(scope, element, attrs) {
		scope.$watch(attrs.xngFocus,
			function (newValue) {
				newValue && element.focus();
			},true);
	};
});

