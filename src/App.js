import React, { Component } from 'react';
import CanvasManipulator from './image/CanvasManipulator';
import ModelSelector from './components/model-selector/ModelSelector';
import theme from './components/theme';

import {MuiThemeProvider} from '@material-ui/core/styles';

class App extends Component {
  yolo;
  inputRef;
  canvasRef;
  canvasManipulator;

  state = {
    model: 'v3tiny',
  };

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.canvasManipulator = new CanvasManipulator(this.canvasRef.current);
  }

  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <div>
            <ModelSelector
                yolo={this.yolo}/>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
