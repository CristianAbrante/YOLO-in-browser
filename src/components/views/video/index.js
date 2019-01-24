import React, {Component} from 'react';

import VideoTest from '../../../yolo/test/video/v1.webm';
import CanvasManager from '../../../image/CanvasVideoManipulator';
import Yolo from '../../../yolo/yolo';
import VideoManipulator from '../../../video/VideoManipulator';

class VideoView extends Component {
  video;
  canvas;
  ctx;
  canvasManager;
  videoManipulator;

  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');
    this.canvasManager = new CanvasManager(this.canvas.current);
    this.videoManipulator = new VideoManipulator(this.video.current, this.props.model, this.canvasManager);
    this.video.current.play();
  }

  onVideoPlayed = () => {
    if (!this.videoManipulator.videoHasBeenPreprocessed) {
      this.videoManipulator.preprocess();
    } else {
      this.videoManipulator.play();
    }
  };

  onVideoPaused = () => {
    if (!this.videoManipulator.videoHasBeenPreprocessed) {
      console.log(this.videoManipulator.frames);
      //this.videoManipulator.stopPreprocess();
      this.videoManipulator.processBoxes().then(
          () => {
            console.log(this.videoManipulator.boxes);
            this.videoManipulator.stopPreprocess();
          }
      )
    }
  };

  playProcessed = () => {
    this.video.current.play();
  };

  render() {
    return (
        <div>
          <div>
            <video
                ref={this.video}
                src={VideoTest}
                controls
                style={{display: 'none'}}
                onPlay={this.onVideoPlayed}
                onPause={this.onVideoPaused}/>
          </div>
          <div>
            <canvas ref={this.canvas} width={Yolo.INPUT_SIZE} height={Yolo.INPUT_SIZE}></canvas>
          </div>
          <button onClick={this.playProcessed}>Play processed</button>
        </div>
    );
  }
}

export default VideoView;