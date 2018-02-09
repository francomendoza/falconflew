import React from 'react';
import { TextField } from 'material-ui';

var PropertyFormElement = React.createClass({

  handlePropertyChange: function(event){
    this.props.handlePropertyChange(event.target.value);
  },

  render: function(){
    var property = this.props.property;
    return <div>
        <TextField
          floatingLabelText = { property.name }
          type = { property.type }
          name = { property.name }
          value = { property.value }
          disabled = { !!property.readonly }
          onChange={ this.handlePropertyChange }
          onClick = { this.props.clickDivHandler }/>
      </div>;
  }
});

export default PropertyFormElement;
