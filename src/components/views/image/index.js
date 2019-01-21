import React, {Component} from 'react';

import './index.css';
import ImageCarousel from './ImageCarousel';

import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core';

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
    width: '100%',
    background: 'grey',
  },
  canvas: {
    margin: 'auto',
    background: 'white'
  }
};

class ImageView extends Component {
  render() {
    let {classes} = this.props;
    return (
        <div className={"container " + classes.container}>
          <Paper className={classes.canvasContainer}>
            <canvas className={classes.canvas}>
              Your browser does not support canvas
            </canvas>
          </Paper>
          <Paper className={classes.buttonsContainer}>
            <Fab
                className={classes.button}
                variant='extended'
                color='secondary'>
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
            <ImageCarousel/>
          </Paper>
        </div>
    );
  }
}

export default withStyles(styles)(ImageView);