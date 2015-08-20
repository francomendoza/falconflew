var PropertyFormElement = React.createClass({
  contextTypes: {
      router: React.PropTypes.func
  },

  getInitialState: function(){
    return this.props.property
  },

  handleChange: function(event){
    var obj = this.props.property;
    obj.data.value = event.target.value;
    obj.index = this.props.index;
    obj.node_property = true;
    // this.setState({value: event.target.value},function(){
      this.props.updateParentState(obj);
    // });
  },

  render: function(){
    var property = this.props.property.data;
      return <div>
          <label>{ property.name }: </label>
          <input type = { property.type }
          name = { property.name }
          value = { property.value }
          onChange={this.handleChange}/>
      </div>;
  }
});
