import Theme from './../components/theme';

export default class CanvasManipulator {
  static BOX_COLOR = Theme.palette.secondary.dark;
  static SELECTED_BOX_COLOR = Theme.palette.primary.dark;
  static BOX_WIDTH = '6';
  canvas;
  ctx;

  constructor(canvas) {
    this.setCanvas(canvas);
  }

  drawBoxes(image, boxes, selectedIndex) {
    this.drawImage(image);

    this.ctx.beginPath();
    this.ctx.lineWidth = CanvasManipulator.BOX_WIDTH;
    this.ctx.strokeStyle = CanvasManipulator.BOX_COLOR;
    boxes.map((box, index) => {
      if (selectedIndex !== undefined
          && selectedIndex === index) {
        this.ctx.strokeStyle = CanvasManipulator.SELECTED_BOX_COLOR;
        this.ctx.strokeRect(box.left, box.top, box.width, box.height);
        this.ctx.strokeStyle = CanvasManipulator.BOX_COLOR;
      } else {
        this.ctx.strokeRect(box.left, box.top, box.width, box.height);
      }
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

  refreshCanvas() {
    this.canvas.width = 0;
    this.canvas.height = 0;
  }
}