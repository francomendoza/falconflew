var React = require('react');
var Autocomplete = require('react-autocomplete');
import { requestTemplateByName, retrieveTemplates } from '../../../modules/templates/actions/template_actions';

var TemplateList = React.createClass({

  onChange: function(event, value){
    this.props.dispatch(requestTemplateByName(value));
  },

  onSelect: function(value, item){
    this.props.dispatch(retrieveTemplates(value));
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
        <h2>Search Templates</h2>
        <Autocomplete
        onChange = { this.onChange }
        onSelect = { this.onSelect }
        getItemValue = { (item) => item.node_label[0] }
        items = { this.props.autocompleteItems }
        renderItem={ (item, isHighlighted) => (
            <div
              style = {isHighlighted ? styles.highlightedItem : styles.item}
              key = { item._id["$oid"] }
              id = { item._id["$oid"] }
            >{ item.node_label[0] }</div>
          ) } />
      </div>;
  }
});

module.exports = TemplateList;
