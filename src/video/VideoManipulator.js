import Yolo from '../yolo/yolo';

class VideoManipulator {
  static REFRESH_RATE = 500;
  video;
  model;
  canvasVideoManager;

  videoHasBeenPreprocessed = false;
  frames = [];
  boxes = [];
  boxesIndex = 0;

  constructor(video, model, canvasVideoManager) {
    this.video = video;
    this.model = model;
    this.canvasVideoManager = canvasVideoManager;
  }

  preprocess = async () => {
    if (this.video.paused || this.video.ended)
      return;
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    this.processCallback(ctx)
  };

  processCallback = ctx => {
    if (this.video.paused || this.video.ended)
      return;
    ctx.drawImage(this.video, 0, 0);
    this.frames.push(ctx.getImageData(0, 0, Yolo.INPUT_SIZE, Yolo.INPUT_SIZE));
    setTimeout(() => this.processCallback(ctx), VideoManipulator.REFRESH_RATE);
  };

  stopPreprocess = () => {
    this.videoHasBeenPreprocessed = true;
    this.boxesIndex = 0;
  };

  processBoxes = async () => {
    console.log(this.model);
    return await this.frames.map(
        frame => {
          this.model.predictVideo(frame).then(
              boxes => {
                if (boxes.length !== 0)
                  console.log(boxes);
                this.boxes.push(boxes);
              }
          )
        }
    )
  };

  play = () => {
    if (this.video.paused || this.video.ended)
      return;
    this.canvasVideoManager.drawBoxes(this.video, this.boxes[this.boxesIndex]);
    this.boxesIndex++;
    setTimeout(() => this.play(), VideoManipulator.REFRESH_RATE);
  }
}

export default VideoManipulator;