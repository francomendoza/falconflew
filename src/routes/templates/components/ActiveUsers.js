import React from 'react';
import Avatar from 'material-ui/Avatar';
import PersonPinIcon from 'material-ui-icons/PersonPin';

export default class ActiveUsers extends React.Component {
  render() {
    return (
      <div>
        {this.props.userIds.map((userId) => {
          return (
            <Avatar
              key={userId}
              style={{height: 20, width: 20}}
            >
              <PersonPinIcon />
            </Avatar>
          )
        })}
      </div>
    );
  }
}
