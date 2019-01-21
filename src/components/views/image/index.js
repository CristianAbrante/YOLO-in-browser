import React, {Component} from 'react';

import './index.css';
import ImageCarousel from './ImageCarousel';
import ImageManager from './../../../image/ImageManager';
import CanvasManager from './../../../image/CanvasManipulator';

import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core';
import CanvasManipulator from '../../../image/CanvasManipulator';

function importAll(r) {
  let images = [];
  r.keys().map(item => { images.push(r(item)); });
  return images;
}
const images = importAll(require.context('./../../../yolo/test/images', false, /\.(png|jpe?g|svg)$/));

const styles = {
  container: {
    padding: 10,
    height: '90vh',
    display: 'grid',
    gridTemplateRows: "60% 8% 35%",
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: '5px',
  },
  carousel: {
    margin: 'auto',
    width: '100%'
  },
  canvasContainer: {
    display: 'flex',
    width: '99vw',
    background: 'grey',
    overflow: 'auto'
  },
  canvas: {
    margin: 'auto',
    background: 'white'
  }
};

class ImageView extends Component {
  canvasRef;
  inputRef;
  currentSampleImage;
  canvasManager;
  imageManager;

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.canvasManager = new CanvasManager(this.canvasRef.current);
    this.imageManager = new ImageManager();
  }

  setCurrentSampleImage = index => {
    this.currentSampleImage = images[index];
  };

  uploadSampleImage = () => {
    this.imageManager.loadImage(
        this.currentSampleImage,
        image => {
          this.canvasManager.drawImage(image);
        });
  };

  uploadInputImage = () => {
    this.imageManager.loadImageFromInput(
        this.inputRef.current,
        image => {
          this.canvasManager.drawImage(image);
        });
  };

  render() {
    let {classes} = this.props;
    return (
        <div className={"container " + classes.container}>
          <Paper className={classes.canvasContainer}>
            <canvas ref={this.canvasRef} className={classes.canvas}>
              Your browser does not support canvas
            </canvas>
          </Paper>
          <Paper className={classes.buttonsContainer}>
            <Fab
                className={classes.button}
                variant='extended'
                color='secondary'
                onClick={this.uploadSampleImage}>
              Upload Sample
            </Fab>
            <Fab
                className={classes.button}
                variant='extended'
                color='secondary'
                onClick={() => {this.inputRef.current.click()}}>
              Upload custom
            </Fab>
            <input
                ref={this.inputRef}
                style={{"display" : "none"}}
                onChange={this.uploadInputImage}
                type="file"/>
          </Paper>
          <Paper className={classes.carousel}>
            <ImageCarousel
                sampleImages={images}
                setCurrentSampleImage={this.setCurrentSampleImage}/>
          </Paper>
        </div>
    );
  }
}

export default withStyles(styles)(ImageView);