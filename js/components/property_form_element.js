var PropertyFormElement = React.createClass({
  contextTypes: {
      router: React.PropTypes.func
  },

  getInitialState: function(){
    return this.props.property
  },

  handleChange: function(event){
    this.setState({value: event.target.value},function(){
      this.props.updateParentState(this.state);
    });
  },

  render: function(){
    var property = this.props.property;
      return <div>
          <label>{ property.name }: </label>
          <input type = { property.type }
          name = { property.name }
          value = { property.value }
          onChange={this.handleChange}/>
      </div>;
  }
});
