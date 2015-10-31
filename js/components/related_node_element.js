import React from 'react';
import Autocomplete from 'react-autocomplete';
import { autocompleteEntitiesByLabel } from '../actions/actions';

var RelatedNodeElement = React.createClass({

  clickDammit: function() {
    this.props.toggleShow(this.props.templateInstanceId);
  },

  onChange: function(event, value){
    this.props.dispatch(autocompleteEntitiesByLabel(this.props.templateInstancesByInstanceId[this.props.templateInstanceId].node_label, value));
  },

  onSelect: function(value, item){
    this.props.handleRelationshipChange(value);
  },

  render: function(){

    let templateInstance = this.props.templateInstancesByInstanceId[this.props.templateInstanceId];
    var styles = {
      highlightedItem: {
        backgroundColor: "gray"
      },
      item: {
        backgroundColor: "white"
      }
    }

    return (
      <div className="relationship_element">
        <div style = { { padding: "10px" } }>
          <label>{ templateInstance.node_label }: </label>
          <Autocomplete 
          initialValue = { this.props.related_node.entity_id }
          onChange = { this.onChange } 
          onSelect = { this.onSelect }
          getItemValue = { (item) => item.entity_id }
          items = { this.props.entitiesByLabel ? (this.props.entitiesByLabel[templateInstance.node_label] || []) : []  }
          renderItem={ (item, isHighlighted) => (
              <div
                style = {isHighlighted ? styles.highlightedItem : styles.item}
                key = { item.entity_id }
                id = { item.entity_id }
              >{ item.node_properties.map(function(property, index){
                return <div key = { index }>{ property.name }: { property.value }</div>
              }) }
              </div>
            ) } />
          <button onClick={ this.clickDammit }>Create New</button>
        </div>
      </div>
    );
  }
});

module.exports = RelatedNodeElement;