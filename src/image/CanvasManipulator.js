
export default class CanvasManipulator {
  static BOX_COLOR = 'red';
  static BOX_WIDTH = '6';
  canvas;

  constructor(canvas) {
    this.setCanvas(canvas);
  }

  drawBoxes(image, boxes) {
    this.drawImage(image);
    let ctx = this.canvas.getContext('2d');

    ctx.beginPath();
    ctx.lineWidth = CanvasManipulator.BOX_WIDTH;
    ctx.strokeStyle = CanvasManipulator.BOX_COLOR;
    boxes.map(box => {
      ctx.strokeRect(box.left, box.top, box.width, box.height);
    });
    ctx.stroke();
  }

  drawImage(image) {
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    let ctx = this.canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
  }

  setCanvas(canvas) {
    if (canvas !== undefined)
      this.canvas = canvas;
  }

  refreshCanvas() {
    this.canvas.width = 0;
    this.canvas.height = 0;
  }
}