var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.querySelector('canvas');
canvas.width = width;
canvas.height = height;
var c = canvas.getContext('2d');

function background(r = 200, g = -1, b = -1, a = 1.0){
    //c.clearRect(0, 0, width, height);

    if( b === -1 ){
        g = r;
        b = r;
    }
    c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    c.fillRect(0, 0, width, height);
}

function fill(r, g = -1, b = -1, a = 1.0){
    if( b === -1 ){
        g = r;
        b = r;
    }
    c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
}

function stroke(r, g = -1, b = -1, a = 1.0){
    if( b === -1 ){
        g = r;
        b = r;
    }
    c.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
}

function line(x1, y1, x2, y2){
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
}

function rect(x, y, width, height){
    c.fillRect(x, y, width, height);
}

function ellipse(x, y, w, h) {
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = (x - w/2.0) + w,           // x-end
        ye = (y - h/2.0) + h,           // y-end
        xm = (x - w/2.0) + w / 2,       // x-middle
        ym = (y - h/2.0) + h / 2;       // y-middle
  
    c.beginPath();
    c.moveTo((x - w/2.0), ym);
    c.bezierCurveTo((x - w/2.0), ym - oy, xm - ox, (y - h/2.0), xm, (y - h/2.0));
    c.bezierCurveTo(xm + ox, (y - h/2.0), xe, ym - oy, xe, ym);
    c.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    c.bezierCurveTo(xm - ox, ye, (x - w/2.0), ym + oy, (x - w/2.0), ym);
    c.fill();
    c.stroke();
}

var text_size = 12;
function text(str, x, y){
    c.font = `${text_size}px serif`;
    c.fillText(str, x, y);
}

function textSize(size){
    text_size = size;
}