/*jslint
browser: true, devel: true, plusplus: true, unparam: true, vars: true, white: true
*/
/*global */

(function () { 'use strict';
    var CanvasUtils = function () {};

    // Utilities
    CanvasUtils.prototype.isCanvas = function (source) {
        return (typeof source === "object" && source.tagName === "CANVAS");
    };

    CanvasUtils.prototype.addSrc = function (dest, src, callback) {
        var ctx = dest.getContext('2d'),
            image = new Image();
        image.onload = function() {
            ctx.drawImage(image, 0, 0);
            if (typeof callback === 'function') {
                callback.apply();
            }
        };
        image.src = src;
    };

    CanvasUtils.prototype.clear = function (canvas, x, y, w, h) {
        var ctx = canvas.getContext('2d');
        x = (typeof x === 'number') ? x : 0;
        y = (typeof y === 'number') ? y : 0;
        w = w || canvas.width - x;
        h = h || canvas.height - y;
        ctx.clearRect(x, y, w, h);
    };

    CanvasUtils.prototype.copyFromTo = function (source, dest) {
        var cvs1 = source,
            ctx1 = cvs1.getContext("2d"),
            cvs2 = dest,
            ctx2 = cvs2.getContext("2d");

        ctx2.clearRect(0, 0, cvs2.width, cvs2.height);
        ctx2.drawImage(cvs1, 0, 0);
    };

    // Generates a new canvas element, cloning the attributes and contents of
    // the given source
    CanvasUtils.prototype.clone = function (source) {
        var cvs1 = source,
            ctx1 = source.getContext("2d"),
            cvs2 = document.createElement('canvas'),
            ctx2 = cvs2.getContext("2d");
        cvs2.width = cvs1.width;
        cvs2.height = cvs1.height;
        this.copyFromTo(cvs1, cvs2);
        return cvs2;
    };

    CanvasUtils.prototype.diff = function (canvas1, canvas2) {

    };

    CanvasUtils.prototype.getColorSample = function (canvas, x, y) {
        var ctx = canvas.getContext('2d'),
            s = ctx.getImageData( x, y, 1, 1 );
        return [ s.data[0], s.data[1], s.data[2] ];
    };

    window.CanvasUtils = CanvasUtils;

}());