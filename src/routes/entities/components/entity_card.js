import React from 'react';
import { routeActions } from 'react-router-redux';
import { retrieveTemplates } from '../../../modules/templates/actions/template_actions';
import { showEntity } from '../../../modules/entities/actions/entity_actions';

var EntityCard = React.createClass({

  chooseTemplate: function(label) {
    return (e) => {
      e.preventDefault();
      //this.props.dispatch(routeActions.push(`/template_form/${label}`))
      this.props.dispatch(retrieveTemplates(label));
    }
  },

  onClickHandler: function(event){
    this.props.dispatch(showEntity(this.props.entity.entity_id, this.props.entity.node_label));
  },

  render: function(){

    let styles = {
      border: "black solid 1px",
      padding: "5px",
      borderRadius: "4px",
      boxShadow: "2px 2px 5px #888888"
    }

    let links = (this.props.available_actions || []).map((label, index) => {
      return <li key = { index }><a href='#' onClick={ this.chooseTemplate(label) }>Use in { label }</a></li>
    })

    return(
      <div style = {styles} onClick = { this.onClickHandler }>
        <div>{ this.props.entity.node_label }</div>
        <br/>
        { this.props.entity.node_properties.map(function(node_property){
          return <div key = { node_property.name }>{ node_property.name }: { node_property.value }</div>
        }) }
        { links }
      </div>);
  }

});

export default EntityCard;