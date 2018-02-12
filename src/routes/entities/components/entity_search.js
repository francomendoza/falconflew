import React from 'react';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import SearchTokens from './search_tokens';
import EntitySearchResults from './entity_search_results';
import { addToken, shortestPathSearch, entitySearch } from '../../../modules/entities/actions/entity_actions';

class EntitySearch extends React.Component {
  onChange = (e) => {
    this.props.dispatch(entitySearch(e.target.value))
  }

  onSelect = (value, item) => {
    console.log(`selected ${value}`)
    //this.props.dispatch(showEntity(item.entity_id, item.node_label))
    this.props.dispatch(addToken(item.entity_id, item.node_label))
  }

  search = () => {
    this.props.dispatch(shortestPathSearch());
  }

  render() {
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
      <EntitySearchResults entitySearchResults = {this.props.entitySearchResults}/>
    </div>
  }
}

function mapStateToProps(state){
  return {
    entitySearchAutocomplete: state.entitySearchAutocomplete,
    displayedTokens: state.displayedTokens,
    entitySearchResults: state.entitySearchResults
  };
}

export default connect(mapStateToProps)(EntitySearch);
