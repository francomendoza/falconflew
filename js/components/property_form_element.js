var PropertyFormElement = React.createClass({
  contextTypes: {
      router: React.PropTypes.func
  },

  handleChange: function(event){
      var obj = {};
      obj[this.props.name] = event.target.value;
      this.props.updateParentState(obj);
  },

  render: function(){
      return <div>
          <label>{ this.props.label }: </label>
          <input type='text'
          name={ this.props.name }
          onChange={this.handleChange}
          value={this.props.value}/>
      </div>;
  }
});
