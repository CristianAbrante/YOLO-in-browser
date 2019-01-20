import React, {Component} from 'react';

// Material UI imports
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';

class NavigationBar extends Component {
  handleChange = (event, newValue) => {
    this.props.viewsManager.setCurrentView(newValue);
    this.props.updateView();
  };

  render() {
    return (
      <AppBar position="static" style={{margin: 0, padding: 0}}>
        <Tabs
            centered
            indicatorColor="secondary"
            onChange={this.handleChange}
            textColor="secondary"
            value={this.props.viewsManager.currentViewIndex}>
          {
            this.props.viewsManager.getCurrentViewsIcons().map(
                icon => {
                  return <Tab key={icon} icon={<Icon>{icon}</Icon>}/>
                }
            )
          }
        </Tabs>
      </AppBar>
    );
  }
}

export default NavigationBar;