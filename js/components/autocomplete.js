var Empty = require('./empty');
var Autocomplete = React.createClass({

    getInitialState: function() {
      return {
          has_text: false,
          current_text: ''
      };
    },

    getMatches: function() {
       var matches = _.filter(this.props.options, function(el){
          el.label === this.state.current_text
       });
       return matches;
    },

    handleTextInput: function(e){
      if(this.target.value.replace(/^\s+|\s+$/g, '') === ''){
        this.setState({has_text: false});
      }
      this.setState({current_text: this.target.value})
    },

    render: function() {
      var dropdown = <Empty/>;
      if(this.state.has_text) {
        dropdown = <div>
          {this.getMatches().map(function(match){ return <li>{match.label}</li>; })}
        </div>
      }
      return (
        <div>
        <input type='text' onChange={this.handleTextInput}/>
        {dropdown}
        </div>
      );
    }

});

module.exports = Autocomplete;
