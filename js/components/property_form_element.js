var React = require('react');

var PropertyFormElement = React.createClass({

  handlePropertyChange: function(event){
    this.props.handlePropertyChange(event.target.value);
  },

  render: function(){
    var property = this.props.property;
      return <div className="property_element">
          <label>{ property.name }: </label>
          <input type = { property.type }
          name = { property.name }
          value = { property.value }
          onChange={ this.handlePropertyChange }
          onClick = { this.props.clickHandler }/>
      </div>;
  }
});

module.exports = PropertyFormElement;
