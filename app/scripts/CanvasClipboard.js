/*jslint
browser: true, devel: true, plusplus: true, unparam: true, vars: true, white: true
*/
/*global */

(function () { 'use strict';
    var CanvasClipboard = function () {
        this.clipboard = document.createElement('canvas');
        this.clipboard_ctx = this.clipboard.getContext('2d');
        // Record Origin (allow "paste in place" while maintaing a minimally
        // sized canvas)
        this.clipboard.x = 0;
        this.clipboard.y = 0;
        this.clipboard.scale = 1;
        this.clipboard.rotate = 0;
        this.clipboard.width = 0;
        this.clipboard.height = 0;

        //Only for testing
        document.body.appendChild(this.clipboard);
    };

    // Clipboard
    CanvasClipboard.prototype.copy = function (source, x, y, w, h) {
        var cvs1 = source;

        //Defaults
        x = x || 0;
        y = y || 0;

        // Area can not exceed canvas boundry
        w = (w <= source.width - x) ? w : source.width - x;
        h = (h <= source.height - y) ? h : source.height - y;

        // Alter clipboard to match source size and origin
        this.clipboard.x = x || 0;
        this.clipboard.y = y || 0;
        this.clipboard.width = w;
        this.clipboard.height = h;

        // Store content
        this.clipboard_ctx.drawImage(cvs1, x, y, w, h, 0, 0, w, h );

        console.log('copy', x, y, w, h, 0, 0, w, h );
    };

    CanvasClipboard.prototype.cut = function (source, x, y, w, h) {
        var cvs1 = source,
            ctx1 = cvs1.getContext("2d");

        // Preserve Content
        this.copy(cvs1, x, y, w, h);

        // Remove original content
        ctx1.clearRect(x, y, w, h);

        console.log('cut', x, y, w, h);
    };

    CanvasClipboard.prototype.paste = function (dest, x, y) {
        var cvs1 = this.clipboard,
            ctx1 = this.clipboard_ctx,
            cvs2 = dest,
            ctx2 = cvs2.getContext("2d"),
            w = cvs1.width,
            h = cvs1.height;

            x = (x !== undefined) ? x : this.clipboard.x;
            y = (y !== undefined) ? y : this.clipboard.y;


        var pX = x+(w/2);
        var pY = y+(h/2);

        console.log('pastePivot: ', pX, pY, w, h);

        ctx2.translate(pX, pY);
        ctx2.scale(this.clipboard.scale, this.clipboard.scale);
        ctx2.rotate(this.clipboard.rotate);
        ctx2.translate(-pX, -pY);

        ctx2.drawImage(cvs1, 0, 0, w, h, x, y, w, h );

        console.log('paste:', 0, 0, w, h, x, y, w, h );
    };


    // Manipulation
    CanvasClipboard.prototype.scale = function (scale) {
        this.clipboard.scale = scale || 1;
    };

    CanvasClipboard.prototype.translate = function () {

    };

    CanvasClipboard.prototype.rotate = function (deg) {
        var rad = Math.PI / 180 * deg;
        this.clipboard.rotate = rad;
    };


    // Utilities
    CanvasClipboard.prototype.isCanvas = function (source) {
        return (typeof source === "object" && source.tagName === "CANVAS");
    };
    // Add given image element's content to destination canvas after image src
    // has been loaded.
    CanvasClipboard.prototype.addSrc = function (dest, src, callback) {
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

    CanvasClipboard.prototype.copyFromTo = function (source, dest) {
        var cvs1 = source,
            ctx1 = cvs1.getContext("2d"),
            cvs2 = dest,
            ctx2 = cvs2.getContext("2d");

        ctx2.clearRect(0, 0, cvs2.width, cvs2.height);
        ctx2.drawImage(cvs1, 0, 0);
    };

    // Generates a new canvas element, cloning the attributes and contents of
    // the given source
    CanvasClipboard.prototype.clone = function (source) {
        var cvs1 = source,
            ctx1 = source.getContext("2d"),
            cvs2 = document.createElement('canvas'),
            ctx2 = cvs2.getContext("2d");
        cvs2.width = cvs1.width;
        cvs2.height = cvs1.height;
        this.copyFromTo(cvs1, cvs2);
        return cvs2;
    };

    CanvasClipboard.prototype.diff = function (canvas1, canvas2) {

    };

    CanvasClipboard.prototype.getColorSample = function (x, y) {
        var s = this.ctx.getImageData( x, y, 1, 1 );
        return [ s.data[0], s.data[1], s.data[2] ];
    };

// http://stackoverflow.com/questions/9852159/calculate-bounding-box-of-arbitrary-pixel-based-drawing
// function boundingBox()
//   w = getWidth()            # Assuming graphics address goes from [0,w)
//   h = getHeight()           # Assuming graphics address goes from [0,h)
//   for y=h-1 to 0 by -1      # Iterate from last row upwards
//     for x=w-1 to 0 by -1    # Iterate across the entire row
//       if pxAt(x,y) then
//         maxY=y
//         break               # Break out of both loops

//   if maxY===undefined then  # No pixels, no bounding box
//     return               

//   for x=w-1 to 0 by -1      # Iterate from last column to first
//     for y=0 to maxY         # Iterate down the column, up to maxY
//       if pxAt(x,y) then
//         maxX=x
//         break               # Break out of both loops

//   for x=0 to maxX           # Iterate from first column to maxX
//     for y=0 to maxY         # Iterate down the column, up to maxY
//       if pxAt(x,y) then
//         minX=x
//         break               # Break out of both loops

//   for y=0 to maxY           # Iterate down the rows, up to maxY
//     for x=0 to maxX         # Iterate across the row, up to maxX
//       if pxAt(x,y) then
//         minY=y
//         break               # Break out of both loops

//   return minX, minY, maxX, maxY


    window.CanvasClipboard = CanvasClipboard;

}());
