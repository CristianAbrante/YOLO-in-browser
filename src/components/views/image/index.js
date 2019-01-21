import React, {Component} from 'react';

import './index.css';
import ImageCarousel from './ImageCarousel';

import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core';

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
  currentSampleImage;

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  setCurrentSampleImage = index => {
    this.currentSampleImage = images[index];
  };

  uploadSampleImage = (imgSrc) => {
    let canvas = this.canvasRef.current;

    let imageLoaded = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
    };

    let image = new Image();
    image.onload = imageLoaded;
    image.src = this.currentSampleImage;
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
                color='secondary'>
              Upload custom
            </Fab>
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