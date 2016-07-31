(function($){

  function createCanvas(width, height) {
    var canvas = $('<canvas></canvas>');
    canvas[0].width = width;
    canvas[0].height = height;
    return canvas;
  }

  $.fn.sketchpad = function() {
    this.css('border', '1px solid #000');
    var canvas = createCanvas(this.width(), this.height());
    var ctx = canvas[0].getContext('2d');
    this.append(canvas);

    var isDrawing = false;
    var offset = {
      left: this[0].offsetLeft,
      top:  this[0].offsetTop
    }
    var pos
    var prevX = 0,
        prevY = 0,
        currX = 0,
        currY = 0;

    canvas.mousedown(mousedown);
    canvas.mouseup(mouseup);
    canvas.mousemove(mousemove);

    function calXY(e) {
      return {
        x: e.clientX - offset.left,
        y: e.clientY - offset.top
      };
    }

    function mousedown(e) {
      var pos = calXY(e);
      prevX = pos.x;
      prevY = pos.y;
      isDrawing = true;
    }

    function mouseup(e) {
      isDrawing = false;
    }

    function mousemove(e) {
      if (!isDrawing) return;
      var pos = calXY(e);
      currX = pos.x;
      currY = pos.y;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();

      prevX = currX;
      prevY = currY;
    }

    return this;
  };
    
}(jQuery));
