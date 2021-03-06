import React from 'react';
import PropTypes from 'prop-types';
import {
  autocompleteEntitiesByLabel,
  updateTemplateInstances,
  toggleFormVisibility,
  fetchAndShowTemplate,
  generateTemplateInstance,
} from '../../../modules/templates/actions/template_actions';
import EntityCard from '../../entities/components/entity_card';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import './relatedNodeElement.css';
import MatUiAutosuggest from './MatUiAutosuggest';

export default class RelatedNodeElement extends React.Component {

  componentWillMount = () => {
    // hacky for sure but we need to make the server call for this template, cant make call in generateTemplate function, and cant do logic on backend
    if(this.props.related_node.default_child){
      this.props.dispatch(updateTemplateInstances(this.props.templateInstanceId, this.props.related_node.default_child))
    }
  }

  onChange = ({value}) => {
    this.props.dispatch(
      autocompleteEntitiesByLabel(
        this.props.related_node.template_label[0],
        this.props.related_node.match_type,
        value
      )
    );
  }

  onSelect = (entityIdIndex) => {
    return (evt, {suggestionValue}) => this.props.handleRelationshipChange(
      suggestionValue,
      entityIdIndex
    );
  }

  onSelectChange = (event) => {
    this.props.dispatch(updateTemplateInstances(this.props.templateInstanceId, event.target.value));
  }

  toggleShow = async () => {
    if (this.props.templateInstanceId) {
      // display
      this.props.dispatch(toggleFormVisibility(this.props.templateInstanceId));
    } else {
      // fetch and display
      let templateInstanceId = await this.props.dispatch(generateTemplateInstance(
        this.props.related_node.template_label[0]
      ));
      this.props.dispatch(fetchAndShowTemplate(
        templateInstanceId,
        this.props.parentTemplateInstanceId,
        this.props.index
      ));
    }
  }

  render() {
    let autocomplete_field,
      select_template,
      selected_entities;

    if (this.props.related_node.count_limit === -1 ||
      this.props.related_node.entity_id === null ||
      this.props.related_node.entity_id.length < this.props.related_node.count_limit) {
      autocomplete_field = <MatUiAutosuggest
        handleSuggestionsFetchRequested={this.onChange}
        onSuggestionSelected={this.onSelect(this.props.related_node.entity_id ? this.props.related_node.entity_id.length : 0)}
        getSuggestionValue={(item) => item.entity_id}
        suggestions={this.props.entitiesByLabel ? (this.props.entitiesByLabel[this.props.related_node.template_label[0]] || []) : []  }
        renderMenuItem={(suggestion) => (
          <div
            key = { suggestion.entity_id }
            id = { suggestion.entity_id }
          >{ suggestion.node_properties.map(function(property, index){
            return <div key = { index }>{ property.name }: { property.value }</div>
          }) }
          </div>
        ) } />
    }

    if(this.props.related_node.match_type === "child" && this.props.related_node.children_templates){
      select_template = <div className='select-template'>
        <Select
          value = { this.props.related_node.default_child || "" }
          onChange = { this.onSelectChange }>
          <MenuItem key = { 'blank' } value = {''}></MenuItem>
          { this.props.related_node.children_templates.map(function(template_label, index){
            return (
              <MenuItem
              key = { index }
              value = { template_label }>{ template_label }
              </MenuItem>
            );
          }) }
        </Select>
      </div>
    }

    if (this.props.related_node.entity_id) {
      selected_entities = this.props.related_node.entity_id.map((entity_id) => {
        let entity = this.props.entitiesByLabel[
          this.props.related_node.template_label[0]
        ].find((entity) => {
          return entity.entity_id === entity_id;
        });
        return <EntityCard
        entity = { entity }
        key = { entity.entity_id + 'card' }/>
      });
    }

    return (
      <div className = "relationship_element" style = {this.props.style}>
        <div
          className='relatedNodeElement-container'
          onClick = { this.props.clickDivHandler }
        >
          <label>{ this.props.related_node.view_label || this.props.related_node.template_label }: </label>
          { autocomplete_field }
          { selected_entities }
          { select_template }
          <Button
            onClick={this.toggleShow}
            variant='raised'
          >Create New</Button>
        </div>
      </div>
    );
  }
}

RelatedNodeElement.propTypes = {
  parentTemplateInstanceId: PropTypes.number.isRequired,
}
