goog.provide('Tofu.service');

Tofu.service.TofuService = angular.module('tofuControllers', []);

Tofu.service.TofuService.controller('tofuController', function($scope) {
	$scope.words = [];
	$scope.wordReadOnlyMode = true;
	var allData = Tofu.service.TofuService.getData();
	for(var key in allData) {
		if (key != undefined) {
			var tmp = JSON.parse(allData[key]);
			$scope.words.push(new Tofu.model.Word(tmp.word, tmp.description, tmp.tags, tmp.createdTime, tmp.updatedTime));
		}
	}

	$scope.registerWord = function() {
		var isForNewWord = $scope.isForNewWord();
		var wordName = $scope.wordName;
		var newTags = $scope.wordNewTags ? $scope.wordNewTags.split(' ') : [];
		$scope.wordTags = $scope.wordTags.concat(newTags).filter(function(tag) {
			return tag != '';
		}, this);
		$scope.wordNewTags = null;
		var tags = $scope.wordTags;
		var createdTime = (isForNewWord && !$scope.wordInFocus) ? undefined : $scope.wordInFocus.createdTime;
		var word = new Tofu.model.Word(wordName, $scope.wordDescription, tags, createdTime);
		$scope.words = $scope.words.filter(function(word) {
			return word.word != wordName && word.word != $scope.editingWordName;
		}, this);
		allData[$scope.wordName] = JSON.stringify(word);
		$scope.words.push(word);
		$scope.wordReadOnlyMode = true;
	};

	$scope.registerNewWord = function() {
		$scope.wordInFocus = null;
		$scope.wordName = '';
		$scope.wordDescription = '';
		$scope.wordTags = [];
		$scope.wordNewTags = "";
		$scope.wordReadOnlyMode = false;
	};

	$scope.showWordDetail = function(word) {
		$scope.wordInFocus = word;
		$scope.wordName = word.word;
		$scope.editingWordName = word.word;
		$scope.wordDescription = word.description;
		$scope.wordTags = word.tags;
		$scope.wordCreatedTime = word.getCreatedTime();
		$scope.wordUpdatedTime = word.getUpdatedTime();
		$scope.wordReadOnlyMode = false;
	};

	$scope.isForNewWord = function() {
		return ($scope.wordInFocus == null);
	}

	$scope.orderProp = 'updatedTime';

});

Tofu.service.TofuService.getData = function() {
	return localStorage;
}

Tofu.service.TofuService.directive('xngFocus', function() {
	return function(scope, element, attrs) {
		scope.$watch(attrs.xngFocus,
			function (newValue) {
				newValue && element.focus();
			},true);
	};
});

