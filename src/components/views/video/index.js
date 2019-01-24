import React, {Component} from 'react';

import VideoTest from '../../../yolo/test/video/OUT.mp4';
import CanvasManager from '../../../image/CanvasVideoManipulator';
import Yolo from '../../../yolo/yolo';
import VideoManipulator from '../../../video/VideoManipulator';

class VideoView extends Component {
  canvas;
  video;
  canvasManager;
  videoManipulator;

  constructor(props) {
    super(props);
    this.video = React.createRef();
    this.canvas = React.createRef();
  }

  componentDidMount() {
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
      this.videoManipulator.processBoxes().then(
          () => {
            console.log('Frames processed!');
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
                onPause={this.onVideoPaused}
                muted/>
          </div>
          <div>
            <canvas ref={this.canvas}></canvas>
          </div>
          <button onClick={this.playProcessed}>Play processed</button>
        </div>
    );
  }
}

export default VideoView;