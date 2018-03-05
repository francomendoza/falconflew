import React from 'react';
import { routeActions } from 'react-router-redux';
import { fetchNewTemplate } from '../../../modules/templates/actions/template_actions';
import { showEntity } from '../../../modules/entities/actions/entity_actions';
import Paper from 'material-ui/Paper';

export default class EntityCard extends React.Component {

  chooseTemplate = (label) => {
    return (e) => {
      e.preventDefault();
      //this.props.dispatch(routeActions.push(`/template_form/${label}`))
      this.props.dispatch(fetchNewTemplate(label));
    }
  }

  onClickHandler = (event) => {
    this.props.dispatch(showEntity(this.props.entity.entity_id, this.props.entity.node_label));
  }

  render() {

    let styles = {
      padding: '10px',
      margin: '10px',
    }

    let links = (this.props.available_actions || []).map((label, index) => {
      return <li key = { index }><a href='#' onClick={ this.chooseTemplate(label) }>Use in { label }</a></li>
    })

    return(
      <Paper
        style={styles}
        onClick={this.onClickHandler}
      >
        <div>{ this.props.entity.node_label }</div>
        <br/>
        { this.props.entity.node_properties.map(function(node_property){
          return <div key = { node_property.name }>{ node_property.name }: { node_property.value }</div>
        }) }
        { links }
      </Paper>
    );
  }
}
