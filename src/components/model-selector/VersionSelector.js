import React from 'react';

// Material UI imports
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel
  from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch/Switch';

const VersionSelector = props => {
  return(
      <div>
        <div>
          <FormControlLabel
              control={
                <Switch
                    checked={props.model.tiny}
                    onChange={props.onChange.tiny}/>
              }
              label="tiny"/>
        </div>
        <FormControl>
          <Select
              native
              value={props.model.version}
              onChange={props.onChange.version}>
            {
              props.versions.map(function(version) {
                return <option value={version} key={version}>{version}</option>
              })
            }
          </Select>
        </FormControl>
      </div>
  )
};

export default VersionSelector;