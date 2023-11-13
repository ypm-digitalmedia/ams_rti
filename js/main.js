var idx = 0;


var rtiFolder = "";
var folderRoot = "rti/";
var thumbsRoot = folderRoot + "_thumbs/";

var objects = {};
var objectList = {};

var terms = {
    "r": "reverse",
    "o": "obverse",
    "e": "multiple"
};

$(document).ready(function() {

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


    // make thumnails
    // for(var a=0; a<folders.length; a++){
    //     makeThumbnail(folders[a],a);
    // }
    
    
    objects = sortObj(objects);

    for(var item in objects){
        makeThumbnail(item,idx);
        idx++;
    }
    objectList = sortObj(objectList);
    // console.log(objectList);


    $(".flip-button").click(function(e){
        e.preventDefault();
        $(this).closest(".flip-card-inner").eq(0).toggleClass("flip");
    });

    $(".flip-card-target").mouseover(function(e){
        e.preventDefault();
        $(this).find('.flip-buttons:first').css("opacity", 1);
        $(this).siblings().find('.flip-buttons:first').css("opacity", 1);
    });

    $(".flip-card-target").mouseout(function(e){
        e.preventDefault();
        $(this).find('.flip-buttons:first').css("opacity", 0);
        $(this).siblings().find('.flip-buttons:first').css("opacity", 0);
    });
    
    $(".flip-button").attr("title", "Flip over");

});



function makeThumbnail(item,i) {

    var views = objects[item];
    var len = views.length;

    
    
    // console.log(i);
    // console.log(views);
    
    var viewerUrl = "viewer.html?obj=" + views[0];
    var viewerUrl2 = "viewer.html?obj=" + views[1];

    var type1 = "";
    if( views[0].indexOf("_r") > -1 ) {
        type1 = " (reverse)";
    } else if( views[0].indexOf("_o") > -1 ) {
        type1 = " (obverse)";
    } else if( views[0].indexOf("_e") > -1 ) {
        type1 = " (multiple)";
    }

    if( len == 1 ) {
        var thumb = '<div class="col-lg-3 col-md-4 col-6" id="thumb'+i+'">';
        thumb += '  <div class="flip-card">';
        thumb += '    <div class="">';
        thumb += '      <div class="">';
        thumb += '        <a href="' + viewerUrl + '" class="d-block mb-4 h-100">';
        thumb += '          <img class="img-fluid img-thumbnail" src="'+ thumbsRoot + views[0] +'.jpg" title="'+ item + type1 +'" alt="'+ item +'">';
        thumb += '        </a>';
        thumb += '      </div>';
        thumb += '    </div>';
        thumb += '  </div>';
        thumb += '  <span class="card-title">' + item + '</span>';
        thumb += '</div>';
        
    } else if( len == 2 ) {

        var type2 = "";
        if( views[1].indexOf("_r") > -1 ) {
            type2 = " (reverse)";
        } else if( views[1].indexOf("_o") > -1 ) {
            type2 = " (obverse)";
        } else if( views[1].indexOf("_e") > -1 ) {
            type2 = " (multiple)";
        }

        objectList[item] = "";
        // console.log(views[v][0] + " - " + views[v][1]);
    var thumb = '<div class="thumb-cell col-lg-3 col-md-4 col-6" id="thumb'+i+'">';
        thumb += '      <div class="flip-card">';
        thumb += '         <div class="flip-card-inner">';
        thumb += '           <div class="flip-card-front flip-card-target">';
        thumb += '              <span class="flip-buttons">';
        thumb += '                  <a href="javascript:void(0)" class="flip-button float-start"><span class="badge bg-secondary"><i class="fas fa-arrows-alt-v"></i></span></a>';
        thumb += '                  <a href="javascript:void(0)" class="flip-button float-end"><span class="badge bg-secondary"><i class="fas fa-arrows-alt-v"></i></span></a>';
        thumb += '              </span>';
        thumb += '              <a href="'+viewerUrl+'" class="d-block mb-4 h-100">';
        thumb += '                <img class="img-fluid img-thumbnail img-flip" src="'+ thumbsRoot + views[0] +'.jpg" title="'+ item + type1 +'" alt="'+ item +'">';
        thumb += '              </a>';
        thumb += '           </div>';
        thumb += '           <div class="flip-card-back flip-card-target">';
        thumb += '              <span class="flip-buttons">';
        thumb += '                  <a href="javascript:void(0)" class="flip-button float-start"><span class="badge bg-secondary"><i class="fas fa-arrows-alt-v"></i></span></a>';
        thumb += '                  <a href="javascript:void(0)" class="flip-button float-end"><span class="badge bg-secondary"><i class="fas fa-arrows-alt-v"></i></span></a>';
        thumb += '              </span>';
        thumb += '              <a href="'+viewerUrl2+'" class="d-block mb-4 h-100">';
        thumb += '                <img class="img-fluid img-thumbnail img-flip" src="'+ thumbsRoot+ views[1] +'.jpg" title="'+ item + type2 +'" alt="'+ item +'">';
        thumb += '              </a>';
        thumb += '           </div>';
        thumb += '         </div>';
        thumb += '       </div> ';
        thumb += '  <span class="card-title">' + item + '</span>';
        thumb += '  <span class="badge bg-secondary float-end">' + len + '</span>';
        thumb += '</div>';

    } else {
        // panic
    }

    

    $("#main").append(thumb); 

}

function sortObj(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
      result[key] = obj[key];
      return result;
    }, {});
  }

