import Theme from './../components/theme';

export default class CanvasVideoManipulator {
  static BOX_COLOR = Theme.palette.secondary.dark;
  static BOX_WIDTH = 6;
  canvas;

  constructor(canvas) {
    if (canvas !== undefined)
      this.canvas = canvas;
  }

  drawBoxes(image, boxes) {
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    let ctx = this.canvas.getContext('2d');
    ctx.putImageData(image, 0, 0);
    
    ctx.beginPath();
    ctx.lineWidth = CanvasVideoManipulator.BOX_WIDTH;
    ctx.strokeStyle = CanvasVideoManipulator.BOX_COLOR;
    ctx.font = "30px Arial";
    boxes.map((box, index) => {
      ctx.strokeRect(box.left, box.top, box.width, box.height);
      ctx.fillStyle = "white";
      ctx.fillText(box.class, box.left, box.top);
    });
    ctx.stroke();
  }
}