var React = require('react');

var PropertyFormElement = React.createClass({
  contextTypes: {
      router: React.PropTypes.func
  },

  handleChange: function(event){
    var obj = this.props.property;
    obj.data.value = event.target.value;
    obj.index = this.props.index;
    obj.node_property = true;
    this.props.updateParentState(obj);
  },

  render: function(){
    var property = this.props.property.data;
      return <div className="property_element">
          <label>{ property.name }: </label>
          <input type = { property.type }
          name = { property.name }
          value = { property.value }
          onChange={this.handleChange}/>
      </div>;
  }
});

module.exports = PropertyFormElement;
