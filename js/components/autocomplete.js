// var Empty = require('./empty');
// var Autocomplete = React.createClass({

//     //getInitialState: function() {
//       //return {
//         //has_text: false,
//         //current_text: '',
//         //selected_option: null
//       //};
//     //},

//     //getMatches: function() {
//        //var that = this;
//        //var matches = _.filter(this.props.options, function(el){
//           //return el.label === that.state.current_text
//        //});
//        //return matches;
//     //},


//     //handleTextInput: function(e){
//       //if(e.target.value.replace(/^\s+|\s+$/g, '') === ''){
//         //this.setState({has_text: false});
//       //} else {
//         //this.setState({has_text: true});
//       //}

//       //this.setState({current_text: e.target.value})
//     //},

//     //handleInputSpecialKeys: function(e){
//       //console.log('Key code is:');
//       //console.log(e.keyCode);
//       //var matches = getMatches();
//       //if(e.keyCode === 40) { // down-arrow
//         //if(matches.length > 0 && this.state.selected_option == null) {
//           //this.setState({selected_option: matches.first.value})
//         //} else if (matches.length > 0) {
//           //var next_index = _.index(matches, function(el){ return el.value === this.state.selected_option })
//         //}
//         //var next_value = selected_option === null ? getMatches().first.value
//       //}
//     //},

//     render: function() {
//       var dropdown = <Empty/>;
//       var that = this;
//       if(this.state.has_text) {
//         dropdown = <div onKeyDown={this.handleDivSpecialKeys}>{this.getMatches().map(function(match){ 
//             var class = '';
//             if(match.value === that.state.selected_option){
//                 class = 'selected'
//             }
//             return <li className={class} value={match.value}>{match.label}</li>; })}</div>
//       }
//       return (
//         <div>
//           <input type='text' onChange={this.props.fetch}/>
//         {dropdown}
//         </div>
//       );
//     }

// });

// module.exports = Autocomplete;
