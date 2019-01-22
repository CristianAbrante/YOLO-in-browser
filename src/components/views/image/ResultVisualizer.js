import React, {Component} from 'react';

import ClassCard from './ClassCard';

import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

const CARDS = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

const styles = {
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'stretch',
  },
  box: {
    width: '70%',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  info: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
  }
};

class ResultVisualizer extends Component {
  render() {
    let {classes} = this.props;
    return(
      <div className={classes.root}>
        <Paper className={classes.info}>
          <Typography variant='h2' className={classes.title}>
            yolo
          </Typography>
            <Divider/>
          <Typography variant='h6' className={classes.title}>
            v3Tiny
          </Typography>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Chip label={"time: "} color='secondary' style={{margin: '10px'}} />
            <Chip label={"Recognized classes: "} color='secondary' />
          </div>
        </Paper>
        <Paper className={classes.box}>
          {CARDS.map(card => {
            return <ClassCard/>
          })}
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ResultVisualizer);