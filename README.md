CanvasClipboard
===============

A minimal library to perform clipboard actions for HTML5 canvas elements. (4.5K)

## Install
__Bower__

```bash
bower install -S CanvasClipboard
```


## Getting Started
```javascript
var clipboard = new CanvasClipboard();    
clipboard.copy(source, x, y, w, h);
clipboard.scale(2);
clipboard.rotate(30);
clipboard.translate(10, -20);
clipboard.paste(dest);
```


## Methods

__copy__ : `clipboard.copy(source, x, y, w, h)`

__cut__ : `clipboard.cut(source, x, y, w, h)`

__paste__ : `clipboard.paste(dest, x, y)`

__scale__ : `clipboard.scale(scale)`

__rotate__ : `clipboard.rotate(degrees)`

__translate__ : `clipboard.translate(x, y)`

