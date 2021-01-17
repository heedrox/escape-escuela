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

    const context = canvas.getContext('2d');

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
    this.endCallback = null;
  }

  attach(endCallback) {
    this.canvas.addEventListener('mousedown', this.start.bind(this));
    this.canvas.addEventListener('mousemove', this.move.bind(this));
    this.canvas.addEventListener('mouseup', this.end.bind(this));
    this.endCallback = endCallback;
  }

  clear() {
    const { width, height } = this.canvas.getBoundingClientRect();
    console.log({ width, height});
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
}
