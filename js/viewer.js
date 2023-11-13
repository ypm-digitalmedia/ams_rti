// IMPORTANT MODIFICATIONS TO VENDOR FILE
// multires.js --> multires_AM.js
//
// ------------------------------------------------------------------------------------------
// 
// line 339 (end of createRtiViewer() function)
// add -> 'return multiResRTI;'
//
// purpose:  to instantiate multiple copies of RTIviewer on same webpage and access them individually, a variable can be created, var x = createRtiViewer(a,b,c,d);
//
// ------------------------------------------------------------------------------------------
//
// lines ~54-105 (inside createRtiViewer() function)
// comment out -> aNode, toolbar, divHelp
//
// purpose: no outbound links in application.  application will be locked in setMode(1) (lights on).  pan/zoom will be handled by touch events.  fullscreen not needed.
// 
// ------------------------------------------------------------------------------------------

var rtiFolder = "";
var folderRoot = "rti/";
var thumbsRoot = folderRoot + "_thumbs/";
var rtiDataContainer = "main";
var rtiDataWidth = 1200;
var rtiDataHeight = 800;

var objects = {};
var whichObject;
var siblings = [];

var terms = {
    "r": "reverse",
    "o": "obverse",
    "e": "multiple"
};

$(document).ready(function(){ 

    // parse folders
    for(var a=0; a<folders.length; a++){
        var f = folders[a];
        var item = "";
        var type = "x";
        if(f.search("_") != -1) {
            item = f.split("_")[0];
            type = f.split("_")[1];
        } else {
            item = f;
        }

        if( !objects.hasOwnProperty(item) ) {
            objects[item] = [];
        }
        objects[item].push(f);
        
    }
	
	
	
	// create RTI presentation
	rtiFolder = getQs("obj");
	if( rtiFolder === null ) {
		console.error("missing query string.");
	} else if(folders.indexOf(rtiFolder) == -1 ) {
		console.error("RTI index not found in master list.");
	} else {
		// data folder exists

		var type = "";
		if( rtiFolder.indexOf("_r") > -1 ) {
			type = " (reverse)";
		} else if( rtiFolder.indexOf("_o") > -1 ) {
			type = " (obverse)";
		} else if( rtiFolder.indexOf("_e") > -1 ) {
			type = " (multiple)";
		}
		// load the RTI presentation
		rtiDataPath = folderRoot + rtiFolder;
		var rti = createRtiViewer(rtiDataContainer, rtiDataPath, rtiDataWidth, rtiDataHeight);
		rti.setMode(1);

		// iterate through objects list and find siblings
		whichObject = _.findKey(objects,function(o) { return o.indexOf(rtiFolder) > -1 });
		console.log(objects[whichObject]);
		if( objects[whichObject].length > 1 ) {
			siblings = _.filter(objects[whichObject], function(k) { return k!= rtiFolder; });
			if( siblings.length > 0 ) {
				makeSiblingThumbnails();
			}
		}

		$("#objNum").html(whichObject + type);
	}
});		

function makeSiblingThumbnails() {

	var extrasHtml =  '<div id="extras" class="extras">';
	
	
	for( var s=0; s<siblings.length; s++ ) {
		console.log("making sibling: " + siblings[s]);

		var type = "";
		if( siblings[s].indexOf("_r") > -1 ) {
			type = "Reverse view";
		} else if( siblings[s].indexOf("_o") > -1 ) {
			type = "Obverse view";
		} else if( siblings[s].indexOf("_e") > -1 ) {
			type = "Multiple views";
		}

		extrasHtml += '	 <div class="extra">';
		extrasHtml += '    <a href="viewer.html?obj=' + siblings[s] + '" title="' + type + '">';
		extrasHtml += '      <img src="' + thumbsRoot + siblings[s] + '.jpg" />';
		extrasHtml += '    </a>';
		extrasHtml += '  </div>';
	}

	extrasHtml += '	 <div class="extra current">';
		extrasHtml += '      <img src="' + thumbsRoot + rtiFolder + '.jpg" title="Current view" />';
		extrasHtml += '  </div>';

	extrasHtml += '</div>';
	$("#main_div").append(extrasHtml);
}

function getQs(param) {
    const url = new URL(window.location);
    const searchParams = url.searchParams;
    console.log(searchParams);
    return searchParams.get(param);
  }