```javascript
// http://stackoverflow.com/questions/9852159/calculate-bounding-box-of-arbitrary-pixel-based-drawing
// http://phrogz.net/tmp/canvas_bounding_box2.html

var contextBoundingBox = function (ctx, alphaThreshold) {
    if (alphaThreshold===undefined) alphaThreshold = 15;
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        data = ctx.getImageData(0, 0, w, h).data,
        x, y, minX, minY, maxY, maxY;
    o1: for (y = h; y--;)
        for (x = w; x--;)
            if (data[(w * y + x) * 4 + 3] > alphaThreshold) {
                maxY = y;
                break o1;
            }
            if (!maxY) return;
    o2: for (x = w; x--;)
        for (y = maxY + 1; y--;)
            if (data[(w * y + x) * 4 + 3] > alphaThreshold) {
                maxX = x;
                break o2;
            }
    o3: for (x = 0; x <= maxX; ++x)
        for (y = maxY + 1; y--;)
            if (data[(w * y + x) * 4 + 3] > alphaThreshold) {
                minX=x;
                break o3;
            }
    o4: for (y = 0; y <= maxY; ++y)
        for (x = minX; x<=maxX; ++x)
            if (data[(w * y + x) * 4 + 3] > alphaThreshold) {
                minY=y;
                break o4;
            }
    return {x:minX, y:minY, maxX:maxX, maxY:maxY, w:maxX-minX, h:maxY-minY};
};
```
