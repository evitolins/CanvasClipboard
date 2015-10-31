/*jslint
browser: true, devel: true, plusplus: true, unparam: true, vars: true, white: true
*/
/*global */

(function () { 'use strict';

    var degToRad = function (deg) {
        return Math.PI / 180 * deg;
    };

    var point = function (ctx, x, y, color, r) {
        r = r || 3;
        color = color || 'red';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
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
            w = this.clipboard.width,
            h = this.clipboard.height,
            cvs2 = dest,
            ctx2 = cvs2.getContext("2d"),
            pX, pY;

        x = (x !== undefined) ? x : this.origXpos;
        y = (y !== undefined) ? y : this.origYpos;
        pX = x+(w/2);
        pY = y+(h/2);

        console.log('pastePivot: ', pX, pY, w, h);
        ctx2.save();
        ctx2.translate(pX, pY);
        ctx2.scale(this.manip.scale, this.manip.scale);
        ctx2.rotate(degToRad(this.manip.rotate));
        ctx2.translate(-pX + this.manip.translate[0], -pY + this.manip.translate[1]);
        ctx2.drawImage(cvs1, 0, 0, w, h, x, y, w, h );
        ctx2.restore();
        console.log('paste:', 0, 0, w, h, x, y, w, h );

        point(ctx2, pX, pY);

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
        this.manip.rotate = (typeof deg === 'number') ? deg : 0;
    };


    window.CanvasClipboard = CanvasClipboard;

}());
