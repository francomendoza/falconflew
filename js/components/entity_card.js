import React from 'react';
import { Link } from 'react-router';
import { pushState } from 'redux-router';
import { retrieveTemplates } from '../actions/actions';

var EntityCard = React.createClass({

  chooseTemplate: function(label) {
    return (e) => {
      e.preventDefault();
      //this.props.dispatch(pushState(null, `/template_form/${label}`))
      this.props.dispatch(retrieveTemplates(label))
    }
  },

  render: function(){

    let styles = {
      border: "black solid 1px",
      padding: "5px",
      width: "20%"
    }

    return(
      <div style = {styles} onClick = { this.props.onClickHandler }>
        { this.props.entity.node_properties.map(function(node_property){
          return <div key = { node_property.name }>{ node_property.name }: { node_property.value }</div>
        }) }
        { this.props.available_actions.map((label) => {
            return <li><a href='#' onClick={ this.chooseTemplate(label) }>Use in { label }</a></li>
        }) }
      </div>);
  }

});

module.exports = EntityCard;