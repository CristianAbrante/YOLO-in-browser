import React, { Component } from 'react';
import Yolo from './yolo/yolo';

class App extends Component {
  yolo;

  state = {
    model: 'v3',
    tiny: false,
  };

  loadModel = () => {
    this.yolo = new Yolo('v3', false);
    this.yolo.loadModel().then(
        () => {
          console.log(this.yolo.model)
        }
    )
  };

  render() {
    return (
      <div>
        <input type="button" value="load model" onClick={this.loadModel}/>
      </div>
    );
  }
}

export default App;
