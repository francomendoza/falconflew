var React = require('react');

var PropertyFormElement = React.createClass({

  handlePropertyChange: function(event){
    // create an object that reducer can easily use to determine where value should go in global state
    var obj = {};
    // obj.property = this.props.property; // entire property not necessary? only value
    obj.value = event.target.value;
    obj.index = this.props.index;
    obj.templateInstanceId = this.props.templateInstanceId; //probably not even necessary if global state knows which template is "active"
    this.props.handlePropertyChange(obj);
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
