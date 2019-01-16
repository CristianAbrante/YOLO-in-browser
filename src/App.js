import React, { Component } from 'react';
import Yolo from './yolo/yolo';

class App extends Component {
  yolo;

  loadModel = () => {
    this.yolo = new Yolo('v3');
    this.yolo.loadModel().then(
        function() {
          console.log(this.yolo.model)
        }
    )
  };

  render() {
    return (
      <div>
        This is the initial configuration of YOLO
        <input type="button" value="load model" onClick={this.loadModel}/>
      </div>
    );
  }
}

export default App;
