import React, {Component} from 'react';

// Components imports
import VersionSelector from './VersionSelector';
import Yolo from '../../yolo/yolo';

// Material UI imports
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';


const VERSIONS = ['v1', 'v2', 'v3'];

class ModelSelector extends Component {
  state = {
    dialogOpen: true,
    modelLoading: false,
    model: {
      tiny: true,
      version: VERSIONS[2],
    }
  };

  onTinyChange = event => {
    let model = {
      tiny: event.target.checked,
      version: this.state.model.version,
    };
    this.setState({model: model});
  };

  onVersionChange = event => {
    let model = {
      tiny: this.state.model.tiny,
      version: event.target.value,
    };
    this.setState({model: model});
  };

  onChangeMethods = {
    tiny: this.onTinyChange,
    version: this.onVersionChange,
  };

  getVersionName = () => {
    let model = this.state.model;
    return model.tiny ?
        model.version + 'tiny' :
        model.version;
  };

  loadModel = () => {
    this.setState({modelLoading: true});
    this.props.onModelSelected(this.getVersionName(),
        () => {this.setState({dialogOpen: false})});
  };

  renderSelector = () => {
    return (
        <div>
          <VersionSelector
              model={this.state.model}
              versions={VERSIONS}
              onChange={this.onChangeMethods}/>
          <Fab
              style={{margin: "10px"}}
              variant="extended"
              color="secondary"
              onClick={this.loadModel}>
            Load Model
            <CloudUploadIcon style={{margin: 5}}/>
          </Fab>
        </div>
    )
  };

  onModelLoading = () => {
    if (this.state.modelLoading) {
      return (<CircularProgress color="secondary" style={{margin: 20}}/>);
    } else {
      return this.renderSelector();
    }
  };

  render() {
    return(
        <Dialog
          open={this.state.dialogOpen}
          fullWidth={true}>
          <Paper align="center">
            <Typography
                align="center"
                variant="overline">
              Select the model version
            </Typography>
            <Divider/>
            {this.onModelLoading()}
          </Paper>
        </Dialog>
    )
  }
}

export default ModelSelector;