import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {withStyles} from '@material-ui/core';

const styles = {
  root: {
    margin: 0,
    maxHeight: '100%',
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 10,
    paddingLeft: 10,
    backgroundColor: 10,
  },
  img: {
    display: 'block',
    overflow: 'hidden',
    maxHeight: '300px',
    maxWidth: '100%',
    margin: 'auto'
  },
};

class ImageCarousel extends Component{
  state = {
    activeStep: 0,
  };

  componentDidMount() {
    this.props.setCurrentSampleImage(this.state.activeStep);
  }

  handleNext = () => {
    this.props.setCurrentSampleImage(this.state.activeStep + 1);
    this.setState({activeStep: this.state.activeStep + 1});
  };

  handleBack = () => {
    this.props.setCurrentSampleImage(this.state.activeStep - 1);
    this.setState({activeStep: this.state.activeStep - 1});
  };

  handleStepChange = (step) => {
    this.props.setCurrentSampleImage(step);
    this.setState({activeStep: step});
  };

  render() {
    let images = this.props.sampleImages;
    let {classes} = this.props;
    let maxSteps = images.length;
    return(
        <div className={classes.root}>
          <SwipeableViews
              index={this.state.activeStep}
              onChangeIndex={this.handleStepChange}
              enableMouseEvents>
            {images.map(image => (
                <div key={image} >
                  <img className={classes.img} src={image} alt=""/>
                </div>
            ))}
          </SwipeableViews>
          <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={this.state.activeStep}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === maxSteps - 1}>
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
          />
        </div>
    )
  }
}

export default withStyles(styles)(ImageCarousel);