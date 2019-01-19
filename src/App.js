import React, { Component } from 'react';
import Yolo from './yolo/yolo';

class App extends Component {
  yolo;
  inputRef;
  canvasRef;

  state = {
    model: 'v3tiny',
  };

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  loadModel = () => {
    console.log('loading model...');
    this.yolo = new Yolo(this.state.model);
    this.yolo.loadModel().then(
        () => {
          console.log('¡model ' + this.state.model + ' loaded!');
        }
    )
  };

  loadImage = () => {
    let input = this.inputRef.current;
    let canvas = this.canvasRef.current;
    let image, fr, file;

    function createImage() {
      image = new Image();
      image.onload = imageLoaded;
      image.src = fr.result;
    }
    
    let imageLoaded = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      this.yolo.predict(image).then(
          blocks => {
            console.log(blocks);
            App.drawBoxes(ctx, blocks);
          }
      )
    };

    if (!input.files) {
      throw new Error('Your browser does not support file loader.');
    } else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = createImage;
      fr.readAsDataURL(file);
    }
  };

  static isAnImage(file) {
    return file.type.includes('image');
  }

  static drawBoxes(ctx, boxes) {
    boxes.map(boundingBox => {
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "red";
      ctx.rect(boundingBox.left, boundingBox.top, boundingBox.width, boundingBox.height);
      ctx.stroke();
    });
  }

  render() {
    return (
      <div>
        <input
            ref={this.inputRef}
            type="file"
            onChange={this.loadImage}/>
        <canvas ref={this.canvasRef}>
          Canvas unsupported
        </canvas>
        <input
            type="button"
            value="load model"
            onClick={this.loadModel}/>
      </div>
    );
  }
}

export default App;
