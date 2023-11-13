var rti;

var idx = 0;
var qs;
var obj;
var imgPath = "AMS_RTI/";
var rtiWidth = 900;
var rtiHeight = 600;

var objects = {};


$(document).ready(function() {

    

    qs = get_query();
    if( qs.hasOwnProperty("obj") ) {
        obj = qs["obj"];
        console.log(obj);

        imgPath = imgPath + obj;
        console.log(imgPath);
        
        
        
        setTimeout(function() {
            //your code to be executed after 1 second
            createRtiViewer("main", imgPath, rtiWidth, rtiHeight);
          }, 1000);
        
    // rti.setMode(1);

    } else {
        console.error("incorrect or no query string provided.");
    }





});

function get_query(){
    var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}