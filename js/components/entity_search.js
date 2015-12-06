import React from 'react';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import SearchTokens from './search_tokens';
import { addToken, shortestPathSearch, entitySearch, showEntity } from '../modules/actions/entity_actions';

var EntitySearch = React.createClass({
  onChange: function(e) {
    this.props.dispatch(entitySearch(e.target.value))
  },

  onSelect: function(value, item) {
    console.log(`selected ${value}`)
    //this.props.dispatch(showEntity(item.entity_id, item.node_label))
    this.props.dispatch(addToken(item.entity_id, item.node_label))
  },

  search: function(){
    this.props.dispatch(shortestPathSearch());
  },

  render: function() {
    var styles = {
        highlightedItem: { backgroundColor: 'blue' },
        item: { backgroundColor: 'white' }
    }

    return <div>
      <Autocomplete
        onChange = { this.onChange }
        onSelect = { this.onSelect }
        getItemValue = { (item) => item.node_properties[0].value }
        items = { this.props.entitySearchAutocomplete || [] }
        renderItem = { (item, isHighlighted) => {
          return <div style= { isHighlighted ? styles.highlightedItem : styles.item }>{ item.node_properties[0].value }</div>
      } }/>
      <button onClick={this.search}>Search</button>
      <SearchTokens displayedTokens = {this.props.displayedTokens} />
    </div>
  }
});

function mapStateToProps(state){
  return {
    entitySearchAutocomplete: state.entitySearchAutocomplete,
    displayedTokens: state.displayedTokens
  };
}

export default connect(mapStateToProps)(EntitySearch);
