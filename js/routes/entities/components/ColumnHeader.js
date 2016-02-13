import React from 'react';

export default React.createClass({

  render: function () {
    return <th>
      { this.props.column.node }
    </th>
  }
})
