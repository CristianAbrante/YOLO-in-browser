import React, { Component } from 'react';

// Components imports
import theme from './components/theme';
import NavigationBar from './components/navigation-bar/NavigationBar';
import ViewsManager from './components/views/ViewsManager'
import ModelSelector from './components/model-selector/ModelSelector';

// Material UI imports
import {MuiThemeProvider} from '@material-ui/core/styles';
import Yolo from './yolo/yolo';

class App extends Component {
  state = {
    yolo: undefined,
    viewsManager: undefined,
  };

  loadModel = (version, callback) => {
    console.log('loading model...');
    let yolo = new Yolo(version);
    yolo.loadModel().then(
        () => {
          console.log('¡model ' + version + ' loaded!');
          this.setState({yolo: yolo});
          this.setViews();
          callback();
        }
    )
  };

  constructor(props) {
    super(props);
    this.state.viewsManager = new ViewsManager(this.state.yolo);
  }

  setViews = () => {
    this.setState({viewsManager: new ViewsManager(this.state.yolo)});
  };

  updateView = () => {
    this.setState({viewsManager: this.state.viewsManager});
  };
//<ModelSelector
// onModelSelected = {this.loadModel}/>
  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <div>
            <ModelSelector
                onModelSelected = {this.loadModel}/>
            <NavigationBar
                viewsManager={this.state.viewsManager}
                updateView={this.updateView}/>
            {this.state.viewsManager.getCurrentViewComponent()}
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
