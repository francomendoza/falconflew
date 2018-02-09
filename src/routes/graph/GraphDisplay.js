import React from 'react';
import { RaisedButton, Card, CardHeader, CardText, CardMedia, TextField, ClearFix, Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui';

export default React.createClass({

  render: function () {

    return (
      <div style = { { textAlign: "center" } }>
        <Card>
          <CardText>
            { this.props.graph.node_instances[0].label }
            { Object.keys(this.props.graph.node_instances[0].properties).map((propertyKey) => {
              return (
                <div>
                  <div>{propertyKey} : { this.props.graph.node_instances[0].properties[propertyKey] }</div>
                </div>
              )
            }) }
          </CardText>
        </Card>
      </div>
    )
  }
})
