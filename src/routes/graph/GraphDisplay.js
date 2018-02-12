import React from 'react';
import { Card, CardContent } from 'material-ui';

export default class GraphDisplay extends React.Component {
  render() {
    return (
      <div style = { { textAlign: "center" } }>
        <Card>
          <CardContent>
            { this.props.graph.node_instances[0].label }
            { Object.keys(this.props.graph.node_instances[0].properties).map((propertyKey) => {
              return (
                <div>
                  <div>{propertyKey} : { this.props.graph.node_instances[0].properties[propertyKey] }</div>
                </div>
              )
            }) }
          </CardContent>
        </Card>
      </div>
    )
  }
}
