/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {
  var
  /*********************** START LOCAL FIELD DECLARATION ************************/
  minWidth = 230,
  $sidepanel = jQuery("#sidepanel"),
  $toggleBtnPanel = jQuery("#sidepanel #toggle-btn-panel"),
  $navigation = jQuery("#sidepanel #navigation"),
  $navigationTree = jQuery("#sidepanel #navigationtree"),
  $comments = jQuery("#sidepanel #comments"),
  $commentGrid = jQuery("#sidepanel #comment-grid"),
  $screenTitle = jQuery("#sidepanel .screentitle"),
  $commentsAll = jQuery("#sidepanel #comments .comment-all"),
  $screensToggle = jQuery("#sidepanel .screens .toggle"),
  $commentsToggle = jQuery("#sidepanel #comments .toggle"),
  $simulation = jQuery("#simulation");
  /************************ END LOCAL FIELD DECLARATION *************************/
  
  /*********************** START LOCAL METHOD DEFINITION ************************/
  function hasComments() {
    return jQuery("#sidepanel #comments").length !== 0;
  }
  
  function setSidePanelLayout(state) {
    if(state) {
      if(!state["sidepanel-open"]) {
        $sidepanel.trigger("closePane");
      }
      $sidepanel.width(state["sidepanel-width"]);
    }
    if(hasComments()) {
      $navigationTree.height($sidepanel.height() * 0.15);
      $commentGrid.height($sidepanel.height() - $commentGrid.position().top);
      $navigation.resizable({
        "handles": "s",
        "zIndex": 0,
        "maxHeight": $sidepanel.height() - $comments.offset().top - 10,
        "resize": function(event, ui) {
          var delta;
          if(hasComments()) {
            delta = ui.size.height - $grid.data("resizeHeight");
            $grid.height($grid.height() - delta);
            if($grid.height() > 0) {
              $grid.data("resizeHeight", ui.size.height);
            }
          }
        },
        "stop": function(event, ui) {
          $navigation.width("").children("#navigationtree").height("100%");
        }
      });
    } else {
      $navigationTree.height($sidepanel.height() - $navigationTree.offset().top - 10);
      $navigation.resizable("destroy");
      $screensToggle.css("display", "none");
    }
  }
  
  function debug() {
    alert("\t\t\t\theight\twidth\n"+
        "simulationOffset:\t" + $simulation[0].offsetHeight + "\t\t" + $simulation[0].offsetWidth + "\n" +
        "simulationClient:\t" + $simulation[0].clientHeight + "\t\t" + $simulation[0].clientWidth + "\n" +
        "simulationScroll:\t" + $simulation[0].scrollHeight + "\t\t" + $simulation[0].scrollWidth + "\n" +
        "minimum:\t\t\t" + parseInt($simulation.css("min-height"),10) + "\t\t" + parseInt($simulation.css("min-width"),10) + "\n" +
        "screen:\t\t\t" + $simulation.height() + "\t\t" + $simulation.width() + "\n" +
        "htmlOffset:\t\t" + document.body.offsetHeight + "\t\t" + document.body.offsetWidth + "\n" +
        "htmlClient:\t\t" + document.body.clientHeight + "\t\t" + document.body.clientWidth + "\n" +
        "htmlScroll:\t\t" + document.body.scrollHeight + "\t\t" + document.body.scrollWidth + "\n");
  }
  /************************ END LOCAL METHOD DEFINITION *************************/
  
  window.jimLayout = {
    "initialized": false,
    "load": function() {
      var $firer, delta;
      if(jimLayout.initialized === false) {
        setSidePanelLayout(jimData.layout);
        
        $sidepanel
          .bind("openPane", function(event) {
            $sidepanel.resizable("enable").removeClass("close").addClass("open");
          })
          .bind("closePane", function(event) {
            $sidepanel.removeClass("open").addClass("close").resizable("disable");
          })
          .resizable({
            "minWidth": minWidth,
            "handles": "e",
            "zIndex": 0,
            "stop": function(event,ui) {
              jQuery(this).height("");
            }
          })
          .children("#toggle-panel-btn").bind("click", function(event) {
            event.stopPropagation();
            $sidepanel.trigger(($sidepanel.hasClass("open")) ? "closePane" : "openPane");
            return false;
          });
        
        if(hasComments()) {
          $screensToggle
            .bind("openScreens", function(event) {
              $screensToggle.removeClass("close").addClass("open");
              $screenTitle.removeClass("close").addClass("open");
              $navigation.show();
            })
            .bind("closeScreens", function(event) {
              $screensToggle.removeClass("open").addClass("close");
              $screenTitle.removeClass("open").addClass("close");
              $navigation.hide();
            })
            .bind("click", function(event) {
              event.stopPropagation();
              $screensToggle.trigger(($screensToggle.hasClass("open")) ? "closeScreens" : "openScreens");
              $commentGrid.height($sidepanel.height() - $commentGrid.position().top);
              return false;
            });
          $commentsToggle
            .bind("openComments", function(event) {
              $commentsToggle.removeClass("close").addClass("open");
              $commentsAll.show();
            })
            .bind("closeComments", function(event) {
              $commentsToggle.removeClass("open").addClass("close");
              $commentsAll.hide();
            })
            .bind("click", function(event) {
              event.stopPropagation();
              $commentsToggle.trigger(($commentsToggle.hasClass("open")) ? "closeComments" : "openComments");
              $commentGrid.height($sidepanel.height() - $commentGrid.position().top);
              return false;
            });
        }
        else {
          $screensToggle.css("display", "none");
        }
        
        jQuery(window).resize(function(event) {
          setSidePanelLayout();
        });
        
        jimLayout.initialized = true;
      }
      
      if(jimMain.isPopup(window)) {
        $sidepanel.trigger("closePane");
      }
    },
    "setSidePanelLayout": setSidePanelLayout,
    "state": function() {
      var state = {
        "sidepanel-open": $sidepanel.hasClass("open"),
        "sidepanel-width": Math.max($sidepanel.width(), minWidth)
      };
      return state;
    }
  };
})(window);