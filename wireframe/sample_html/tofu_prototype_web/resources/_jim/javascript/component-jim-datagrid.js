/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function (window, undefined) {
  
  var $simulation = jQuery("#simulation"), templates = {};
  
  function lookUpTemplate(template) {
    if(!templates.hasOwnProperty(template)) {
      templates[template] = doT.template(document.getElementById(template + "-template").text, undefined, undefined);
    }
    return templates[template];
  };
  
  $simulation
  .bind("loadcomponent", function() {
    templates = {}; /* reset the template cache when a new page is loaded */
  })
  .on("update.datagrid", ".datagrid", function(event){
    event.stopPropagation();
    var $grid = jQuery(event.target || event.srcElement).closest(".datagrid");
    var oddRows = $grid.find(".datarow:not(.hidden):odd");
    var evenRows = $grid.find(".datarow:not(.hidden):even");
    oddRows.removeClass("odd").addClass("even");
    evenRows.removeClass("even").addClass("odd");
    jQuery(".summary[datagrid='"+$grid.attr("id")+"']").trigger("update.datagrid", [$grid]);
    jQuery(".index[datagrid='"+$grid.attr("id")+"']").trigger("update.datagrid", [$grid]);
    $grid.find(".tree").jimTree();
    $grid.find(".menu > .menunode > .submenu").appendTo($grid.closest(".template, .screen"));
    jimShapes.renderAll(jQuery(".non-processed-shape"));
    jimUtil.calculateMasterMinSize($grid);
  })
  .on("update.datagrid", ".summary", function(event, $grid) {
    event.stopPropagation();
    var $summary, size, total, start, end;
    $summary = jQuery(this);
    size = parseInt($grid.attr("size"), 10);
    total = $grid.find(".datarow").length;
    start = $grid.find(".datarow:not(.hidden):first").index() + 1;
    end = (size === 0) ? total : start + size - 1;
    if (end > total) {
      end = total;
    }
    $summary.find("#total").text(total).next("#start").text(start).next("#end").text(end);
  })
  .on("update.datagrid", ".index", function(event, $grid) {
    event.stopPropagation();
    var $index , size, current, total, c;
    $index = jQuery(this);
    size = parseInt($grid.attr("size"), 10);
    current = Math.floor($grid.find(".datarow:not(.hidden):first").index() / size) + 1;
    if(isNaN(current)) {
      current = 1;
    }
    total = (size === 0) ? 1 : Math.ceil($grid.find(".datarow").length / size);
    $index.html("");
    for (c=1; c <= total; c += 1) {
      $index.append((current === c) ? "<span class=\"current\">" + c + "</span>" : "<span>" + c + "</span>");
    }
  });
  
  var gridMethods = {
    "init": function() {
      return this.each(function(i, grid) {
        var $grid = jQuery(grid);
        if($grid.hasClass("datagrid")) {
          $grid.datagrid("update", jimData.datamasters[$grid.attr("datamaster")], {"init": true});
        }
      });
    },
    "update": function(instances, options) {
      var $grid = jQuery(this), subGrids, i, iLen, tmpInstances, instance, $subGrid, gridHtml;
      if (jimUtil.exists(instances)) {
        if(instances === "" || (jQuery.isArray(instances) && instances.length === 0)) {
          $grid.find(".datarow").remove();
          $grid.trigger("update.datagrid");
        } else {
          if(!jimUtil.isArray(instances)) {
            instances = jimUtil.toArray(instances);
          } else if (jQuery.browser.msie && jimMain.isPopup(window)) { /* IE bug: popup window converts array to object */
            tmpInstances = [];
            for (i=0, iLen=instances.length; i<iLen; i+=1) {
              tmpInstances.push(instances[i]);
            }
            instances = tmpInstances;
          }
          if(instances[0] && instances[0].datamaster === $grid.attr("datamaster")) {
            $grid.find(".datarow").remove();
            gridHtml = "";
            tmplFn = lookUpTemplate(jimUtil.getBaseID($grid.attr("id")));
            for(i=0, iLen=instances.length; i<iLen; i+=1) {
              instance = instances[i];
              instance.index = i + 1;
              gridHtml += tmplFn(instance);
            }
            
            $grid.children("tbody").html(gridHtml);
            changeGridDuplicatedIDs($grid);
            
            if(window.PIE){
              $grid.find('.pie:not(.hidden)').each(function() {  
            	if(!$(this).parent().hasClass("hidden")){
            	  PIE.attach(this);
            	}
              });
            }
            if(!window.jimMobile || window.jimMobile && !jimMobile.isMobileDevice()){
              changeInputType($grid);
            }
            $grid.trigger("update.datagrid");
            if(options) {
              if(options.init) {
                $grid.find(".datagrid").datagrid();
              } else if (options.type === "pageload") {
                //Prevent infinite loop when a set value into a datagrid is triggered from a pageLoad event defined on a datalist descendant.
                if(!$grid.hasClass("pageLoadTriggered")){
                  $grid.addClass("pageLoadTriggered");
                  $grid.find(".pageload").trigger("pageload");
                  $grid.removeClass("pageLoadTriggered");
                }
              }
            }
          }
        }
      }
    }
  };
  
  function changeGridDuplicatedIDs($grid){
	  var $gridBody = $grid.children("tbody");
	  $gridBody.find(".datarow").each(function(rowIndex,row) {
      	var $row = jQuery(row);
      	var $children = $row.find(".firer, .nodecontent").andSelf().each(function(){
      		var closestDatagrid = $(this).closest(".datagrid")[0];
      		if($(this).closest(".headerrow").length>0){
      			closestDatagrid = $(this).closest(".datagrid").parent().closest(".datagrid")[0];
      		}
      		if(closestDatagrid === $grid[0]){
      			changeElementID(rowIndex,$(this));
      		}
      	});
      });
	  //Change datagrid ID nested into another datagrid after HTML is injected(original ID is used to find the CDATA template).  
      var $parentRow = $grid.closest(".datarow");
      if (jimUtil.exists($parentRow[0])){
      	var rowIndex = $parentRow.parent().children(".datarow").index($parentRow);
      	changeElementID(rowIndex,$grid);
      }
  }
  
  
  function changeElementID(rowIndex,$element){
		var baseID = $element.attr("id");
		$element.addClass(baseID);
		$element.attr("id","r"+rowIndex+"_"+baseID);
  }
  
  function changeInputType($grid) {
	  $grid.find('input[type="date"], input[type="time"], input[type="datetime-local"]').each(function() {
		if(jQuery(this).attr("readonly"))
		  $("<input type='text' />").attr({ name: this.name, value: this.defaultValue, tabindex: this.tabIndex, readonly:"readonly" }).insertBefore(this);
		else $("<input type='text' />").attr({ name: this.name, value: this.defaultValue, tabindex: this.tabIndex }).insertBefore(this);
	  }).remove();
  }
  
  jQuery.fn.datagrid = function(method) {
    if (gridMethods[method]) {
      return gridMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof(method) === 'object' || !method) {
      return gridMethods.init.apply(this, arguments);
    } else {
      jimUtil.debug("Method " +  method + " does not exist.");
    }
  };
})(window);