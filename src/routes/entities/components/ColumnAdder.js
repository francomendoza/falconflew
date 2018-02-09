import React from "react";

export default  React.createClass({

  render: function () {
    return <th
      onClick = { this.props.onClick }>
      +
    </th>
  }
})
