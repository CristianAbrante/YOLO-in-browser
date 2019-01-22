import Theme from './../components/theme';

export default class CanvasManipulator {
  static BOX_COLOR = Theme.palette.secondary.dark;
  static SELECTED_BOX_COLOR = Theme.palette.primary.dark;
  static BOX_WIDTH = '6';
  canvas;

  constructor(canvas) {
    this.setCanvas(canvas);
  }

  drawBoxes(image, boxes, selectedIndex) {
    this.drawImage(image);
    let ctx = this.canvas.getContext('2d');

    ctx.beginPath();
    ctx.lineWidth = CanvasManipulator.BOX_WIDTH;
    ctx.strokeStyle = CanvasManipulator.BOX_COLOR;
    boxes.map((box, index) => {
      if (selectedIndex !== undefined
          && selectedIndex === index) {
        ctx.strokeStyle = CanvasManipulator.SELECTED_BOX_COLOR;
        ctx.strokeRect(box.left, box.top, box.width, box.height);
        ctx.strokeStyle = CanvasManipulator.BOX_COLOR;
      } else {
        ctx.strokeRect(box.left, box.top, box.width, box.height);
      }
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