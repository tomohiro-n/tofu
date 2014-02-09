jQuery("#simulation")
  .on("click", ".s-5e0be5bc-b4b9-4082-b311-e2c839180a80 .click", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is(".s-Row_cell_2")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 .s-Row_cell_2 .verticalalign": {
                      "attributes": {
                        "vertical-align": "middle"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 .s-Row_cell_2": {
                      "attributes": {
                        "background-color": "#D7F3F6",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 .s-Row_cell_2": {
                      "attributes-ie": {
                        "-pie-background": "#D7F3F6",
                        "-pie-poll": "false",
                        "position": "relative"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is(".s-Image_139")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimSetValue",
                  "parameter": {
                    "target": ".s-Image_139",
                    "value": ""
                  }
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Button_7")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Button_7": {
                      "attributes": {
                        "background-color": "#D2322D",
                        "background-image": "none",
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#D2322D",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#D2322D",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#D2322D",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#D2322D",
                        "border-radius": "4px 4px 4px 4px",
                        "padding-top": "2px",
                        "padding-right": "2px",
                        "padding-bottom": "2px",
                        "padding-left": "16px"
                      },
                      "expressions": {
                        "width": "Math.max(143 - 1 - 1 - 16 - 2, 0) + 'px'",
                        "height": "Math.max(29 - 1 - 1 - 2 - 2, 0) + 'px'"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Button_7": {
                      "attributes-ie": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#D2322D",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#D2322D",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#D2322D",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#D2322D",
                        "border-radius": "4px 4px 4px 4px",
                        "padding-top": "2px",
                        "padding-right": "2px",
                        "padding-bottom": "2px",
                        "padding-left": "16px",
                        "-pie-background": "#D2322D",
                        "-pie-poll": "false"
                      },
                      "expressions-ie": {
                        "width": "Math.max(143 - 1 - 1 - 16 - 2, 0) + 'px'",
                        "height": "Math.max(29 - 1 - 1 - 2 - 2, 0) + 'px'"
                      }
                    }
                  } ]
                },
                {
                  "action": "jimShow",
                  "parameter": {
                    "target": "#s-Group_25"
                  }
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
    jFirer.parents("tr.datarow").trigger("click");
  })
  .on("change", ".s-5e0be5bc-b4b9-4082-b311-e2c839180a80 .change", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Category_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Rectangle_7": {
                      "attributes": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#CCCCCC",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#CCCCCC",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#CCCCCC",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#CCCCCC",
                        "border-radius": "2px 2px 2px 2px",
                        "padding-top": "1px",
                        "padding-right": "1px",
                        "padding-bottom": "1px",
                        "padding-left": "1px"
                      },
                      "expressions": {
                        "width": "Math.max(101 - 1 - 1 - 1 - 1, 0) + 'px'",
                        "height": "Math.max(20 - 1 - 1 - 1 - 1, 0) + 'px'"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Rectangle_7": {
                      "attributes-ie": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#CCCCCC",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#CCCCCC",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#CCCCCC",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#CCCCCC",
                        "border-radius": "2px 2px 2px 2px",
                        "padding-top": "1px",
                        "padding-right": "1px",
                        "padding-bottom": "1px",
                        "padding-left": "1px"
                      },
                      "expressions-ie": {
                        "width": "Math.max(101 - 1 - 1 - 1 - 1, 0) + 'px'",
                        "height": "Math.max(20 - 1 - 1 - 1 - 1, 0) + 'px'"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  })
  .on("focusin", ".s-5e0be5bc-b4b9-4082-b311-e2c839180a80 .focusin", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Category_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Rectangle_7": {
                      "attributes": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#74B9EF",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#74B9EF",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#74B9EF",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#74B9EF",
                        "border-radius": "2px 2px 2px 2px",
                        "padding-top": "1px",
                        "padding-right": "1px",
                        "padding-bottom": "1px",
                        "padding-left": "1px"
                      },
                      "expressions": {
                        "width": "Math.max(101 - 1 - 1 - 1 - 1, 0) + 'px'",
                        "height": "Math.max(20 - 1 - 1 - 1 - 1, 0) + 'px'"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Rectangle_7": {
                      "attributes-ie": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#74B9EF",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#74B9EF",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#74B9EF",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#74B9EF",
                        "border-radius": "2px 2px 2px 2px",
                        "padding-top": "1px",
                        "padding-right": "1px",
                        "padding-bottom": "1px",
                        "padding-left": "1px"
                      },
                      "expressions-ie": {
                        "width": "Math.max(101 - 1 - 1 - 1 - 1, 0) + 'px'",
                        "height": "Math.max(20 - 1 - 1 - 1 - 1, 0) + 'px'"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Input_5")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Rectangle_8": {
                      "attributes": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#74B9EF",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#74B9EF",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#74B9EF",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#74B9EF",
                        "border-radius": "15px 15px 15px 15px",
                        "padding-top": "8px",
                        "padding-right": "8px",
                        "padding-bottom": "8px",
                        "padding-left": "8px"
                      },
                      "expressions": {
                        "width": "Math.max(486 - 1 - 1 - 8 - 8, 0) + 'px'",
                        "height": "Math.max(29 - 1 - 1 - 8 - 8, 0) + 'px'"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Rectangle_8": {
                      "attributes-ie": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#74B9EF",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#74B9EF",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#74B9EF",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#74B9EF",
                        "border-radius": "15px 15px 15px 15px",
                        "padding-top": "8px",
                        "padding-right": "8px",
                        "padding-bottom": "8px",
                        "padding-left": "8px"
                      },
                      "expressions-ie": {
                        "width": "Math.max(486 - 1 - 1 - 8 - 8, 0) + 'px'",
                        "height": "Math.max(29 - 1 - 1 - 8 - 8, 0) + 'px'"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Input_23")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_23": {
                      "attributes": {
                        "background-color": "#0087CB",
                        "background-image#moz": "-moz-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#wk": "-webkit-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#old": "-webkit-gradient(linear,left top,left bottom,color-stop(0%,#0087CB), color-stop(100%,#006CA3))",
                        "background-image#op": "-o-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#draft": "linear-gradient(to bottom,#0087CB,#006CA3)"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_23 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "line-height": "11pt"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_23 input": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Arial",
                        "font-size": "11pt",
                        "font-style": "normal",
                        "font-weight": "400"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_23": {
                      "attributes-ie": {
                        "-pie-background": "linear-gradient(to bottom,#0087CB,#006CA3)",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Input_24")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_24": {
                      "attributes": {
                        "background-color": "#0087CB",
                        "background-image#moz": "-moz-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#wk": "-webkit-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#old": "-webkit-gradient(linear,left top,left bottom,color-stop(0%,#0087CB), color-stop(100%,#006CA3))",
                        "background-image#op": "-o-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#draft": "linear-gradient(to bottom,#0087CB,#006CA3)"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_24 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "line-height": "11pt"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_24 input": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Arial",
                        "font-size": "11pt",
                        "font-style": "normal",
                        "font-weight": "400"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_24": {
                      "attributes-ie": {
                        "-pie-background": "linear-gradient(to bottom,#0087CB,#006CA3)",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Input_25")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_25": {
                      "attributes": {
                        "background-color": "#0087CB",
                        "background-image#moz": "-moz-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#wk": "-webkit-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#old": "-webkit-gradient(linear,left top,left bottom,color-stop(0%,#0087CB), color-stop(100%,#006CA3))",
                        "background-image#op": "-o-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#draft": "linear-gradient(to bottom,#0087CB,#006CA3)"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_25 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "line-height": "11pt"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_25 input": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Arial",
                        "font-size": "11pt",
                        "font-style": "normal",
                        "font-weight": "400"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_25": {
                      "attributes-ie": {
                        "-pie-background": "linear-gradient(to bottom,#0087CB,#006CA3)",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Input_26")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_26": {
                      "attributes": {
                        "background-color": "#0087CB",
                        "background-image#moz": "-moz-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#wk": "-webkit-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#old": "-webkit-gradient(linear,left top,left bottom,color-stop(0%,#0087CB), color-stop(100%,#006CA3))",
                        "background-image#op": "-o-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#draft": "linear-gradient(to bottom,#0087CB,#006CA3)"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_26 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "line-height": "11pt"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_26 input": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Arial",
                        "font-size": "11pt",
                        "font-style": "normal",
                        "font-weight": "400"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_26": {
                      "attributes-ie": {
                        "-pie-background": "linear-gradient(to bottom,#0087CB,#006CA3)",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  })
  .on("focusout", ".s-5e0be5bc-b4b9-4082-b311-e2c839180a80 .focusout", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Input_5")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Rectangle_8": {
                      "attributes": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#CCCCCC",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#CCCCCC",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#CCCCCC",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#CCCCCC",
                        "border-radius": "15px 15px 15px 15px",
                        "padding-top": "8px",
                        "padding-right": "8px",
                        "padding-bottom": "8px",
                        "padding-left": "8px"
                      },
                      "expressions": {
                        "width": "Math.max(486 - 1 - 1 - 8 - 8, 0) + 'px'",
                        "height": "Math.max(29 - 1 - 1 - 8 - 8, 0) + 'px'"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Rectangle_8": {
                      "attributes-ie": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#CCCCCC",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#CCCCCC",
                        "border-bottom-width": "1px",
                        "border-bottom-style": "solid",
                        "border-bottom-color": "#CCCCCC",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#CCCCCC",
                        "border-radius": "15px 15px 15px 15px",
                        "padding-top": "8px",
                        "padding-right": "8px",
                        "padding-bottom": "8px",
                        "padding-left": "8px"
                      },
                      "expressions-ie": {
                        "width": "Math.max(486 - 1 - 1 - 8 - 8, 0) + 'px'",
                        "height": "Math.max(29 - 1 - 1 - 8 - 8, 0) + 'px'"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Input_23")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_23": {
                      "attributes": {
                        "background-color": "#FFFFFF",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_23 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "line-height": "11pt"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_23 input": {
                      "attributes": {
                        "color": "#030303",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Arial",
                        "font-size": "11pt",
                        "font-style": "normal",
                        "font-weight": "400"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_23": {
                      "attributes-ie": {
                        "-pie-background": "#FFFFFF",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Input_24")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_24": {
                      "attributes": {
                        "background-color": "#FFFFFF",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_24 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "line-height": "11pt"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_24 input": {
                      "attributes": {
                        "color": "#030303",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Arial",
                        "font-size": "11pt",
                        "font-style": "normal",
                        "font-weight": "400"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_24": {
                      "attributes-ie": {
                        "-pie-background": "#FFFFFF",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Input_25")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_25": {
                      "attributes": {
                        "background-color": "#FFFFFF",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_25 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "line-height": "11pt"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_25 input": {
                      "attributes": {
                        "color": "#030303",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Arial",
                        "font-size": "11pt",
                        "font-style": "normal",
                        "font-weight": "400"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_25": {
                      "attributes-ie": {
                        "-pie-background": "#FFFFFF",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Input_26")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_26": {
                      "attributes": {
                        "background-color": "#FFFFFF",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_26 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "line-height": "11pt"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_26 input": {
                      "attributes": {
                        "color": "#030303",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Arial",
                        "font-size": "11pt",
                        "font-style": "normal",
                        "font-weight": "400"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_26": {
                      "attributes-ie": {
                        "-pie-background": "#FFFFFF",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  })
  .on("mouseenter dragenter", ".s-5e0be5bc-b4b9-4082-b311-e2c839180a80 .mouseenter", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getDirectEventFirer(this);
    if(jFirer.is("#s-Input_23") && jFirer.has(event.relatedTarget).length === 0) {
      event.backupState = true;
      event.target = jFirer;
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_23": {
                      "attributes": {
                        "background-color": "#0087CB",
                        "background-image#moz": "-moz-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#wk": "-webkit-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#old": "-webkit-gradient(linear,left top,left bottom,color-stop(0%,#0087CB), color-stop(100%,#006CA3))",
                        "background-image#op": "-o-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#draft": "linear-gradient(to bottom,#0087CB,#006CA3)"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_23 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "line-height": "11pt"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_23 input": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Arial",
                        "font-size": "11pt",
                        "font-style": "normal",
                        "font-weight": "400"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_23": {
                      "attributes-ie": {
                        "-pie-background": "linear-gradient(to bottom,#0087CB,#006CA3)",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Input_24") && jFirer.has(event.relatedTarget).length === 0) {
      event.backupState = true;
      event.target = jFirer;
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_24": {
                      "attributes": {
                        "background-color": "#0087CB",
                        "background-image#moz": "-moz-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#wk": "-webkit-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#old": "-webkit-gradient(linear,left top,left bottom,color-stop(0%,#0087CB), color-stop(100%,#006CA3))",
                        "background-image#op": "-o-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#draft": "linear-gradient(to bottom,#0087CB,#006CA3)"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_24 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "line-height": "11pt"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_24 input": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Arial",
                        "font-size": "11pt",
                        "font-style": "normal",
                        "font-weight": "400"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_24": {
                      "attributes-ie": {
                        "-pie-background": "linear-gradient(to bottom,#0087CB,#006CA3)",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Input_25") && jFirer.has(event.relatedTarget).length === 0) {
      event.backupState = true;
      event.target = jFirer;
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_25": {
                      "attributes": {
                        "background-color": "#0087CB",
                        "background-image#moz": "-moz-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#wk": "-webkit-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#old": "-webkit-gradient(linear,left top,left bottom,color-stop(0%,#0087CB), color-stop(100%,#006CA3))",
                        "background-image#op": "-o-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#draft": "linear-gradient(to bottom,#0087CB,#006CA3)"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_25 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "line-height": "11pt"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_25 input": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Arial",
                        "font-size": "11pt",
                        "font-style": "normal",
                        "font-weight": "400"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_25": {
                      "attributes-ie": {
                        "-pie-background": "linear-gradient(to bottom,#0087CB,#006CA3)",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Input_26") && jFirer.has(event.relatedTarget).length === 0) {
      event.backupState = true;
      event.target = jFirer;
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_26": {
                      "attributes": {
                        "background-color": "#0087CB",
                        "background-image#moz": "-moz-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#wk": "-webkit-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#old": "-webkit-gradient(linear,left top,left bottom,color-stop(0%,#0087CB), color-stop(100%,#006CA3))",
                        "background-image#op": "-o-linear-gradient(top,#0087CB,#006CA3)",
                        "background-image#draft": "linear-gradient(to bottom,#0087CB,#006CA3)"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_26 .valign": {
                      "attributes": {
                        "vertical-align": "middle",
                        "line-height": "11pt"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_26 input": {
                      "attributes": {
                        "color": "#FFFFFF",
                        "text-align": "left",
                        "text-decoration": "none",
                        "font-family": "Arial",
                        "font-size": "11pt",
                        "font-style": "normal",
                        "font-weight": "400"
                      }
                    }
                  },{
                    "#s-5e0be5bc-b4b9-4082-b311-e2c839180a80 #s-Input_26": {
                      "attributes-ie": {
                        "-pie-background": "linear-gradient(to bottom,#0087CB,#006CA3)",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                }
              ]
            }
          ]
        }
      ];
      jEvent.launchCases(cases);
    }
  })
  .on("mouseleave dragleave", ".s-5e0be5bc-b4b9-4082-b311-e2c839180a80 .mouseleave", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getDirectEventFirer(this);
    if(jFirer.is("#s-Input_23")) {
      jEvent.undoCases(jFirer);
    } else if(jFirer.is("#s-Input_24")) {
      jEvent.undoCases(jFirer);
    } else if(jFirer.is("#s-Input_25")) {
      jEvent.undoCases(jFirer);
    } else if(jFirer.is("#s-Input_26")) {
      jEvent.undoCases(jFirer);
    }
  });