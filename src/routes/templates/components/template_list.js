import React from 'react';
import Autocomplete from 'react-autocomplete';
import { requestTemplateByName, retrieveTemplates } from '../../../modules/templates/actions/template_actions';
import { MenuItem } from 'material-ui/Menu';
import MatUiAutosuggest from './MatUiAutosuggest';

var TemplateList = React.createClass({

  onChange: function({value}){
    this.props.dispatch(requestTemplateByName(value));
  },

  onSelect: function(evt, {suggestionValue}){
    this.props.dispatch(retrieveTemplates(suggestionValue));
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
        <MatUiAutosuggest
          handleSuggestionsFetchRequested = { this.onChange }
          onSuggestionSelected = { this.onSelect }
          getSuggestionValue = { (suggestion) => suggestion.node_label[0] }
          suggestions = { this.props.autocompleteItems }
          renderMenuItem={ (item) => (
              <div
                key = { item._id["$oid"] }
                id = { item._id["$oid"] }
              >{ item.node_label[0] }</div>
            ) }
          />
      </div>;
  }
});

export default TemplateList;
