import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import Chip from '@material-ui/core/Chip';
import {withStyles} from '@material-ui/core/';

function importAll(r) {
  let icons = {};
  r.keys().map(
      item => {
        let name = item.replace('./', '').replace('.png', '');
        icons[name] = r(item);
      });
  return icons;
}
const icons = importAll(require.context('./../../../yolo/config/classes/icons/', false, /\.(png|jpe?g|svg)$/));

const styles = {
  root: {
    margin: 6,
    height: 242,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    jutifyContent: 'center',
    maxWidth: '300px',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
  }
};

class ClassCard extends Component {
  render() {
    let {classes, box} = this.props;
    return (
        <Card className={classes.root}>
          <CardActionArea
            onClick={() => {this.props.onBoxSelected(this.props.index)}}>
            <CardContent className={classes.container}>
              <div style={{display: 'flex'}}>
                <img style={{margin: 'auto'}} src={icons[box.class.replace(' ', '-')]} alt=""/>
              </div>
              <Typography align='center' gutterBottom variant="h5" component="h2">
                {box.class}
              </Typography>
              <div className={classes.infoContainer}>
                <Chip label={"accuracy: " + (Math.round(box.score * 1000) / 1000)} color="secondary"/>
                <div style={{margin: 5}}>
                  <Chip label={"x: " + Math.round(box.left) + " y: " + Math.round(box.top)} color="primary"/>
                  <Chip label={"w: " + Math.round(box.width) + " h: " + Math.round(box.height)} color="primary"/>
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
    );
  }
}

export default withStyles(styles)(ClassCard);