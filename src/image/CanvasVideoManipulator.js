import Theme from './../components/theme';

export default class CanvasManipulator {
  static BOX_COLOR = Theme.palette.secondary.dark;
  ctx;

  constructor(canvas) {
    this.setCanvas(canvas);
  }

  drawBoxes(image, boxes) {
    this.drawImage(image);
    this.ctx.beginPath();
    this.ctx.lineWidth = CanvasManipulator.BOX_WIDTH;
    this.ctx.strokeStyle = CanvasManipulator.BOX_COLOR;
    boxes.map((box, index) => {
      this.ctx.strokeRect(box.left, box.top, box.width, box.height);
    });
    this.ctx.stroke();
  }

  drawImage(image) {
    this.ctx.drawImage(image, 0, 0);
  }

  setCanvas(canvas) {
    if (canvas !== undefined)
      this.ctx = canvas.getContext('2d');
  }
}