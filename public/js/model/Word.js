goog.provide('Tofu.model');

Tofu.model.Word = function(word, description, tags, createdTime, updatedTime) {
	this.word = word;
	this.description = description;
	this.tags = tags;
	this.createdTime = createdTime ? moment(createdTime) : moment();
	this.updatedTime = updatedTime ? moment(updatedTime) : moment();
};

Tofu.model.Word.prototype.getDescriptionFitsInList = function() {
	var maxLenToDisplay = Tofu.model.Word.getDescriptionLengthToDisplay(); // TODO do this on screen size update, not every single call of this method
	if (this.description.length <= maxLenToDisplay) return this.description;
	else return this.description.substring(0, maxLenToDisplay - 3) + "...";
};

Tofu.model.Word.prototype.getCreatedTime = function() {
	return this.createdTime.format("MMM Do YY");
};

Tofu.model.Word.prototype.getUpdatedTime = function() {
	return this.updatedTime.format("MMM Do YY");
};

Tofu.model.Word.getDescriptionLengthToDisplay = function() {
	return 240; // TODO much better to get window size and adjust accordingly
};