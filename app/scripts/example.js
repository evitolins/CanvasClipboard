var clipboard = new CanvasClipboard();
var utils = new CanvasUtils();
var testImg = new Image();
var canvases = {
    a : {source: document.getElementById("sourceA"), dest: document.getElementById("destA")},
    b : {source: document.getElementById("sourceB"), dest: document.getElementById("destB")},
    c : {source: document.getElementById("sourceC"), dest: document.getElementById("destC")},
    d : {source: document.getElementById("sourceD"), dest: document.getElementById("destD")},
    e : {source: document.getElementById("sourceE"), dest: document.getElementById("destE")},
    f : {source: document.getElementById("sourceF"), dest: document.getElementById("destF")}
};
var ctxs = {
    a : {source: canvases.a.source.getContext('2d'), dest: canvases.a.dest.getContext('2d')},
    b : {source: canvases.b.source.getContext('2d'), dest: canvases.b.dest.getContext('2d')},
    c : {source: canvases.c.source.getContext('2d'), dest: canvases.c.dest.getContext('2d')},
    d : {source: canvases.d.source.getContext('2d'), dest: canvases.d.dest.getContext('2d')},
    e : {source: canvases.e.source.getContext('2d'), dest: canvases.e.dest.getContext('2d')},
    f : {source: canvases.f.source.getContext('2d'), dest: canvases.f.dest.getContext('2d')}
};

var init = function () {
    ctxs.a.source.drawImage(testImg, 0, 0);
    clipboard.cut(canvases.a.source, 20, 50, 100, 100);
    clipboard.paste(canvases.a.dest);

    ctxs.b.source.drawImage(testImg, 0, 0);
    clipboard.cut(canvases.b.source, 20, 50, 100, 100);
    clipboard.translate(130, 100);
    clipboard.paste(canvases.b.dest);

    ctxs.c.source.drawImage(testImg, 0, 0);
    clipboard.cut(canvases.c.source, 20, 50, 100, 100);
    clipboard.rotate(27);
    clipboard.paste(canvases.c.dest);

    ctxs.d.source.drawImage(testImg, 0, 0);
    clipboard.cut(canvases.d.source, 20, 50, 100, 100);
    clipboard.rotate(-15);
    clipboard.scale(2);
    clipboard.paste(canvases.d.dest);

    ctxs.e.source.drawImage(testImg, 0, 0);
    clipboard.cut(canvases.e.source, 20, 50, 100, 100);
    clipboard.rotate(-15);
    clipboard.scale(2);
    clipboard.translate(0, 50);
    clipboard.paste(canvases.e.dest);


    var slider_translateX = document.getElementById('slider_translateX');
    var slider_translateY = document.getElementById('slider_translateY');
    var slider_rotate = document.getElementById('slider_rotate');
    var slider_scale = document.getElementById('slider_scale');
    ctxs.f.source.drawImage(testImg, 0, 0);
    clipboard.cut(canvases.f.source, 20, 50, 100, 100);
    clipboard.paste(canvases.f.dest);

    slider_translateX.addEventListener('input', function (e) {
        utils.clear(canvases.f.dest);
        clipboard.translate(parseFloat(this.value), clipboard.manip.translate[1]);
        clipboard.paste(canvases.f.dest);
    })
    slider_translateY.addEventListener('input', function (e) {
        utils.clear(canvases.f.dest);
        clipboard.translate(clipboard.manip.translate[0], parseFloat(this.value));
        clipboard.paste(canvases.f.dest);
    });
    slider_rotate.addEventListener('input', function (e) {
        utils.clear(canvases.f.dest);
        clipboard.rotate(parseFloat(this.value));
        clipboard.paste(canvases.f.dest);
    });
    slider_scale.addEventListener('input', function (e) {
        utils.clear(canvases.f.dest);
        clipboard.scale(parseFloat(this.value), 0);
        clipboard.paste(canvases.f.dest);
    });
};

testImg.onload = init;
testImg.src = "images/testImage.jpg";
