import React from 'react';

export default React.createClass({

  render: function () {
    return <th colSpan = {this.props.colspan || 1}>
      { this.props.title }
    </th>
  }
})
