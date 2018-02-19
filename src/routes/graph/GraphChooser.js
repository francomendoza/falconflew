import React from 'react';

export default class GraphChooser extends React.Component {
  state = {
    types: []
  }

  componentWillMount = () => {
    // if (this.props.graphChooserType) {
      fetch("http://localhost:3000/graph_models/templates_by_type?type=" + this.props.graphChooser.type)
      .then(response => response.json())
      .then(data => this.setState({ types: data }))
    // }
  }

  render() {
    let styles = {
      graphChooser: {
        textAlign: "center"
      },
      graphChooser_select: {
        width: "100px"
      },
      graphChooser_exit: {
        display: "inline-block",
        fontSize: "20px",
        fontWeight: "bold",
        margin: "5px"
      }
    }

    return (
      <div style = { styles.graphChooser }>
        <select
          style = { styles.graphChooser_select }
          onChange = { this.props.onGraphChooserSelect(this.props.graphChooser.graphInstanceIndex, this.props.graphChooser.parentTemplateInstanceId, this.props.currentTemplateInstanceId) }>
          <option></option>
          { this.state.types.map((type_label, index) => {
            return <option key = { index }>{ type_label }</option>
          }) }
        </select>
        <div
          style = { styles.graphChooser_exit }
          onClick = { this.toggleGraphChooser }>
          x
        </div>
      </div>
    )
  }
}
