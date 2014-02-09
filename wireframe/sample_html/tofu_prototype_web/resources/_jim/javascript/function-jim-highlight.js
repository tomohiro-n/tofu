/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {

    var
    /*********************** START LOCAL FIELD DECLARATION ************************/
    $button = jQuery("#highlight-button");
    /*********************** END LOCAL FIELD DECLARATION ************************/


    /*********************** START LOCAL METHOD DEFINITION ************************/
    function addHighlightListenerLocal() {
      $button.click(function(event) {
        var $option, $imagesmap;
        $option = jQuery("#highlight-select :selected");
        if ($option === undefined)
          return false;
                    
        $imagesmap = jQuery("#simulation .imagemap" + $option.val().replace(/ ./g,'.imagemap.'));
        $imagesmap.css("background-color", "#ffff99"); 
            
        jimUtil.show(jQuery("#simulation " + $option.val()).not(':hidden'), { "effect": { "type": "pulsate", "duration": 1000, "times":2 } }).done(function() { 
            $imagesmap.css("background-color", "");
        });
      });
    }

    /* START MAIN */
    addHighlightListenerLocal();
    /* END MAIN */

})(window);