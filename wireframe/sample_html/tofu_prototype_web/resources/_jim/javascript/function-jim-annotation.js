/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

(function(window, undefined) {

  var
  /*********************** START LOCAL FIELD DECLARATION ************************/
  activeClass = "selected",
  hiddenClass = "hidden",
  scopedClass = "scoped",
  searchedClass = "searched",
  closedClass = "closed",
  currentComponentClass = "current-element",
  searchHighlightClass = "search-highlight",
  $search = jQuery("#search-field"),
  $navigationBtn = jQuery("#navigate-btn"),
  $commentBtn = jQuery("#comment-btn"),
  $grid = jQuery("#comment-grid"),
  $comments = jQuery("#comments"),
  $scopeButtons = jQuery("#scope-btns").children(".tabs"),
  $allScope = jQuery("#scope-all-btn"),
  $screenScope = jQuery("#scope-screen-btn"),
  $simulation = jQuery("#simulation"),
  $body = jQuery("body"),
  $sidepanel = jQuery("#sidepanel"),
  $commentpanel = jQuery(".commentpanel"),
  templates = {},
  rootTemplate = "root-template",
  commentTemplate = "comment-template",
  reloadDelay = 180000, /* reload every 3 min */
  reloadCounterLimit = 50,
  reloadCounter = 50, /* set reload limit */

  /*********************** END LOCAL FIELD DECLARATION **************************/
  
  /*********************** START REMOTE FIELD DECLARATION ***********************/
  message = "Leave a comment...",
  addCommentClass = "add-comment",
  $blockui = jQuery("#blockui"),
  $commentfile = jQuery("input.file"),
  $dialog = jQuery("#dialog"),
  $textareaAnnotation = jQuery("textarea.annotation"),
  messageTemplate = "message-template",
  isRemote = false, /* set true when loading remote data was successful */
  currentData = { "author": null };
  /*********************** END REMOTE FIELD DECLARATION *************************/
  
  /*********************** START LOCAL METHOD DEFINITION ************************/
  /* START DATA FUNCTIONS */
  function loadDataLocal() {
	    if(jimUtil.isChromeLocal() && jimUtil.chromeExtension){
	    	//use extension
	    	//send ready event to extension
		    var getCommentsEvent = window.document.createEvent('Event');
		    getCommentsEvent.initEvent('getCommentsEvent', true, true);  
	    	document.getElementById('chromeTransfer').dispatchEvent(getCommentsEvent);
	    
			$('#chromeTransfer').bind('ajaxCommentsDoneEvent', function () {
			  var json = JSON.parse($(this).text());
			  
    	      if(json && json.comments && json.comments.length) {
	    	        updateComments(json.comments, false);
	    	  }
    	      else {
	    	        removeComments();
	    	  }
    	      document.getElementById('chromeTransfer').innerText="";
    	      console.log("Comments loaded.");
		    });
			$('#chromeTransfer').bind('ajaxCommentsFailEvent', function () {
				removeComments();
				document.getElementById('chromeTransfer').innerText="";
		    });
	    }
	    else{
	    	jQuery.ajax({
	    	      "url": "comments/annotations.json",
	    	      "dataType": "json"
	    	    })
	    	    .done(function(json, textStatus, jqXHR) {
	    	    	console.log("Comments loaded.");
	    	      if(json && json.comments && json.comments.length) {
	    	        updateComments(json.comments, false);
	    	      } else {
	    	        removeComments();
	    	      }
	    	    })
	    	    .fail(function(xhr, status, error) {
	    	      removeComments();
	    	    });
	    }
  }
  /* END DATA FUNCTIONS */
  
  /* START GRID FUNCTIONS */
  function filterGrid(scope) {
    var $rootComment;
    $scopeButtons.removeClass(activeClass);
    switch (scope) {
      case "all":
        $allScope.addClass(activeClass);
        $grid.children("." + scopedClass).removeClass(scopedClass);
        break;
      case "screen":
        $screenScope.addClass(activeClass);
        $grid.children(".root").each(function(index, rootComment) {
          $rootComment = jQuery(rootComment);
          if (jimUtil.hasCanvas($rootComment.find("input#canvasID").val())) {
            $rootComment.removeClass(scopedClass);
          } else {
            $rootComment.addClass(scopedClass);
          }
        });
        break;
    }
  }
  
  function searchGrid(term) {
    var asSearch, sRegExpString, rpSearch, $rootComment;
    if (term.length > 0) {
      asSearch = jimUtil.escapeRegex(term).split(' ');
      sRegExpString = '^(?=.*?' + asSearch.join(')(?=.*?') + ').*$';
      rpSearch = new RegExp(sRegExpString, "i");
      $grid.children(".root").each(function(index, rootComment) {
        $rootComment = jQuery(rootComment);
        if (rpSearch.test($rootComment.find(".text").text()) || rpSearch.test($rootComment.find(".author").text())) {
          $rootComment.removeClass(searchedClass);
        } else {
          $rootComment.addClass(searchedClass);
        }
      });
    } else {
      $grid.children("." + searchedClass).removeClass(searchedClass);
    }
  }
  /* END GRID FUNCTIONS */
  
  /* START COMMENT FUNCTIONS */
  function updateComments(comments, refresh) {
    var c, len, comment, $root, root, fragment, $context;
    if (comments) {
      fragment = document.createDocumentFragment();
      for(c=0, len=comments.length; c<len; c+=1) {
        comment = comments[c];
        if (comment.parentCode) {
          $root = jQuery(fragment.childNodes).find("input#code[value='" + comment.parentCode + "']").parents(".root");
          if($root.length === 0) {
            $root = $grid.find("input#code[value='" + comment.parentCode + "']").parents(".root");
          }
          $root.children(".replies").append(lookUpTemplate(commentTemplate)(comment));
          updateIsRead($root, comment.isRead);
          updateNumReplies($root);
          $root.find("textarea.annotation").autoGrow();
        } else {
          root = document.createElement("div");
          root.innerHTML = lookUpTemplate(rootTemplate)(comment);
          root = root.firstChild;
          fragment.insertBefore(root, fragment.firstChild);
        }
      }
      if(fragment.childNodes.length) {
        $grid.prepend(fragment);
      }
      if(refresh === false) {
        $grid.find("textarea.annotation").autoGrow();
      }
    }
  }
  
  function updateIsRead($comment, isRead) {
    if (isRead) {
      $comment.closest(".root").removeClass("unread");
    } else {
      $comment.closest(".root").addClass("unread");
    }
  }
  
  function updateNumReplies($comment) {
    var $root = $comment.closest(".root"), numReplies = $root.find(".replies").children(".comment").length;
    $root.find(".total").html((numReplies > 0) ? "(" + numReplies + ")" : "&nbsp;");
  }
  
  function showComment($comment) {
    var $rootComment, elementID, canvasID, canvasURL;
    $rootComment = $comment.closest(".root");
    elementID = $rootComment.find("input#elementID").val();
    canvasID = $rootComment.find("input#canvasID").val();
    canvasURL = $rootComment.find("input#canvasURL").val();
    
    if (elementID && canvasID && canvasURL) {
      selectCurrentComponent(elementID, canvasID, canvasURL, $rootComment);
    }
  }
  
  function markReadCommentLocal($rootComment) {
    $rootComment.removeClass("unread");
  }
  
  function getAttachmentFileLocal(filename) {
    if (filename) {
      window.open("comments/attachments/" + filename);
    }
  }
  
  function removeComments() {
    $comments.remove();
    jimLayout.setSidePanelLayout();
  }
  /* END COMMENT FUNCTIONS */
  
  /* START ANNOTATION FUNCTIONS */
  function isActive() {
    return $commentBtn.hasClass(activeClass);
  }
  
  function lookUpTemplate(template) {
    if(!templates.hasOwnProperty(template)) {
      templates[template] = doT.template(document.getElementById(template).text, undefined, undefined);
    }
    return templates[template];
  }
  
  function getCanvasID($element) {
    var canvasID;
    switch($element.attr("id").substring(0,2)) {
      case "s-":
        canvasID = jQuery(".screen:first").attr("id");
        break;
      case "t-":
        canvasID = jQuery(".template:first").attr("id");
        break;
      case "m-":
        canvasID = $element.closest(".master").attr("id");
        break;
    }
    return canvasID;
  }
  
  function selectCurrentComponent(component, canvasID, canvasURL, $row) {
    var $component,settings;
    if (jimUtil.exists(component) && component.length) {
      if(jimUtil.exists(canvasID) && jimUtil.exists(canvasURL) && !jimUtil.hasCanvas(canvasID)) {
        jimMain.navigate(canvasURL).done(function() {
          selectCurrentComponent(component, canvasID, canvasURL, $row);
        });
      } else {
        /* highlight component */
        $simulation.find("." + currentComponentClass).removeClass(currentComponentClass).jimUndoVisibility();
        $component = (canvasID === component) ? jQuery(".template, .screen").closest("." + canvasID) : jQuery("." + canvasID).find("#" + component+",."+component);
        showCommentableFeedback($component.jimForceVisibility()[0]);
        settings = {"effect":{"duration": 1000,"easing": "linear","queue": false}};
        jimUtil.jimPointTo($component,settings);
        jimUtil.jimFocusOn($component);
      }
    }
  }
  
  function deselectCurrentComponent() {
    $simulation.find("." + currentComponentClass).removeClass(currentComponentClass);
  }
  
  function toggleComment($root) {
    if ($root.hasClass(closedClass)) {
      $grid.children(".root").addClass(closedClass);
      $root.removeClass(closedClass);
      if ($root.hasClass("unread")) {
        markReadComment($root);
      }
      var elementID, canvasID, canvasURL;
      elementID = $root.find("input#elementID").val();
      canvasID = $root.find("input#canvasID").val();
      canvasURL = $root.find("input#canvasURL").val();
      if (elementID && canvasID && canvasURL) {
        selectCurrentComponent(elementID, canvasID, canvasURL, $root);
      }
    } else {
      $root.addClass(closedClass);
      deselectCurrentComponent();
    }
    /*}*/
  }
  
  function activateLocal() {
    $navigationBtn.removeClass(activeClass);
    $commentBtn.addClass(activeClass);
  }
  
  function deactivateLocal() {
    $commentBtn.removeClass(activeClass);
    $navigationBtn.addClass(activeClass);
    deselectCurrentComponent();
  }
  
  function setSimulationElements() {
    $simulation = jQuery($simulation.selector);
    $commentpanel = jQuery($commentpanel.selector);
  }
  
  function addEventListenerLocal() {
    $comments.click(function(event) {
      var firer, $firer;
      $firer = jQuery(event.target || event.srcElement).closest(".firer");
      firer = $firer[0];
      if(firer === $navigationBtn[0]) {
        deactivate();
        return false;
      } else if(firer === $commentBtn[0]) {
        activate();
        return false;
      } else if ($firer.hasClass("show")) {
        showComment($firer.closest(".root"));
        return false;
      } else if (firer === $allScope[0]) {
        filterGrid("all");
        return false;
      } else if (firer === $screenScope[0]) {
        filterGrid("screen");
        return false;
      } else if ($firer.hasClass("attachment")) {
        /* show file dialog */
      } else if ($firer.hasClass("root")) {
        toggleComment($firer);
        return false;
      }
    });

    $search.keyup(function(event) {
      var search = $search.val(); 
      $grid.removeHighlight({"className": searchHighlightClass});
      searchGrid(search);
      $grid.find(".comment:not('." + scopedClass + "', . "+ searchedClass + "')").find(".author, .text").highlight(search, {"className": searchHighlightClass});
    });
    
    $body.click(function(event) {
      deselectCurrentComponent();
    });
  }
  /* END ANNOTATION FUNCTIONS */
  /*********************** END LOCAL METHOD DEFINITION **************************/
  
  /*********************** START REMOTE METHOD DEFINITION ***********************/
  /* START DATA FUNCTIONS */
  function loadDataRemote(refresh) {
	if(jimUtil.isChromeLocal()){
		loadDataLocal();
		return;
	}
    if(reloadCounter > 0 && !$sidepanel.hasClass("hidden")) {
      jQuery.ajax({
        "url": "listComments.action",
        "data": {"refresh": refresh},
        "dataType": "json"
      })
      .done(function(json, textStatus, jqXHR) {
        if(!isRemote) {
          isRemote = true;
          $body.removeClass("offline");
          addEventListenerRemote();
        }
        reloadCounter -= 1;
        if (json && json.result) {
          switch(json.result) {
            case "success":
              currentData.author = json.data.author;
              updateComments(json.data.comments, refresh);
              break;
            case "error":
              showError($grid.children(".title"), "", "New comment data could not be retrieved.");
              break;
            case "not-allowed":
              showError($grid.children(".title"), "", "You are not authorized to retrieve comment data.");
              break;
          }
        }
        setTimeout(function() {loadDataRemote(true);}, reloadDelay);
      })
      .fail(function(xhr, status, error) {
        loadDataLocal();
      });
    }
  }
  /* END DATA FUNCTIONS */
  
  /* START DIALOG FUNCTIONS */
  function lockUI() {
    $blockui.removeClass(hiddenClass);
  }
  
  function unlockUI() {
    $blockui.addClass(hiddenClass);
  }
  
  function showDialog($element) {
    if ($element && $element.length) {
      showCommentableFeedback($element[0]);
      currentData.$element = $element;
      currentData.elementID = $element.attr("id");
      currentData.canvasID = getCanvasID($element);
      $dialog.removeClass(hiddenClass);
      $dialog.find("textarea").focus();
      lockUI();
    }
  }
  
  function closeDialog() {
    unlockUI();
    $dialog.addClass(hiddenClass);
    resetForm($dialog);
    if(jimUtil.exists(currentData.$element)) {
      removeCommentableFeedback(currentData.$element[0]);  
    }
  }
  
  function saveDialog() {
    var text, $element, position, newComment;
    text = $dialog.find("textarea").val();
    if (text && text !== message) {
      $element = currentData.$element;
      position = $element.jimPosition();
      switch($element.jimGetType()) {
        case itemType.screen:
        case itemType.template:
          break;
        default:
          position.top -= 23;
          position.right -= 10;
          break;
      }
      newComment = {
        "author": currentData.author,
        "content": text,
        "canvasID": getCanvasID($element),
        "elementID": currentData.elementID,
        "canvasURL": getCanvasURL($element)
      };
      saveAction(newComment, $dialog.find("form.attachment"));
    } else {
      showError($dialog.find("textarea"), "", "The comment is empty.");
    }
  }
  /* END DIALOG FUNCTIONS */
    
  /* START COMMENT FUNCTIONS */
  function updateAttachmentFile(file) {
    var $file, value;
    if(jimUtil.exists(file)) {
      $file = jQuery(file);
      value = $file.val();
      if(value.length > 0) {
        $file.siblings(".filename").html((jQuery.browser.msie) ? value.substring(value.lastIndexOf("\\") + 1, value.length) : value);
      }
    }
  }
  
  function getCommentableFeedbackTarget(source) {
    var target = source;
    if(target.shapewrapper){
        target = target.shapewrapper;
    }
    return target;
  }
  
  function showCommentableFeedback(source){
      var target = getCommentableFeedbackTarget(source);
      jQuery(target).addClass(currentComponentClass);
  }
  
  function removeCommentableFeedback(source){
      var target = getCommentableFeedbackTarget(source);
      jQuery(target).removeClass(currentComponentClass);
  }
  
  function replyComment($root) {
    var $textarea = $root.removeClass(closedClass).children(".replier").hide().fadeIn(500).find("textarea");
    /* TODO: scroll required? $grid.animate({"scrollTop": $textarea.position().top + 20}, 0, function() { $textarea.trigger("focusin").focus(); }); */
    $textarea.trigger("focusin").focus();
  }
  
  function editComment($comment) {
    $comment.find(".editormode textarea").val($comment.find(".viewmode .text").text()).autoGrow().focus().end().addClass("editor");
  }
  
  function deleteComment($comment) {
    var message = ($comment.children("#code").val() === $comment.parents(".root").children("#parentCode").val()) ? "Delete all?" : "Delete?";
    showFeedback($comment.find(".actions:visible"), message, jimUtil.createCallback(deleteAction, {"args": [$comment], "scope": this}));
  }
  
  function cancelComment($editor) {
    var $root = $editor.parents(".root");
    resetForm($editor);
    $editor.removeClass("editor");
    if($editor.hasClass("replier")) {
      $editor.hide();
    }
    if($root.length && $root.find(".replies .comment").length === 0) {
      $root.addClass(closedClass);
    }
  }
  
  function saveComment($comment) {
    var text, $root, newComment;
    text = $comment.find("textarea:visible").val();
    if (text && text !== message) {
      $root = $comment.closest(".root");
      newComment = {
        "author": currentData.author,
        "content": text,
        "canvasID": $root.children("input#canvasID").val(),
        "elementID": $root.children("input#elementID").val(),
        "canvasURL": $root.children("input#canvasURL").val(),
        "parentCode": $root.children("input#parentCode").val(),
        "code": $comment.children("input#code").val()
      };
      saveAction(newComment, $comment.find("form.attachment"));
    } else {
      showError($comment.find("textarea:visible"), "", "Your comment is empty.");
    }
  }
  
  function markReadCommentRemote($comment) {
    var code = $comment.find("input#parentCode").val();
    if (code) {
      jQuery.ajax({
        "type": "POST",
        "url": "markAsRead.action",
        "data": {"code": code},
        "dataType": "json"
      })
      .done(function(json, status, xhr) {
        if (json && json.result) {
          if (json.result === "success") {
            updateIsRead($comment, true);
            updateComments(json.data.comments);
          } else if (json.result === "error") {
            
          } else if (json.result === "not-allowed") {
            
          }
        } else {
          
        }
      })
      .fail(function(xhr, status, error) {
        /* TODO */
      });
    }
  }
  
  function getAttachmentFileRemote(code) {
    if (code) {
      window.open("getCommentFile.action?code=" + code);
    }
  }
  
  function saveAction(newComment, $form) {
    var fromDialog, $errorElement, isEdit, code, $comment, $root;
    fromDialog = ($form.parents("#dialog").length) ? true : false;
    $errorElement = (fromDialog) ? $dialog.next() : $form.parents(".editor").find("textarea:visible");
    
    $form.ajaxSubmit({
      "type": "POST",
      "url": "saveComment.action",
      "data": newComment,
      "dataType": "json",
      "iframe":"true",
      "beforeSubmit": function() {
        lockUI();
      },
      "success": function(json, status, xhr) {
        if (json && json.result) {
          if (json.result === "success") {
            updateComments(json.data.comments);
            
            isEdit = (newComment.code) ? true : false;
            code = (isEdit) ? newComment.code : json.data.code;
            
            if (fromDialog) {
              closeDialog();
            } else {
              unlockUI();
              if (isEdit) {
                newComment.author = json.data.author;
                newComment.date = json.data.date;
                newComment.fileName = $form.children("input[type='file']").val();
                $comment = $form.parents(".comment");
                $comment.replaceWith(lookUpTemplate(commentTemplate)(newComment));
              } else {
                cancelComment($form.closest(".editor, .replier"));
              }
            }
          } else if (json.result === "error") {
            if(!fromDialog) { unlockUI(); }
            showError($errorElement, "", "Communication with the server failed.");
          } else if (json.result === "not-allowed") {
            if(!fromDialog) { unlockUI(); }
            showError($errorElement, "", "Your are not authorized to add comments.");
          } else if (json.result === "error-filesize") {
            if(!fromDialog) { unlockUI(); }
            showError($errorElement, "", "The attached file exceeds the limit of 1MB.");
          }
        } else {
          if(!fromDialog) { unlockUI(); }
          showError($errorElement, "", "Communication with the server failed.");
        }
      },
      "error": function(xhr, status, error) {
        if(!fromDialog) { unlockUI(); }
        showError($errorElement, "", "Communication with the server failed.");
      }
    });
  }
  
  function deleteAction($comment) {
    var code, $root;
    code = $comment.children("input#code").val();
    if (code) {
      jQuery.ajax({
        "type": "POST",
        "url": "deleteComment.action",
        "data": {"code": code},
        "dataType": "json"
      })
      .done(function(json, status, xhr) {
        if (json && json.result) {
          if (json.result === "success") {
            updateComments(json.data.comments);
            $root = $comment.parents(".root");
            if(code === $root.children("#parentCode").val()) {
              $root.remove();
            } else {
              $comment.remove();
              updateNumReplies($root);
              if($root.find(".replies .comment").length === 0) {
                $root.addClass(closedClass);
              }
            }
          } else if (json.result === "error") {
            showError($comment, "", "The comment was not deleted due to an error");
          } else if (json.result === "not-allowed") {
            showError($comment, "", "You are not entitled to delete this comment");
          }
        } else {
          showError($comment, "", "Connection to server failed.");
        }
      })
      .fail(function(xhr, status, error) {
        showError($comment, "", "Connection to server failed.");
      });
    }
  }
  /* END COMMENT FUNCTIONS */
  
  /* START MESSAGE FUNCTIONS */
  function showFeedback($insertionPoint, title, okCallback, cancelCallback) {
    var $firer, $message;
    jQuery(".message.feedback").remove();
    jQuery(lookUpTemplate(messageTemplate)({"type": "feedback", "text": title}))
      .insertBefore($insertionPoint)
      .show("drop", {"direction": "left"}, 250)
      .click(function(event) {
        event.stopPropagation();
        $firer = jQuery(event.target || event.srcElement);
        if($firer.hasClass("ok") && okCallback) {
          okCallback();
        } else if ($firer.hasClass("cancel") && cancelCallback) {
          cancelCallback();
        }
        $message = jQuery(this);
        $message.removeAttr("style").fadeOut("","",function(){$message.remove();});
      });
  }
  
  function showError($insertionPoint, title, text) {
    var $message;
    jQuery(".message.error").remove();
    jQuery(lookUpTemplate(messageTemplate)({"type": "error", "title": title, "text": text}))
    .insertBefore($insertionPoint)
    .show("drop", {"direction": "left"}, 250, function() { $dialog.css("height", "auto"); })
    .click(function(event) {
      event.stopPropagation();
      $message = jQuery(this);
      $message.removeAttr("style").fadeOut("","",function(){ $message.remove(); $dialog.css("height", "auto"); });
    });
  }
  /* END MESSAGE FUNCTIONS */
  
  /* START ANNOTATION FUNCTIONS */
  function getCanvasURL($element) {
    var canvasURL;
    switch($element.attr("id").substring(0,2)) {
      case "s-":
        canvasURL = "screens/" + jQuery(".screen:first").attr("id").substring(2);
        break;
      case "t-":
        canvasURL = "templates/" + jQuery(".template:first").attr("id").substring(2);
        break;
      case "m-":
        canvasURL = "masters/" + $element.closest(".master").attr("id").substring(2);
        break;
    }
    return canvasURL;
  }

  
  function resetForm($element) {
    var $editor, $textarea;
    $editor = ($element.closest("#dialog").length) ? $element.closest("#dialog") : $element.closest(".editor, .replier");
    $textarea = $editor.find("textarea.annotation:first"); 
    $textarea.val(message).attr("rows", $textarea[0].rowsDefault);
    $editor.find("span.filename").html("<a class='action'>Attach file (&lt; 1MB)</a>");
    $editor.find("input.file").val("");
    $editor.find(".message").remove();
  }
  
  function isExecutable() {
    var $textarea = $grid.find("textarea:visible");
    if($textarea.length) {
      /*
       * TODO: scroll required?
       *      $grid.animate({"scrollTop": $textarea.position().top + 20}, 0, function() {
       *        $textarea.trigger("focusin").focus().next().find(".save .action, .cancel .action").animate({"font-size": "11px"}, 200).animate({"font-size": "9px"}, 200);
       *      });
       */
      $textarea.trigger("focusin").focus().next().find(".save .action, .cancel .action").animate({"font-size": "11px"}, 200).animate({"font-size": "9px"}, 200);
      return false;
    } else {
      return true;
    }
  }
  
  function activateRemote() {
    activateLocal();
    $navigationBtn.removeClass(activeClass);
    $commentBtn.addClass(activeClass);
    $commentpanel.removeClass(hiddenClass);
    deselectCurrentComponent();
    $simulation.addClass(addCommentClass);
  }
  
  function deactivateRemote() {
    deactivateLocal();
    $commentpanel.addClass(hiddenClass);
    $simulation.removeClass(addCommentClass);
  }
  
  function addEventListenerRemote() {
    $comments.click(function(event) {
      var $firer, firer, $root;
      $firer = jQuery(event.target || event.srcElement).closest(".firer");
      $root = $firer.closest(".root");
      firer = $firer[0];
      if ($firer.hasClass("save")) {
        saveComment($firer.closest(".editor, .replier"));
        return false;
      } else if ($firer.hasClass("cancel")) {
        cancelComment($firer.closest(".editor, .replier"));
        return false;
      } else if($firer.is("textarea")) {
        return false;
      } else if ($firer.is(".attachment")) {
        /* ignore */
      } else if(isExecutable($root)) { 
        if ($firer.hasClass("reply")) {
          replyComment($root);
          return false;
        } else if ($firer.hasClass("edit")) {
          editComment($firer.closest(".comment"));
          return false;
        } else if ($firer.hasClass("delete")) {
          deleteComment($firer.closest(".comment"));
          return false;
        }
      }
    });
    
    
    $dialog
      .resizable({
        "handles": "se",
        "minHeight": 130,
        "minWidth": 185,
        "alsoResize": $dialog.find("textarea.annotation")
      })
      .draggable({
        "containment": "parent",
        "cursor": "move"
      })
      .bind("click", function(event) {
        switch((event.target || event.srcElement).id) {
          case "dialog-close":
          case "dialog-cancel":
            closeDialog();
            break;
          case "dialog-save":
            saveDialog();
            break;
        }
      })
      .find("textarea.annotation").autoGrow();
    
    jQuery("html").keyup(function(event) {
      if(event.keyCode === 27) {
        closeDialog();
      }
    });
    
    $textareaAnnotation
      .live("focusin", function(event) {
        var $textarea = jQuery(this);
        if($textarea.val() === message) {
          $textarea.val("");
        }
      })
      .live("focusout", function(event) {
        var $textarea = jQuery(this);
        if($textarea.val() === "") {
          resetForm($textarea);
        }
      });
    
    $simulation
      .on("mouseenter", ".add-comment .commentable", function(event) {
        showCommentableFeedback(this);
        return false;
      })
      .on("mouseleave", ".add-comment .commentable", function(event) {
        if(!$dialog.is(":visible")) {
          removeCommentableFeedback(this);
        }
        return false;
      })
      .on("click", ".add-comment .commentable", function(event) {
        showDialog(jQuery(this));
        return false;
      })
      .bind("canvasunload", function() {
        deactivate();
      });      
  }
  /* END ANNOTATION FUNCTIONS */
  /************************ END REMOTE METHOD DEFINITION ************************/
  
  /****************************** START ANNOTATION ******************************/
  function markReadComment($root) {
    if(isRemote) {
      markReadCommentRemote($root);
    } else {
      markReadCommentLocal($root);
    }
  }
  
  function getAttachmentFile(code, filename) {
    if(isRemote) {
      getAttachmentFileRemote(code);
    } else {
      getAttachmentFileLocal(filename);
    }
  }
  
  function activate() {
    if(isRemote) {
      activateRemote();
    } else {
      activateLocal();
    }
  }
  
  function deactivate() {
    if(isRemote) {
      deactivateRemote();
    } else {
      deactivateLocal();
    }
  }
  /******************************* END ANNOTATION *******************************/
  
  /* START EXPOSE ANNOTATION */
  window.annotation = {
    "isActive": isActive,
    "load": function() {
      if(isRemote) {
        reloadCounter = reloadCounterLimit;
      }
      setSimulationElements();
      deselectCurrentComponent();
      filterGrid("screen");
      if (isActive()) {
        $commentpanel.removeClass(hiddenClass);
      }
    },
    "unload": function() {
      if(isRemote) {
        closeDialog();
      }
    },
    "toHTML": function(value) {
      return jimUtil.toHTML(value);
    },
    "hasPermission": function(author) {
      return author && currentData.author && author === currentData.author;
    },
    "getCurrentAuthor": function() {
      return currentData.author || "";
    },
    "render": function(data, template) {
      return lookUpTemplate(template)(data);
    },
    "updateAttachmentFile": updateAttachmentFile,
    "getAttachmentFile": getAttachmentFile
  };
  /* END EXPOSE ANNOTATION */
  
  /* START MAIN */
//  addEventListenerLocal();
//  loadDataRemote(false);
  var jimComments = {
	"load" : function(){
		addEventListenerLocal();
		loadDataRemote(false); 
	}	  
		  
  }
  window.jimComments = jimComments;
  
  
  /* END MAIN */
  
/* JavaScript Inheritance Pattern */
  /*
   * after: Bound Inheritance (ThinWire Ajax Framework) from: Ajax Patterns - JavaScript Inheritance
   * http://ajaxpatterns.org/Javascript_Inheritance
   * http://joshgertzen.com/object-oriented-super-class-method-calling-with-javascript
   */
//  function Class() { }
//  Class.prototype.construct = function() {};
//  Class.extend = function(def) {
//    var classDef, proto, superClass;
//    classDef = function() {
//      if (arguments[0] !== Class) { this.construct.apply(this, arguments); }
//    };
//    proto = new this(Class);
//    superClass = this.prototype;
//    for (var n in def) {
//      var item = def[n];
//      if (item instanceof Function) { item.parent = superClass; }
//      proto[n] = item;
//    }
//    classDef.prototype = proto;
//    classDef.extend = this.extend;  //Give this new class the same static extend method
//    return classDef;
//  };
//  window.Class = Class; // expose to global namespace
  
})(window);
