import React from 'react';
import { TextField } from 'material-ui';

export default class PropertyFormElement extends React.Component {
  handlePropertyChange = (event) => {
    this.props.handlePropertyChange(event.target.value);
  }

  render() {
    var property = this.props.property;
    return <div>
        <TextField
          label = { property.name }
          type = { property.type }
          name = { property.name }
          value = { property.value || '' }
          disabled = { !!property.readonly }
          onChange={ this.handlePropertyChange }
          onClick = { this.props.clickDivHandler }/>
      </div>;
  }
}
