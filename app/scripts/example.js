var util = new CanvasClipboard();
var testImg = new Image();
var a = document.getElementById('source');
var b = document.getElementById('test1');
var c = document.getElementById('test2');
var d = document.getElementById('test3');
var e = document.getElementById('test4');
var aCtx = a.getContext('2d');
var bCtx = b.getContext('2d');
var cCtx = c.getContext('2d');
var dCtx = d.getContext('2d');
var eCtx = e.getContext('2d');

testImg.onload = (function(){
    return function() {
        console.log('onload');
        aCtx.drawImage(testImg, 0, 0);

        // Tests (must be performed after image load)
        //util.copy(a, 10, 10, 290, 290);
        //util.paste(b);

        util.cut(a, 10, 30, 100, 100);
        util.paste(b);

        util.paste(c, 130, 100);

        util.rotate(27);
        util.paste(d);

        util.rotate(-15);
        util.scale(2);
        util.paste(e);
    }
}());
testImg.src = "images/testImage.jpg";


// Show clipboard canvas
document.body.appendChild(util.clipboard);
