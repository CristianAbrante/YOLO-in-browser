import React, {Component} from 'react';

import './index.css';
import ImageCarousel from './ImageCarousel';
import ImageManager from './../../../image/ImageManager';
import CanvasManager from './../../../image/CanvasManipulator';
import ResultVisualizer from './ResultVisualizer';

import Icon from '@material-ui/core/Icon';
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
    height: '100%',
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

  state = {
    predictionHasBeenMade: false,
    lastBoxes: undefined,
    lastImage: undefined,
  };

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
          this.doPrediction(image)
        });
  };

  uploadInputImage = () => {
    this.imageManager.loadImageFromInput(
        this.inputRef.current,
        image => {
          this.doPrediction(image);
        });
  };

  doPrediction = image => {
    this.props.model.predict(image).then(
        boxes => {
          this.canvasManager.drawBoxes(image, boxes);
          this.setState({
            predictionHasBeenMade: true,
            lastBoxes: boxes,
            lastImage: image,
          })
        }
    )
  };

  renderControllers = () => {
    let {classes} = this.props;
    if (!this.state.predictionHasBeenMade) {
      return(
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
      )
    } else {
      return(
          <Paper className={classes.buttonsContainer}>
            <Fab
                className={classes.button}
                color='secondary'
                onClick={this.backwardPressed}>
              <Icon>arrow_back</Icon>
            </Fab>
          </Paper>
      )
    }
  };

  backwardPressed = () => {
    this.canvasManager.refreshCanvas();
    this.setState({predictionHasBeenMade: false});
  };

  setSelectedBox = (index) => {
    let {lastImage, lastBoxes} = this.state;
    this.canvasManager.drawBoxes(lastImage, lastBoxes, index);
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
          {this.renderControllers()}
          <Paper className={classes.carousel}>
            {
              this.state.predictionHasBeenMade ?
                  <ResultVisualizer
                    model={this.props.model}
                    boxes={this.state.lastBoxes}
                    onBoxSelected={this.setSelectedBox}/> :
                  <ImageCarousel
                      sampleImages={images}
                      setCurrentSampleImage={this.setCurrentSampleImage}/>
            }
          </Paper>
        </div>
    );
  }
}

export default withStyles(styles)(ImageView);