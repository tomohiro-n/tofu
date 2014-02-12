//Focus Event (No idea why this does not work right now)
$(".search_input")
	.focus(function() {
     //Empty the value if there is default value in it
    if (this.value == this.defaultValue) {
        this.value = "";
    	}
     //Set it default when it is not seleceted
	})
	.blur(function() {
    if (!this.value.length) {
        this.value = this.defaultValue;
    }
	});
