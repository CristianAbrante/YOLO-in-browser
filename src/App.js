import React, { Component } from 'react';

// Components imports
import theme from './components/theme';
import NavigationBar from './components/navigation-bar/NavigationBar';
import ViewsManager from './components/views/ViewsManager'
import ModelSelector from './components/model-selector/ModelSelector';

// Material UI imports
import {MuiThemeProvider} from '@material-ui/core/styles';

class App extends Component {
  yolo;
  state = {
    viewsManager: new ViewsManager(this.yolo),
  };

  updateView = () => {
    this.setState({viewsManager: this.state.viewsManager});
  };

  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <div>
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
