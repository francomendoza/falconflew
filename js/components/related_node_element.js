import React from 'react';
import Autocomplete from 'react-autocomplete';
import { autocompleteEntitiesByLabel, updateTemplateInstances } from '../actions/actions';
import _ from 'lodash';
import EntityCard from './entity_card';

var RelatedNodeElement = React.createClass({

  clickDammit: function() {
    this.props.toggleShow(this.props.templateInstanceId);
  },

  onChange: function(event, value){
    this.props.dispatch(autocompleteEntitiesByLabel(this.props.related_node.template_label[0], this.props.related_node.match_type, value));
  },

  onSelect: function(entityIdIndex){
    return (value, item) => this.props.handleRelationshipChange(value, entityIdIndex);
  },

  onSelectChange: function(event){
    this.props.dispatch(updateTemplateInstances(this.props.templateInstanceId, event.target.value));
  },

  render: function(){

    let templateInstance = this.props.templateInstancesByInstanceId[this.props.templateInstanceId];
    let add_button,
      select_template,
      selected_entities;

    var styles = {
      highlightedItem: {
        backgroundColor: "gray"
      },
      item: {
        backgroundColor: "white"
      },
      autocomplete: {
        paddingBottom: "5px"
      }
    }

    if(this.props.related_node.count_limit === -1 || this.props.related_node.count_limit < this.props.relatedNodeCount) {
      add_button = <button onClick = { this.props.incrementRelatedNode }>Add</button>
    }

    if(this.props.related_node.match_type === "child" && this.props.related_node.children_templates){
      select_template = <select defaultValue = "" onChange = { this.onSelectChange }>
        <option key = { 'blank' } value = {''}></option>
        { this.props.related_node.children_templates.map(function(template_label, index){
          return <option key = { index } value = { template_label }>{ template_label }</option>
        }) }
      </select>
    }

    if(this.props.related_node.entity_id){
      selected_entities = this.props.related_node.entity_id.map((entity_id) => {
        let entity = _.find(this.props.entitiesByLabel[this.props.related_node.template_label[0]], (entity) => {
          return entity.entity_id === entity_id;
        });
        return <EntityCard 
        entity = { entity }
        key = { entity.id + 'card' }/>
      });
    }

    return (
      <div className = "relationship_element" style = {this.props.style}>
        <div style = { { padding: "10px" } } onClick = { this.props.clickDivHandler }>
          { _.times(this.props.relatedNodeCount, (index) => {
            return  <div key = { index } style = { styles.autocomplete }>
              <label>{ this.props.related_node.template_label }: </label>
              <Autocomplete 
                initialValue = { this.props.related_node.entity_id ? this.props.related_node.entity_id[index] : null }
                onChange = { this.onChange } 
                onSelect = { this.onSelect(index) }
                getItemValue = { (item) => item.entity_id }
                items = { this.props.entitiesByLabel ? (this.props.entitiesByLabel[this.props.related_node.template_label[0]] || []) : []  }
                renderItem = { (item, isHighlighted) => (
                  <div
                    style = {isHighlighted ? styles.highlightedItem : styles.item}
                    key = { item.entity_id }
                    id = { item.entity_id }
                  >{ item.node_properties.map(function(property, index){
                    return <div key = { index }>{ property.name }: { property.value }</div>
                  }) }
                  </div>
                ) } />
              </div>
          }) }
          { selected_entities }
          { select_template }
          <button onClick = { this.clickDammit }>Create New</button>
          { add_button }
        </div>
      </div>
    );
  }
});

module.exports = RelatedNodeElement;