import React, {Component} from 'react';

import VideoTest from '../../../yolo/test/video/video.mp4';
import CanvasManager from '../../../image/CanvasVideoManipulator';
import VideoManipulator from '../../../video/VideoManipulator';

import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import {withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import Dialog from '@material-ui/core/Dialog/Dialog';
import CircularProgress
  from '@material-ui/core/CircularProgress/CircularProgress';

const styles = {
  container: {
    padding: 10,
    height: '90vh',
    display: 'grid',
    gridTemplateRows: "60% 10%",
  },
  canvasContainer: {
    display: 'flex',
    width: '99vw',
    background: '#D1D7DE',
    overflow: 'auto'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class VideoView extends Component {
  canvas;
  video;
  canvasManager;
  videoManipulator;

  state = {
    dialogOpen: true,
  };

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
            this.setState({dialogOpen: false});
          }
      )
    }
  };

  playProcessed = () => {
    this.video.current.play();
  };

  render() {
    let {classes} = this.props;
    return (
        <div>
          <Dialog
              open={this.state.dialogOpen}
              fullWidth={true}>
            <Paper align="center">
              <Typography
                  align="center"
                  variant="overline">
                Preprocessing video
              </Typography>
              <Divider/>
              <CircularProgress color="secondary" style={{margin: 20}}/>
            </Paper>
          </Dialog>

          <div className={classes.container}>
            <Paper className={classes.canvasContainer}>
              <canvas ref={this.canvas}>
                Canvas not supported in your browser
              </canvas>
            </Paper>
            <Paper className={classes.buttonsContainer}>
              <video
                  ref={this.video}
                  src={VideoTest}
                  controls
                  style={{display: 'none'}}
                  onPlay={this.onVideoPlayed}
                  onPause={this.onVideoPaused}
                  muted/>
              <Fab
                  onClick={this.playProcessed}
                  variant='extended'
                  color='secondary'>
                Play video
              </Fab>
            </Paper>
          </div>
        </div>
    );
  }
}

export default withStyles(styles)(VideoView);