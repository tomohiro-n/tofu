goog.provide('Tofu.model');

Tofu.model.Word = function(word, description, tags, updatedTime) {
	this.word = word;
	this.description = description;
	this.tags = tags;
	this.updatedTime = moment(updatedTime) || moment();
};

Tofu.model.Word.prototype.getUpdatedTime = function() {
	return this.updatedTime.format("MMM Do YY");
}