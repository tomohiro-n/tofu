/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {
  var $simulation = jQuery("#simulation"), dragZIndex = 3;
  
  jQuery.extend(jimEvent.fn, {
    "jimNavigation": function(args) {
      var historyEntry;
      if(args.isbackward) {
        historyEntry = urlHistory.getPrev() || jimMain.getMainWindow().urlHistory.getActive();
        args.target = historyEntry.url;
        jimMain.navigate(args);
      } else if(args.forward) {
        historyEntry = urlHistory.getNext() || jimMain.getMainWindow().urlHistory.getActive();
        args.target = historyEntry.url;
        jimMain.navigate(args);
      } else if(args.target) {
        jimMain.navigate(args);
      }
    },
    "jimCreateDrag": function(drag, args) {
      var self = this, $drag, paneWidth = jimUtil.getSidePanelWidth(), $target, $master, position, dragData, dragTargets;
      $target = self.getEventTarget(args.target);

      if($target.jimGetType() === itemType.panel) {
        $target = $target.parent();
      }
      if($target.jimGetType() === itemType.ellipse || 
    		  $target.jimGetType() === itemType.triangle ||
    		  $target.jimGetType() === itemType.callout) {
          $target = $target.closest("svg");
        }
      
      var posType = $target.css("position");
      var posTop = $target.css("top");
      var posLeft = $target.css("left");
      var isContainedInCC = false;
       
      $master = $target.parents(".master");
      if($master.length !== 0) {
        $target.wrap("<div id='" + $master.attr("id") + "' class='" + $master.attr("class").split(" ")[0] + "' />");
        $target = $target.parent();
        isContainedInCC=true;
      }
      
      var parent = $target.parent();
            
      position = $target.jimPosition();
      dragData = {
        "parent": parent,
        "isContained": args.containment,
        "top": position.top,
        "left": position.left,
        "containedInCC" : isContainedInCC,
        "startposition": {
          "type": posType,
          "top": posTop,
          "left": posLeft,
          "index": $target.index()
        }
      };

      $target.appendTo($target.parents(".template, .screen"))
             .css({"position": "absolute", "top": dragData.top, "left": dragData.left, "z-index": dragZIndex++})
             .data("jimDrag", dragData);

      $drag = jQuery(drag); /* $drag and $target might not be the same (multidrag) */
      dragTargets = jimUtil.exists($drag.data("jimDragTargets")) ? $drag.data("jimDragTargets") : [];
      dragTargets.push($target);
      $drag.data("jimDragTargets", dragTargets);

      return dragData;
    },
    "jimRestoreDrag": function($drag) {
      var dragTargets, $target, dragData, i, iLen;
      dragTargets = $drag.data("jimDragTargets");
      if(dragTargets) {
	    for(i=0, iLen=dragTargets.length; i<iLen; i+=1) {
	      $target = jQuery(dragTargets[i]);
	      dragData = $target.data("jimDrag");
	      if(dragData.isContained) {
	        jimUtil.insertInto({"target": $target, "parent": dragData.parent});
	      }
	    }
      }
    },
    "jimDestroyDrag": function($drag) {
      var dragTargets, i, iLen;
      dragTargets = $drag.data("jimDragTargets");
      if(dragTargets) {
        for(i=0, iLen=dragTargets.length; i<iLen; i+=1) {
          jQuery(dragTargets[i]).removeData("jimDrag");
        }
        $drag.removeData("jimDragTargets");
      }
    },
    "jimMove": function(args,callback) {
      if(jimUtil.exists(args)) {
        var self = this, $target, eventData, dragData, position, newPosition = {}, $parent, containment,$svg,effect;
        $target = self.getEventTarget(args.target);
        if($target.length) {
          
          //exception for drag and drop (find another way)
          $master = $target.parents(".master");
          if($master.length !== 0 && args.type=="movewithcursor") {
            $target = $master;
          }
          
          eventData = self.event.data;
          effect = jimUtil.createAnimationOptions(args.effect,callback);
    		          
          switch(args.type) {
            case "movewithcursor":
              dragData = $target.data("jimDrag");
              if(!jimUtil.exists(dragData)) {
                dragData = self.jimCreateDrag(eventData.target, args);
              }

              position = {
                "top": dragData.top,
                "left": dragData.left
              };
              
              if (args.containment) {
                $parent = dragData.parent;
                parentPosition = $parent.jimPosition();
                containment = {
                  "top": parentPosition.top + parseInt($parent.css("border-top-width"),10) + parseInt($parent.css("padding-top"),10),
                  "left": parentPosition.left + parseInt($parent.css("border-left-width"),10) + parseInt($parent.css("padding-left"),10),
                  "bottom": parentPosition.top + $parent.innerHeight() - $target.jimOuterHeight() + parseInt($parent.css("border-top-width"),10),
                  "right": parentPosition.left + $parent.innerWidth() - $target.jimOuterWidth() + parseInt($parent.css("border-left-width"),10)
                };
              }

              if(args.containment) {
                switch(args.axis) {
                  case "x":
                    newPosition = {
                      "top": position.top,
                      "left": Math.min(containment.right, Math.max(containment.left, position.left + (eventData.deltaX*(1/jimUtil.getTotalScale()))))
                    };
                    break;
                  case "y":
                    newPosition = {
                      "top": Math.min(containment.bottom, Math.max(containment.top, position.top + (eventData.deltaY*(1/jimUtil.getTotalScale()))))
                    };
                    break;
                  default:
                    newPosition = {
                      "top": Math.min(containment.bottom, Math.max(containment.top, position.top + (eventData.deltaY*(1/jimUtil.getTotalScale())))),
                      "left": Math.min(containment.right, Math.max(containment.left, position.left + (eventData.deltaX*(1/jimUtil.getTotalScale()))))
                    };
                    break;
                }
              } else {
                switch(args.axis) {
                  case "x":
                    newPosition = {
                      "top": position.top,
                      "left": position.left + (eventData.deltaX*(1/jimUtil.getTotalScale()))
                    };
                    break;
                  case "y":
                    newPosition = {
                      "top": position.top + (eventData.deltaY*(1/jimUtil.getTotalScale()))
                    };
                    break;
                  default:
                    newPosition = {
                      "top": position.top + (eventData.deltaY*(1/jimUtil.getTotalScale())),
                      "left": position.left + (eventData.deltaX*(1/jimUtil.getTotalScale()))
                    };
                    break;
                }
              }
             
              if(args.effect)
      			$target.animate(newPosition, effect);
      		  else
      			$target.css(newPosition);
              self.triggerDragOver($target);
              break;
            case "movetodragstart":
              dragData = $target.data("jimDrag");
              if(jimUtil.exists(dragData)) {
            	  if(dragData.containedInCC){
            		  /*destroy wrapper*/  
            		  $target = $target.children();
            		  $target.unwrap();
            		  /*get target again with a different selector*/
            		  $target = self.getEventTarget(args.target);
            	  }
                jimUtil.insertInto({"target": $target, "parent": dragData.parent, "position": dragData.startposition});
              }
              break;
            case "movebyoffset":
              position = $target.position();
              position.top += $target.parent().scrollTop();
			  position.left += $target.parent().scrollLeft();
			  
			  position.top = position.top *(1/jimUtil.getTotalScale());
			  position.left = position.left *(1/jimUtil.getTotalScale());
			  
              //$target.css({"top": position.top + args.top, "left": position.left + args.left});
		
			  var properties = {"top": position.top + args.top, "left": position.left + args.left};
              if(args.effect)
      			$target.animate(properties, effect);
      		  else
      			$target.css(properties);
			  
              break;
            case "movetoposition":
              if($target.parent("#simulation").length) {
               args.left += jimUtil.getSidePanelWidth();
              }
            
              var properties = {"top": args.top, "left": args.left};
              if(args.effect)
        	    $target.animate(properties, effect);
        	  else
        		$target.css(properties);
        	 
     
              break;
          }
        }
        jimUtil.calculateMasterMinSize($target);
      }
    },
    "jimInsert": function(args) {
      if(jimUtil.exists(args) && jimUtil.exists(args.target)) {
        var self = this, $target, $parent;
        $target = self.getEventTarget(args.target);
        $parent = self.getEventTarget(args.parent);
        if(jimUtil.exists($target) && jimUtil.exists($parent)) {
          switch(self.event.type) {
            case "dragend":
              jimUtil.insertInto({"target": $target, "parent": $parent, "event": self.event});
              break;
            default:
              jimUtil.insertInto({"target": $target, "parent": $parent});
              break;
          }
        }
      }
    },
    "jimShow": function(args, callback) {
      var self = this;
      if(jimUtil.exists(args) && jimUtil.exists(args.target)) {
    	/*exception: groups have no z-index*/
    	var $target = self.getEventTarget(args.target);
    	if($target.hasClass("group")){
    		$target.css("z-index","2");
        }
        jimUtil.show(self.getEventTarget(args.target), args).done(function() {
          if($target.hasClass("group")){
        	  $target.css("z-index","");
          }
          jimUtil.calculateMasterMinSize($target);
          if(callback) { callback(); }
        });
      }
    },
    "jimHide": function(args, callback) {
      if(jimUtil.exists(args) && jimUtil.exists(args.target)) {
        var self = this, $targets, $target, t, tLen, $tree, options;
        if(args.effect) {
          options = jimUtil.createUIEffectOptions(args.effect,callback);
        }
        $targets = self.getEventTarget(args.target);
        if(jimUtil.exists($targets)) {
          for(t=0, tLen=$targets.length; t<tLen; t+=1) {
            $target = jQuery($targets[t]);
            if($target.jimGetType() === itemType.panel) {
              break;
            }
            if(args.effect) {
              /* TODO: add .stop() to interrupt animation */
              $target.show().hide(options);
            } else {
              $target.hide();
            }
            /* start special component behavior */
            jQuery(args.target + "-submenu").hide();
            $tree = ($target.hasClass("tree")) ? $target : $target.parents(".tree");
            if($tree.length) {
              jQuery.fn.jimTree.update($tree);
            }
            /* end special component behavior */
          }
        }
        jimUtil.calculateMasterMinSize($target);
      }
    },
    "jimChangeStyle": function(args) {
      if(args) {
        var self = this, s, sLen, style, target, $target, expression, bShape, shapeStyle, calculatedValue;
        for(s=0, sLen=args.length; s<sLen; s+=1) {
          style = args[s];
          shapeStyle = args[s];
          for(target in style) {
            if(style.hasOwnProperty(target)) {
              $target = self.getEventTarget(target);
              if($target) {
            	  bShape=false;
                  if($target.jimGetType() === itemType.shapewrapper){
                	  $target = $target.find(".shape");
                	  bShape=true;
                  }
                  
              if( typeof shapeStyle[target].attributes == 'undefined' ){
                shapeStyle[target].attributes = {};
                }
              if( typeof shapeStyle[target].expressions == 'undefined' ){
                shapeStyle[target].expressions = {};
                }
                	  
                if(style[target].attributes) {
                  for(attribute in style[target].attributes){
                    if(style[target].attributes.hasOwnProperty(attribute)){
                      calculatedValue = style[target].attributes[attribute];	
                      if(attribute==="width" || attribute==="height") {
                        calculatedValue = (isNaN(parseInt(style[target].attributes[attribute], 10))) ? eval(style[target].attributes[attribute]) : style[target].attributes[attribute];
                      }
                      shapeStyle[target].attributes[attribute] = calculatedValue;
                      try{
                    	var i=attribute.indexOf('#');
                    	var cssAttrName=attribute;
                    	if(i!=-1){
                    		cssAttrName=attribute.substring(0,i);
                    	}
                    	var domObject=$target.get(0);
                        if(domObject.css2svg && domObject.css2svg[attribute]){                      	  
                      	  domObject.css2svg[attribute]=calculatedValue;
                        } else {
                      	  $target.css(cssAttrName, calculatedValue);
                        }  
                      } catch (error) {
                        jimUtil.debug(error);
                      }
                    }
                  }
                }
                try {
                  for(expression in style[target].expressions) {
                    if(style[target].expressions.hasOwnProperty(expression)) {
                      try {
                        calculatedValue = (isNaN(parseInt(style[target].expressions[expression], 10))) ? eval(style[target].expressions[expression]) : style[target].expressions[expression];
                        $target.css(expression, calculatedValue);
                        shapeStyle[target].attributes[expression] = calculatedValue;
                      } catch (error) {
                        jimUtil.debug(error);
                      }
                    }
                  }
                } catch(e) {
                  jimUtil.debug(e); /* IE has problems with gradient expression, expects "url" attribute */
                }
                if(jQuery.browser.msie) {
                  if(style[target]["attributes-ie"]) {
            	    for(attribute in style[target]["attributes-ie"]){
                      if(style[target]["attributes-ie"].hasOwnProperty(attribute)){
                          shapeStyle[target].attributes[attribute] = style[target]["attributes-ie"][attribute];
                        try{
                          var domObject=$target.get(0);
                          if(domObject.css2svg && domObject.css2svg[attribute]){
                        	  domObject.css2svg[attribute]=style[target]["attributes-ie"][attribute];
                          } else {
                        	  $target.css(attribute, style[target]["attributes-ie"][attribute]);
                          }
                          //TODO: sólo pie-background y bordes redondeados
                          if(window.PIE){
                            $target.each(function() {
                                var reattachPIE = true;
                                
                                if($.browser.msie && $.browser.version == 9){ 
    								var backgroundColor = args[0][target]["attributes"]["background-color"],
    								hasBorderRadius = parseInt($target.css("border-top-left-radius"))>0 || parseInt($target.css("border-top-right-radius"))>0 || parseInt($target.css("border-bottom-left-radius"))>0 || parseInt($target.css("border-bottom-right-radius"))>0;
    								pieBackground = style[target]["attributes-ie"]["-pie-background"];
    								
    								if(backgroundColor!==undefined) {
    									var argColor = jimUtil.rgbToHex(backgroundColor);
    									if((pieBackground.toLowerCase() === argColor.toLowerCase() || pieBackground.toLowerCase() === backgroundColor.toLowerCase()) && !hasBorderRadius) {
    										reattachPIE=false;
    										PIE.detach();
    									}
    								}
								}
								if(reattachPIE && !$target.hasClass("shape")){
									PIE.detach(this);
									PIE.attach(this);
								}
                            });
                          }
                        } catch (error) {
                          jimUtil.debug(error);
                        }
                      }
                    }
                  }
                  try {
                    for(expression in style[target]["expressions-ie"]) {
                      if(style[target]["expressions-ie"].hasOwnProperty(expression)) {
                        calculatedValue = (isNaN(parseInt(style[target]["expressions-ie"][expression], 10))) ? eval(style[target]["expressions-ie"][expression]) : style[target]["expressions-ie"][expression];
                        $target.css(expression, calculatedValue);
                        shapeStyle[target].attributes[expression] = calculatedValue;
                      }
                    }
                  } catch (e) {
                    jimUtil.debug(e);
                  }
                  
                  if(jQuery.browser.version<=8) {    
                    if(style[target]["attributes-ie8lte"]) {
                      for(attribute in style[target]["attributes-ie8lte"]){
                          if(style[target]["attributes-ie8lte"].hasOwnProperty(attribute)){
                             shapeStyle[target].attributes[attribute] = style[target]["attributes-ie8lte"][attribute];
                             $target.css(attribute, style[target]["attributes-ie8lte"][attribute]);      
                          }
                      }   
                    }
                    try {
                      for(expression in style[target]["expressions-ie8lte"]) {
                        if(style[target]["expressions-ie8lte"].hasOwnProperty(expression)) {
                          calculatedValue = (isNaN(parseInt(style[target]["expressions-ie8lte"][expression], 10))) ? eval(style[target]["expressions-ie8lte"][expression]) : style[target]["expressions-ie8lte"][expression];
                          $target.css(expression, calculatedValue);
                          shapeStyle[target].attributes[expression] = calculatedValue;
                        }
                      }
                    } catch (e) {
                      jimUtil.debug(e);
                    }
                  }
                }
                jimUtil.forceReflow();
                if(bShape){
                	$target.each(function() {
                		jimShapes.updateStyle(this,shapeStyle[target]);
                	});
              }
              }
            }
          }
        }
      }
    },
    "jimEnable": function(args) {
      if(jimUtil.exists(args) && jimUtil.exists(args.target)) {
        var self = this, $targets, $target, $icon;
        $targets = self.getEventTarget(args.target);
        if(jimUtil.exists($targets) && $targets.length) {
          $targets.each(function(i, target) {
            $target = jQuery(target);
            switch($target.jimGetType()) {
              case itemType.text:
              case itemType.password:
                $target.find("input").removeAttr("readonly");
                break;
              case itemType.file:
                $target.find(".icon").removeAttr("readonly").next("input[type='file']").removeAttr("disabled").removeClass("hidden");
                break;
              case itemType.textarea:
                  $target.find("textarea").removeAttr("readonly");
                  break;
              case itemType.date:
              case itemType.time:
              case itemType.datetime:
            	$target.find("input").removeAttr("readonly");
                $target.find(".icon").removeAttr("readonly");
                break;
              case itemType.radiobuttonlist:
              case itemType.checkboxlist:
                if(jimEvent.isInDataDataRow($target)) {
                  $target.find("tr.disabled").hide().end().find("tr.enabled").show().find("input").removeAttr("disabled");
                } else {
                  $target.removeAttr("readonly").find("input").removeAttr("disabled");
                }
                break;
              case itemType.checkbox:
              case itemType.radiobutton:
                $target.removeAttr("disabled");
                break;
              case itemType.dropdown:
              case itemType.nativedropdown:
                $target.removeAttr("readonly");
                $target.find("select").removeAttr("disabled");
                break;
              case itemType.selectionlist:
              case itemType.multiselectionlist:
                $target.removeAttr("readonly");
                if(jimEvent.isInDataDataRow($target)) {
                  $target.find("td.disabled").hide().prev("td.enabled").show();
                }
                break;
              default:
                $target.removeAttr("readonly");
                break;
            }
          });
        }
      }
    },
    "jimDisable": function(args) {
      if(jimUtil.exists(args) && jimUtil.exists(args.target)) {
        var self = this, $targets, $target, $icon;
        $targets = self.getEventTarget(args.target);
        if(jimUtil.exists($targets) && $targets.length) {
          $targets.each(function(i, target) {
            $target = jQuery(target);
            switch($target.jimGetType()) {
              case itemType.text:
              case itemType.password:
                $target.find("input").attr("readonly", "readonly");
                break;
              case itemType.file:
                $target.find(".icon").attr("readonly", "readonly").next("input[type='file']").attr("disabled", "disabled").removeClass("hidden").addClass("hidden");
                break;
              case itemType.textarea:
                  $target.find("textarea").attr("readonly", "readonly");
                  break;
              case itemType.date:
              case itemType.time:
              case itemType.datetime:
            	$target.find("input").attr("readonly", "readonly");
                $target.find(".icon").attr("readonly", "readonly");
                break;
              case itemType.radiobuttonlist:
              case itemType.checkboxlist:
                if(jimEvent.isInDataDataRow($target)) {
                  $target.find("tr.disabled").show().end().find("tr.enabled").hide().find("input").attr("disabled", "disabled");
                } else {
                  $target.attr("readonly", "readonly").find("input").attr("disabled", "disabled");
                }
                break;
              case itemType.checkbox:
              case itemType.radiobutton:
                $target.attr("disabled", "disabled");
                break;
              case itemType.dropdown:
              case itemType.nativedropdown:
                $target.attr("readonly", "readonly");
                $target.find("select").attr("disabled", "disabled");
                break;
              case itemType.selectionlist:
              case itemType.multiselectionlist:
                $target.attr("readonly", "readonly");
                if(jimEvent.isInDataDataRow($target)) {
                  $target.find("td.disabled").show().prev("td.enabled").hide();
                }
                break;
              default:
                $target.attr("readonly", "readonly");
              break;
            }
          });
        }
      }
    },
    "jimFocusOn": function(args) {
    	 var self = this;
         if(args && args.target) {
           jimUtil.jimFocusOn(self.getEventTarget(args.target));
         }
    },
    "jimScrollTo": function(args, callback) {
        var self = this, settings = {};
        if(args && args.target) {
          if(args.effect) {
        	  jQuery.extend(settings, {"effect": jimUtil.createAnimationOptions(args.effect,callback)});
          }	
          if(args.axis){
        	  jQuery.extend(settings, {"scroll": args.axis});
          }
          jimUtil.jimPointTo(self.getEventTarget(args.target),settings);
        }
      },
    "jimSetValue": function(args, instance) {
      if(jimUtil.exists(args)) {
        var self = this, $targets, $target, type, i, iLen, value, $options = [];
        value = self.evaluateExpression(args.value, instance);
        if(jimUtil.exists(value)) {
          if(args.variable) {
            /* value = (args.value.datamaster) ? self.getData(args.value) : (jimData.variables.hasOwnProperty(args.variable)) ? jimUtil.toJS(self.evaluateExpression(args.value, instance)) : null; */
            jimData.set(args.variable, value);
          } else if(args.target) {
            $targets = self.getEventTarget(args.target);
            if($targets) {
              for(i=0, iLen = $targets.length; i < iLen; i += 1) {
                $target = jQuery($targets[i]);
                type = $target.jimGetType();
                switch(type) {
                  case itemType.richtext:
                  case itemType.textcell:
                  case itemType.rectangle:
                    $target.find(".valign").html("<span>"+jimUtil.toHTML(value)+"</span>");
                    break;
                  case itemType.shapewrapper:
                    $target.find(".valign").html("<span>"+jimUtil.toHTML(value)+"</span>");
                    break;
                  case itemType.button:
                  case itemType.label:
                    $target.find("span").html(jimUtil.toHTML(value));
                    break;
                  case itemType.index:
                  case itemType.summary:
                    /* ignore */
                    break;
                  case itemType.image:
                    /* $target.attr("src", jimUtil.encodeURI(value)); */
                    value = value.replace("%", "%25");
                    value = value.replace("#", "%23");
                    $target.attr("src", value);
                    break;
                  case itemType.text:
                  case itemType.password:
                  case itemType.date:
                  case itemType.time:
                  case itemType.datetime:
                    $target.find("input").val(jimUtil.fromHTML(value));
                    break;
                  case itemType.file:
                    try {
                      $target.find("input").val(jimUtil.fromHTML(value));
                    } catch(error) {
                      switch(error.name) {
                        case "NS_ERROR_DOM_SECURITY_ERR":
                            /* silent ignore */
                          break;
                        default:
                          break;
                      }
                    }
                    break;
                  case itemType.textarea:
                    $target.find("textarea").val(jimUtil.fromHTML(value));
                    break;
                  case itemType.checkbox:
                  case itemType.radiobutton:
                    if(value.toString() === "false") {
                      $target.attr("checked", false);
                    } else if (value.toString() === "true") {
                      $target.attr("checked", true);
                      if(window.jimMobile) {
                        $target.trigger("mousedown");
                        $target.trigger("mouseup");
                      }
                    }
                    break;
                  case itemType.dropdown:
                  case itemType.nativedropdown:
                    $target.children(".dropdown-options").html(jimEvent.getHtml(type, jimUtil.toArray(value)));
                    self.jimSetSelection({"target": $target, "value": $target.children(".dropdown-options").children(".option:first").text()});
                    break;
                  case itemType.selectionlist:
                  case itemType.multiselectionlist:
                    if(jimEvent.isInDataDataRow($target)) {
                      $target.find("td.disabled").html(jimUtil.toHTML(value));
                    } else {
                      $target.find("td").html(jimEvent.getHtml(type, jimUtil.toArray(value)));
                    }
                    break;
                  case itemType.radiobuttonlist:
                  case itemType.checkboxlist:
                    if(jimEvent.isInDataDataRow($target)) {
                      $target.find("tr.disabled td").html(jimUtil.toHTML(value));
                    } else {
                      $target.find("tbody").html(jimEvent.getHtml(type, jimUtil.toArray(value), $target));
                    }
                    break;
                  case itemType.datagrid:
                    $target.datagrid("update", value, self.event);
                    break;
                }
              }
            }
          }
        }
      }
    },
    "jimGetValue": function(args, instance) {
      if(jimUtil.exists(args)) {
        var self = this, $target, type, value = "", i, iLen, $holder, $options = [];
        $target = self.getEventTarget(args.target, instance);
        if(jimUtil.exists($target) && $target.length) {
          type = $target.jimGetType();
          switch(type) {
            case itemType.richtext:
            case itemType.textcell:
              $target.find("span").each(function(i, span) {
                value += span.innerHTML;
              });
              break;
            case itemType.shapewrapper:
              $target.find("span").each(function(i, span) {
                value += span.innerHTML;
              });
              break;
            case itemType.button:
            case itemType.label:
              value = $target.find("span").html();
              break;
            case itemType.index:
            case itemType.summary:
              /* ignore */
              break;
            case itemType.image:
              value = $target.attr("src");
              break;
            case itemType.checkbox:
            case itemType.radiobutton:
              if(window.jimMobile && window.jimMobile.isIOS()) {
            	value = ($target.attr("checked")) ? true : false;
              }
              else {
            	value = $target.is(":checked");
              }
              break;
            case itemType.text:
            case itemType.password:
            case itemType.date:
            case itemType.time:
            case itemType.datetime:
            case itemType.file:
              value = $target.find("input").val();
              break;
            case itemType.textarea:
              value = $target.find("textarea").val();
              break;
            case itemType.dropdown:
            case itemType.nativedropdown:
            case itemType.selectionlist:
            case itemType.multiselectionlist:
              $holder = ((type === itemType.selectionlist) || (type === itemType.multiselectionlist)) ? $target : jQuery("#"+$target.attr("id")+"-options");
              $options = $holder.find(".option");
              for(i=0, iLen=$options.length; i<iLen; i += 1) {
                value += jQuery($options[i]).text();
                if(i+1 < iLen) { value += ","; }
              }
              break;
            case itemType.radiobuttonlist:
            case itemType.checkboxlist:
              $options = $target.find(".option");
              for(i=0, iLen=$options.length; i<iLen; i += 1) {
                value += jQuery($options[i]).text();
                if(i+1 < iLen) { value += ","; }
              }
              break;
            case itemType.datagrid:
              break;
          }
          return value;
        }
      }
    },
    "jimSetSelection": function(args, instance) {
      if(jimUtil.exists(args) && jimUtil.exists(args.value) && jimUtil.exists(args.target)) {
        var self = this, $targets, $target, type, value = "", $options, $option, option, t, tLen, o, oLen, v, vLen;
        if (args.value.datamaster) {
          jimData.set(args.target, jimGetDataInstanceIds(args.value.source));
        } else {
          value = self.evaluateExpression(args.value, instance);
          $targets = self.getEventTarget(args.target);
          if(jimUtil.exists($targets)) {
            for(t=0, tLen=$targets.length; t<tLen; t+=1) {
              $target = jQuery($targets[t]);
              type = $target.jimGetType();
              switch(type) {
                case itemType.dropdown:
                case itemType.nativedropdown:
                  $options = $target.children(".dropdown-options").children(".option").removeClass("selected");
                  for(o=0, oLen=$options.length; o<oLen; o+=1) {
                    option = $options[o];
                    if(option.textContent === value || option.innerText === value) {
                      //jQuery(option).addClass("selected");
                      jQuery(option).attr("selected","selected");
                      $target.find(".value").html(jimUtil.toHTML(value));
                      return false;
                    }
                  }
                  break;
                case itemType.selectionlist:
                  $options = $target.find(".option").removeClass("selected");
                  for(o=0, oLen=$options.length; o<oLen; o+=1) {
                    $option = jQuery($options[o]);
                    if($option.text() === value) {
                      $option.addClass("selected");
                      if(jimEvent.isInDataDataRow($target)) {
                        $target.find("td.disabled").html(jimUtil.toHTML(value));
                      }
                      break;
                    }
                  }
                  break;
                case itemType.multiselectionlist:
                  value = jimUtil.toArray(value);
                  $options = $target.find(".option").removeClass("selected");
                  for(o=0, oLen=$options.length; o<oLen; o+=1) {
                    $option = jQuery($options[o]);
                    for(v=0, vLen=value.length; v<vLen; v+=1) {
                      if($option.text() === value[v]) {
                        $option.addClass("selected");
                        if(jimEvent.isInDataDataRow($target)) {
                            $target.find("td.disabled").html(jimUtil.toHTML(value));
                        }
                        break;
                      }
                    }
                  }
                  break;
                case itemType.radiobuttonlist:
                  var search = "input";
                  if(window.jimMobile && window.jimMobile.isIOS()) {
                	  search = "div";
                  }
                  $options = $target.find(search).removeAttr("checked").end().find(".option");
                  for(o=0, oLen=$options.length; o<oLen; o+=1) {
                    $option = jQuery($options[o]);
                    if($option.text() === value) {
                      if(window.jimMobile && window.jimMobile.isIOS())
                        jQuery($option.prev(search)[0]).attr("checked", true);
                      else $option.prev(search)[0].checked = true;
                      //disabled inside data grid
                      if(jimEvent.isInDataDataRow($target)) {
                        $target.find("tr.disabled td").html(jimUtil.toHTML(value)); 
                      }
                      
                      break;
                    }
                  }
                  break;
                case itemType.checkboxlist:
                  value = jimUtil.toArray(value);
                  var search = "input";
                  if(window.jimMobile && window.jimMobile.isIOS()) {
                	  search = "div";
                  }
                  $options = $target.find(search).removeAttr("checked").end().find(".option");
                  for(o=0, oLen=$options.length; o<oLen; o+=1) {
                    $option = jQuery($options[o]);
                    for(v=0, vLen=value.length; v<vLen; v+=1) {
                      if($option.text() === value[v]) {
                    	if(window.jimMobile && window.jimMobile.isIOS())
                    	  jQuery($option.prev(search)[0]).attr("checked", true);
                    	else $option.prev(search)[0].checked = true;
                    	//disabled inside data grid
                        if(jimEvent.isInDataDataRow($target)) {
                            $target.find("tr.disabled td").html(jimUtil.toHTML(value)); 
                        }
                        break;
                      }
                    }
                  }
                  break;
              }
            }
          }
        }
      }
    },
    "jimGetSelection": function(args) {
      if(jimUtil.exists(args) && jimUtil.exists(args.target)) {
        var self = this, $target, i, iLen, $selected;
        $target = self.getEventTarget(args.target);
        if(jimUtil.exists($target) && $target.length) {
          switch($target.jimGetType()) {
            case itemType.dropdown:
            case itemType.nativedropdown:
              return $target.find(".valign").children(".value").text();
            case itemType.selectionlist:
            case itemType.multiselectionlist:
              return $target.find(".selected").contents().map(function() {
                if(this.nodeType === 3) {
                  return this.data;
                }
              }).get().join(",");
            case itemType.radiobuttonlist:
            case itemType.checkboxlist:
  			  if(window.jimMobile && window.jimMobile.isIOS()) {
  			    return $target.find("div[checked]").next(".option").contents().map(function() {
  				  if(this.nodeType === 3) {
  				    return this.data;
  				  }
  			    }).get().join(",");
  			  }
  			  else {
  			    return $target.find("input:checked").next(".option").contents().map(function() {
  				  if(this.nodeType === 3) {
  				    return this.data;
  				  }
  			    }).get().join(",");
  			  }
          }
        }
      }
    },
    "jimPause": function(args, callback) {
      var self = this, $firer, undoPauseStack;
      if(jimUtil.exists(args)) {
        if(self.event.backupState) {
          $firer = self.getEventFirer();
          undoPauseStack = $firer.data("jimUndoPauseStack");
          if(!jimUtil.exists(undoPauseStack)) {
            undoPauseStack = [];
          }
          undoPauseStack.push(setTimeout(callback, args.pause));
          $firer.data("jimUndoPauseStack", undoPauseStack);
         } else {
          jimEvent.pauseStack.push(setTimeout(callback, args.pause));
         }
      }
    },
    "jimResize": function(args,callback) {
        if(jimUtil.exists(args)) {
            var self = this, $targets, $target,$parent, type, i, iLen, width, height, bShape, shapeStyle;    
         
            if(args.target) {
                $targets = self.getEventTarget(args.target,undefined,"jimResize");
                if($targets) {
                    for(i=0, iLen = $targets.length; i < iLen; i += 1) {
                        $target = jQuery($targets[i]);
                        bShape=false;
                        if($target.jimGetType() === itemType.panel)
                            $parent = $target.closest(".dynamicpanel").parent();
                        else if($target.is(".cellcontainer") || $target.is(".datacell") || $target.is(".textcell") )
                            $parent = $target.closest(".table, .datagrid");
                        else
                            $parent = $target.parent();
                            
                        if($target.jimGetType() === itemType.shapewrapper){
                            bShape=true;
                           
                        }    
                            
                        if($parent.closest(".firer").is(".screen, .template"))   
                            $parent = $parent.closest(".ui-page"); 
                            
                        if(args.width && args.width.type!=="noresize"){
                            width = self.evaluateExpression(args.width.value); 
                            if(args.width.type==="parentrelative" && jimUtil.exists($parent)){
                                var percentage = width;
                                width = jimUtil.getScrollContainerSize($parent).width;
                                if(jimUtil.exists(percentage) && !isNaN(parseInt(percentage, 10)))
                                    width = width / 100 * percentage;
                            }
                            
                            if(jimUtil.exists(width) && !isNaN(parseInt(width, 10))) {
                                var substraction = jimEvent.fn.getCurrentStyle('border-left-width', $target) + jimEvent.fn.getCurrentStyle('border-right-width', $target) + jimEvent.fn.getCurrentStyle('padding-left', $target) + jimEvent.fn.getCurrentStyle('padding-right', $target);
                                if(bShape || $target.is(".table") || $target.is(".datagrid") || isNaN(substraction)){
                                    substraction =0;
                                }
                                
                                width = Math.max( width - substraction,0);                        
                            }
                        }
                        if(args.height && args.height.type!=="noresize"){
                            height = self.evaluateExpression(args.height.value);   
                            if(args.height.type==="parentrelative" && jimUtil.exists($parent)){
                                var percentage = height;
                                height = jimUtil.getScrollContainerSize($parent).height;
                                if(jimUtil.exists(percentage) && !isNaN(parseInt(percentage, 10)))
                                    height = height / 100 * percentage;
                            }
                            
                            if(jimUtil.exists(height) && !isNaN(parseInt(height, 10))) {
                              var substraction = jimEvent.fn.getCurrentStyle('border-top-width', $target) + jimEvent.fn.getCurrentStyle('border-bottom-width', $target) + jimEvent.fn.getCurrentStyle('padding-top', $target) + jimEvent.fn.getCurrentStyle('padding-bottom', $target);
                              if(bShape || $target.is(".table") || $target.is(".datagrid") || isNaN(substraction)){
                                substraction=0;
                              }
                              height = Math.max( height - substraction,0);
                            }
                        }
                        
                        var effect;
                        if(args.effect)
                        	effect = jimUtil.createAnimationOptions(args.effect);
                        
                        if($target.is(".table") || $target.is(".datagrid")){
                            jimUtil.resizeTable($target,width,height,effect,callback);  
                           
                        }else if($target.is(".cellcontainer") || $target.is(".datacell") || $target.is(".textcell") ){
                            jimUtil.resizeCell($target,width,height,effect);
                            if(callback)
                            	callback();	
                        }else if($target.is(".headerrow") || $target.is(".datarow") ){
                            jimUtil.resizeRow($target,width,height,effect);
                            if(callback)
                            	callback();	
                        }else{
                        	effect = jimUtil.createAnimationOptions(args.effect,callback);
                        	var properties = {};
                            if(jimUtil.exists(width) && !isNaN(parseInt(width, 10)))
                            	jQuery.extend(properties, {"width": width});
                            if(jimUtil.exists(height)  && !isNaN(parseInt(height, 10)))
                            	jQuery.extend(properties, {"height": height});
                            
                      		if(args.effect){
                      			 if(bShape){
                      				 var progress = function(){
                      					 var $shapewrapper = $(this);
                      					 shapeStyle = {};
                                     	shapeStyle.attributes = {"width":$shapewrapper.css("width"), "height":$shapewrapper.css("height")};
                                     	jimShapes.updateStyle(   $shapewrapper.find(".shape")[0],shapeStyle);
                      				 };
                      				jQuery.extend(effect,{"progress": progress});
                                  }

                      			$target.animate(properties, effect);
                      		}else{
                      			
                      			$target.css(properties);
                      			 if(bShape){
                                     shapeStyle = {};
                                     shapeStyle.attributes = {"width":width, "height":height};
                                     jimShapes.updateStyle($target.find(".shape")[0],shapeStyle);
                                  }

                      		}
                        }
                        
                       
                        jimUtil.forceReflow();
                        jimUtil.calculateMasterMinSize($target);
                    }
                    
                    jQuery(window).trigger("reloadScrollBars");
                }
            }
        }
    }        
  });
})(window);

