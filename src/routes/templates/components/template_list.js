import React from 'react';
import { requestTemplateByName, retrieveTemplates } from '../../../modules/templates/actions/template_actions';
import MatUiAutosuggest from './MatUiAutosuggest';

export default class TemplateList extends React.Component {
  onChange = ({value}) => {
    this.props.dispatch(requestTemplateByName(value));
  }

  onSelect = (evt, {suggestionValue}) => {
    this.props.dispatch(retrieveTemplates(suggestionValue));
  }

  render() {
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
}
