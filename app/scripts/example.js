var clipboard = new CanvasClipboard();
var testImg = new Image();
var a = document.getElementById('source');
var b = document.getElementById('test1');
var c = document.getElementById('test2');
var d = document.getElementById('test3');
var e = document.getElementById('test4');
var f = document.getElementById('test5');
var aCtx = a.getContext('2d');
var bCtx = b.getContext('2d');
var cCtx = c.getContext('2d');
var dCtx = d.getContext('2d');
var eCtx = e.getContext('2d');
var fCtx = e.getContext('2d');

testImg.onload = (function(){
    return function() {
        console.log('onload');
        aCtx.drawImage(testImg, 0, 0);

        // Tests (must be performed after image load)
        //clipboard.copy(a, 10, 10, 290, 290);
        //clipboard.paste(b);

        clipboard.cut(a, 10, 30, 100, 100);
        clipboard.paste(b);

        clipboard.paste(c, 130, 100);

        clipboard.rotate(27);
        clipboard.paste(d);

        clipboard.rotate(-15);
        clipboard.scale(2);
        clipboard.paste(e);

        clipboard.rotate(-15);
        clipboard.scale(2);
        clipboard.translate(20, 50);
        clipboard.paste(f);
    }
}());
testImg.src = "images/testImage.jpg";


// Show clipboard canvas
document.body.appendChild(clipboard.clipboard);
