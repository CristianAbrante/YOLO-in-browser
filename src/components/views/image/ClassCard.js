import React, {Component} from 'react';

import Person from './../../../yolo/config/classes/icons/person.png';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import Chip from '@material-ui/core/Chip';
import {withStyles} from '@material-ui/core/';

function importAll(r) {
  let images = [];
  r.keys().map(item => { images.push(r(item)); });
  return images;
}
const images = require.context('./../../../yolo/config/classes/icons/', false, /\.(png|jpe?g|svg)$/).keys();
console.log(images);

const styles = {
  root: {
    margin: 6
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    jutifyContent: 'center'
  }
};

class ClassCard extends Component {
  render() {
    let {classes} = this.props;
    return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent className={classes.container}>
              <div style={{display: 'flex'}}>
                <img style={{margin: 'auto'}} src={Person} alt=""/>
              </div>
              <Typography align='center' gutterBottom variant="h5" component="h2">
                Person
              </Typography>
              <div>
                <Chip label={"x: 1156" + " y: 3456"} color="primary"/>
                <Chip label={"w: 234" + " h: 567"} color="primary"/>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
    );
  }
}

export default withStyles(styles)(ClassCard);