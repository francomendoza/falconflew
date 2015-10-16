var React = require('react');
// var Router = require('react-router');
// var Link = Router.Link;
import db from '../../example_template';
var Autocomplete = require('react-autocomplete');
import { requestTemplateByName, retrieveTemplates } from '../actions/actions';
import { pushState } from 'redux-router';

var TemplateList = React.createClass({

  onChange: function(event, value){
    this.props.dispatch(requestTemplateByName(value));
  },

  onSelect: function(value, item){
    this.props.dispatch(retrieveTemplates(value));
    // this.props.dispatch(pushState(null, '/template_form/'+value));
  },

  render: function() {

    var styles = {
      highlightedItem: {
        backgroundColor: "blue"
      },
      item: {
        backgroundColor: "white"
      }
    }
    return <div>
        <h2>Templates</h2>
        <Autocomplete 
        onChange = { this.onChange } 
        onSelect = { this.onSelect }
        getItemValue = { (item) => item._id["$oid"] }
        items = { this.props.autocompleteItems } 
        renderItem={ (item, isHighlighted) => (
            <div
              style = {isHighlighted ? styles.highlightedItem : styles.item}
              key = { item._id["$oid"] }
              id = { item._id["$oid"] }
            >{ item.node_label }</div>
          ) } />
      </div>;
  }
});

module.exports = TemplateList;
