import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {withStyles} from '@material-ui/core';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
        'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=255&q=60',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=255&q=60',
  },
];

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
    maxHeight: '1000px',
    maxWidth: '100%',
    margin: 'auto'
  },
};

class ImageCarousel extends Component{
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState({activeStep: this.state.activeStep + 1});
  };

  handleBack = () => {
    this.setState({activeStep: this.state.activeStep - 1});
  };

  handleStepChange = (step) => {
    this.setState({activeStep: step});
  };

  render() {
    let {classes} = this.props;
    let maxSteps = tutorialSteps.length;
    return(
        <div className={classes.root}>
          <SwipeableViews
              index={this.state.activeStep}
              onChangeIndex={this.handleStepChange}
              enableMouseEvents>
            {tutorialSteps.map((step, index) => (
                <div key={step.label} >
                  {Math.abs(this.state.activeStep - index) <= 2 ? (
                      <img className={classes.img} src={step.imgPath} alt={step.label} />
                  ) : null}
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