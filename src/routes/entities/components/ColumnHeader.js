import React from 'react';

export default class ColumnHeader extends React.Component {
  render() {
    return <th colSpan = {this.props.colspan || 1}>
      { this.props.title }
    </th>
  }
}
