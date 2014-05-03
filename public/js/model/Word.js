goog.provide('Tofu.model');

Tofu.model.Word = function(word, description, tags, createdTime, updatedTime) {
	this.word = word;
	this.description = description;
	this.tags = tags;
	this.createdTime = moment(createdTime) || moment();
	this.updatedTime = moment(updatedTime) || moment();
};

Tofu.model.Word.prototype.getCreatedTime = function() {
	return this.createdTime.format("MMM Do YY");
}

Tofu.model.Word.prototype.getUpdatedTime = function() {
	return this.updatedTime.format("MMM Do YY");
}