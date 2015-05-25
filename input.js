// MyKirby Teacher Input Client-Side JavaScript
// Written by Nick Pleatsikas

// HTML Forms
var form_ance = '<form class="form-inline" id="announcement">\
					<div class="form-group">\
						<input type="text" class="form-control" name="content" placeholder="Announcment">\
				</form>'
var form_hwrk = '<form id="homework" class="form-inline" role="form">\
  					<div class="form-group">\
    					<input type="text" class="form-control" name="content" placeholder="Assignment">\
  					</div>\
					<div class="form-group">\
    					<input type="text" class="form-control" name="date" id="datepicker" placeholder="Date" readonly>\
  					</div>\
  				</form>'
var form_file = '<form id="file" class="form-inline">\
					<div class="form-group">\
						<input type="text" class="form-control" name="content" placeholder="Description">\
				</form>\
				<p>Uploading Files Coming Soon...</p>'
var form_cal = '<form id="calendar" class="form-inline" role="form">\
  					<div class="form-group">\
    					<input type="text" class="form-control" name="content" placeholder="Event">\
  					</div>\
					<div class="form-group">\
    					<input type="text" class="form-control" name="date" id="datepicker" placeholder="Date" readonly>\
  					</div>\
  				</form>'
var form_tstproj = '<form id="homework" class="form-inline" role="form">\
	  					<div class="form-group">\
	    					<input type="text" class="form-control" name="content" placeholder="Test/Project">\
	  					</div>\
						<div class="form-group">\
	    					<input type="text" class="form-control" name="date" id="datepicker" placeholder="Date" readonly>\
	  					</div>\
  					</form>'

// jQuery
$(document).ready(function() {
	$(".multiselect").multiselect({
		numberDisplayed: 1,
		includeSelectAllOption: true
	});
	$("#dropDown").change(function() {
    	$("#dropDown option:selected").each(function() {
    		var selectorValue = $(this).val();
    		$(".inputs").html(inputCast(selectorValue));
    		$("#datepicker").datepicker();
    	});
  	}).change();
  	$("#button").click(function() {
  		var classPeriods = processArray($(".multiselect").val());
  		var content = [$('input[name=content]').val(), $('input[name=date]').val(), classPeriods]
  		var dataOuput = isComplete($('form').attr('id'), content);
  		console.log(dataOuput);
  	});
});

// JavaScript Functions

// inputCast : str -> str
function inputCast(str) {
	if (str == "announcement") {
		return form_ance;
	} else if (str == "calendar") {
		return form_cal;
	} else if (str == "file") {
		return form_file;
	} else if (str == "homework") {
		return form_hwrk;
	} else if (str == "test/proj") {
		return form_tstproj;
	} else {
		// I have this here in case someone manages to send bad data/sanity.
		console.error("Invalid Input! :(");
	}
}

// JSONReturn : str array -> object
function JSONReturn(id, comp) {
	return JSON.stringify({"type": id, "content": comp[0], "date": comp[1], "periods": comp[2]});
}

// isComplete : str array -> JSON, alert
function isComplete(id, comp) {
	if (checkComp(comp)) {
		alert("Please complete the specified forms.")
	} else if ((id == "file" || "announcement") && (comp[0].length > 0)) {
		return JSONReturn(id, comp);
	} else if ((comp[0].length > 0) && (comp[1].length > 0)) {
		return JSONReturn(id, comp);
	} else {
		alert("Please complete the specified forms.")
	}
}

// processArray : array -> string
function processArray(ary) {
	if (ary === null) {
		return [];
	} else if (ary.indexOf("multiselect-all") === 1) {
		return ary.splice(1);
	} else {
		return ary;
	}
}

// checkComp : ary -> bool
function checkComp(ary) {
	if (ary.length === 2) {
		return (!(ary[1].length > 0));
	} else{
		return (!(ary[2].length > 0));
	}
}