import React from 'react';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import {entitySearch} from '../actions/actions';

var EntitySearch = React.createClass({
  onChange: function(e) {
    this.props.dispatch(entitySearch(e.target.value))
  },

  onSelect: function(value, item) {
    console.log(`selected ${value}`)
  },
  render: function() {
    var styles = {
        highlightedItem: { backgroundColor: 'blue' },
        item: { backgroundColor: 'white' }
    }
    return <Autocomplete
      onChange = { this.onChange }
      onSelect = { this.onSelect }
      getItemValue = { (item) => item.node_properties[0].value  }
      items = {this.props.entitySearchAutocomplete || []}
      renderItem = { (item, isHighlighted) => {
        return <div style= {isHighlighted ? styles.highlightedItem : styles.item}>{item.node_properties[0].value}</div>
      } }
    />;
  }
});

function mapStateToProps(state){
  return {
    entitySearchAutocomplete: state.entitySearchAutocomplete
  }
}

export default connect(mapStateToProps)(EntitySearch);
