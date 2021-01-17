const makePoint = (event) => {
  const rect = event.target.getBoundingClientRect()

  return {
    x: Math.floor(event.clientX - rect.left),
    y: Math.floor(event.clientY - rect.top),
  };
};


export default class PrimitiveBrush {

  constructor(canvas) {
    this.canvas = canvas;
    this.endCallback = null;
  }

  attach(endCallback) {
    this.initContext();
    this.canvas.addEventListener('mousedown', this.start.bind(this));
    this.canvas.addEventListener('mousemove', this.move.bind(this));
    this.canvas.addEventListener('mouseup', this.end.bind(this));
    this.canvas.addEventListener("touchstart", this.touchHandler.bind(this), true);
    this.canvas.addEventListener("touchmove", this.touchHandler.bind(this), true);
    this.canvas.addEventListener("touchend", this.touchHandler.bind(this), true);
    this.canvas.addEventListener("touchcancel", this.touchHandler.bind(this), true);
    this.endCallback = endCallback;
  }

  dettach() {
    if (!this.canvas) return;
    this.canvas.removeEventListener('mousedown', this.start.bind(this));
    this.canvas.removeEventListener('mousemove', this.move.bind(this));
    this.canvas.removeEventListener('mouseup', this.end.bind(this));
    this.canvas.removeEventListener("touchstart", this.touchHandler.bind(this), true);
    this.canvas.removeEventListener("touchmove", this.touchHandler.bind(this), true);
    this.canvas.removeEventListener("touchend", this.touchHandler.bind(this), true);
    this.canvas.removeEventListener("touchcancel", this.touchHandler.bind(this), true);

  }

  initContext() {
    const context = this.canvas.getContext('2d');

    if (!(context instanceof CanvasRenderingContext2D)) {
      throw new Error('No 2D rendering context given!');
    }

    this.ctx = context;
    this.strokes = [];
    this.isTouching = false;

    // init context
    this.ctx.strokeStyle = '#efefff';
    this.ctx.lineWidth = '6';
    this.ctx.lineCap = this.ctx.lineJoin = 'round';
    this.ctx.shadowColor = "rgba(138,225,244, 1)";
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 20;
  }

  clear() {
    const { width, height } = this.canvas.getBoundingClientRect();
    this.ctx.clearRect(0, 0, width, height);
  }

  start(event) {
    this.clear();
    this.isTouching = true;
    this.strokes = [ makePoint(event) ];
    window.requestAnimationFrame(this._draw.bind(this));
  }

  move(event) {
    if (this.isTouching) {
      this.strokes.push(makePoint(event));
      window.requestAnimationFrame(this._draw.bind(this));
    }
  }

  end(event, _) {
    this.move(event);
    this.isTouching = false;
    this.endCallback(this.strokes);
  }

  _draw() {
    this.clear();
    this.ctx.beginPath();
    this.ctx.moveTo(this.strokes[0].x, this.strokes[0].y);
    for (let i = 0, l = this.strokes.length; i < l; i++) {
      const point = this.strokes[i];
      this.ctx.lineTo(point.x, point.y);
    }

    this.ctx.stroke();
  }

  touchHandler(event) {
    const firstTouch = event.changedTouches[0];

    const type = this.getMouseEventByTouchType(event.type);

    const simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
      firstTouch.screenX, firstTouch.screenY,
      firstTouch.clientX, firstTouch.clientY, false,
      false, false, false, 0/*left*/, null);

    firstTouch.target.dispatchEvent(simulatedEvent);
  }

  getMouseEventByTouchType(type) {
    switch(type)
    {
      case "touchstart": return "mousedown";
      case "touchmove":  return "mousemove";
      case "touchend":   return "mouseup";
      default: return;
    }
  }
}
