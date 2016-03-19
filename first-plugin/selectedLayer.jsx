var layer = app.activeDocument.activeLayer;
var boundsObj = layer.bounds;
var x1 = parseInt(boundsObj[0]);
var y1 = parseInt(boundsObj[1]);
var x2 = parseInt(boundsObj[2]);
var y2 = parseInt(boundsObj[3]);

var sizeInfo = "\
width: " +  (y2 - y1) + ";\
height: " + (x2 - x1) + ";";

alert(sizeInfo);
