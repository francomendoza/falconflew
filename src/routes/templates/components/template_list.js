import React from 'react';
import Autocomplete from 'react-autocomplete';
import { requestTemplateByName, retrieveTemplates } from '../../../modules/templates/actions/template_actions';
import { MenuItem } from 'material-ui/Menu';

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
        backgroundColor: "lightgrey"
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
            <MenuItem
              style = {isHighlighted ? styles.highlightedItem : styles.item}
              key = { item._id["$oid"] }
              id = { item._id["$oid"] }
            >{ item.node_label[0] }</MenuItem>
          ) } />
      </div>;
  }
});

export default TemplateList;
