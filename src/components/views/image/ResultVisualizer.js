import React, {Component} from 'react';

import ClassCard from './ClassCard';

import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

const styles = {
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'stretch',
  },
  box: {
    width: '70%',
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
    let {classes, boxes, model} = this.props;
    return(
      <div className={classes.root}>
        <Paper className={classes.info}>
          <Typography variant='h2' className={classes.title}>
            Yolo
          </Typography>
            <Divider/>
          <Typography variant='h6' className={classes.title}>
            {model.config.name}
          </Typography>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Chip label={"time: "} color='secondary' style={{margin: '10px'}} />
            <Chip label={"Recognized classes: " + boxes.length} color='secondary' />
          </div>
        </Paper>
        <Paper className={classes.box}>
          {this.props.boxes.map(box => {
            return <ClassCard key={box.class + box.score} box={box}/>
          })}
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ResultVisualizer);