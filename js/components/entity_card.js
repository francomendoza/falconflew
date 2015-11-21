import React from 'react';

var EntityCard = React.createClass({

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
      </div>);
  }

});

module.exports = EntityCard;