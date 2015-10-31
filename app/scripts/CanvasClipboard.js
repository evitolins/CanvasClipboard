/*jslint
browser: true, devel: true, plusplus: true, unparam: true, vars: true, white: true
*/
/*global */

(function () { 'use strict';

    var degToRad = function (deg) {
        return Math.PI / 180 * deg;
    };



    var CanvasClipboard = function () {
        this.clipboard = document.createElement('canvas');
        this.clipboard_ctx = this.clipboard.getContext('2d');
        this.clipboard.width = 0;
        this.clipboard.height = 0;
        // Record Origin (allow "paste in place" while maintaing a minimally
        // sized canvas)
        this.origXpos = 0;
        this.origYpos = 0;
        this.manip = {
            scale : 1,
            rotate : 0,
            translate : [0, 0]
        };
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
        this.origXpos = x || 0;
        this.origYpos = y || 0;
        this.manip = {
            scale : 1,
            rotate : 0,
            translate : [0, 0]
        };
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

            x = (x !== undefined) ? x : this.origXpos;
            y = (y !== undefined) ? y : this.origYpos;


        var pX = x+(w/2);
        var pY = y+(h/2);

        console.log('pastePivot: ', pX, pY, w, h);

        ctx2.translate(pX, pY);
        ctx2.scale(this.manip.scale, this.manip.scale);
        ctx2.rotate(degToRad(this.manip.rotate));
        ctx2.translate(-pX + this.manip.translate[0], -pY + this.manip.translate[1]);

        ctx2.drawImage(cvs1, 0, 0, w, h, x, y, w, h );

        console.log('paste:', 0, 0, w, h, x, y, w, h );
    };


    // Manipulation
    CanvasClipboard.prototype.scale = function (scale) {
        this.manip.scale = (typeof scale === 'number') ? scale : 1;
    };

    CanvasClipboard.prototype.translate = function (x, y) {
        this.manip.translate[0] = (typeof x === 'number') ? x : 0;
        this.manip.translate[1] = (typeof y === 'number') ? y : 0;
    };

    CanvasClipboard.prototype.rotate = function (deg) {
        deg = (typeof deg === 'number') ? deg : 0;
        this.manip.rotate = deg;
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
