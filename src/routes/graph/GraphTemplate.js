import React from 'react';
import NodeInstance from './NodeInstance';
import GraphInstance from './GraphInstance';
import { Button, Card, CardContent } from 'material-ui';

export default class GraphTemplate extends React.Component {
  render() {
    let styles = {
      container: {
        textAlign: "center",
        width: "90%",
        marginLeft: "5%"
      },
      header: {
        fontSize: "20px",
        margin: "10px"
      }
    }

    return (
      <div style = { styles.container }>
        <Card>
          <CardContent>
            <div style = { styles.header }>New { this.props.template.label }</div>
            {
              (this.props.template.node_instances || []).map((node_instance, index) => {
                return <NodeInstance
                  key = { index }
                  instance = { node_instance }
                  handlePropertyChange = { this.props.handlePropertyChange(index) }/>
              })
            }
            {
              (this.props.template.graph_instances || []).map((graph_instance, index) => {
                return <GraphInstance
                  key = { index }
                  instance = { graph_instance }
                  graphInstanceIndex = { index }
                  parentTemplateInstanceId = { this.props.template.templateInstanceId }
                  onAddNewButtonClickType = { this.props.onAddNewButtonClickType }
                  onAddNewButtonClick = { this.props.onAddNewButtonClick }
                  onGraphInstanceSelect = { this.props.onGraphInstanceSelect(index) }/>
              })
            }
            <Button
              onClick = { this.props.onClickCreate }
              variant='raised'
            >Create</Button>
          </CardContent>
        </Card>
      </div>
    )
  }
}
