var React = require('react');

var PropertyFormElement = React.createClass({
  contextTypes: {
      router: React.PropTypes.func
  },

  handlePropertyChange: function(event){
    // create an object that reducer can easily use to determine where value should go in global state
    var obj = {};
    obj.property = this.props.property; // entire property not necessary? only value
    obj.property.value = event.target.value;
    obj.index = this.props.index;
    obj.currentTemplateId = this.props.currentTemplateId; //probably not even necessary if global state knows which template is "active"
    this.props.handlePropertyChange(obj);
  },

  render: function(){
    var property = this.props.property;
      return <div className="property_element">
          <label>{ property.name }: </label>
          <input type = { property.type }
          name = { property.name }
          value = { property.value }
          onChange={this.handlePropertyChange}/>
      </div>;
  }
});

module.exports = PropertyFormElement;
