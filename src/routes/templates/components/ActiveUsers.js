import React from 'react';
import Avatar from 'material-ui/Avatar';
import PersonPinIcon from 'material-ui-icons/PersonPin';

export default class ActiveUsers extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        {this.props.userIds.map((userId) => {
          return (
            <Avatar
              key={userId}
              style={{margin: '5px'}}
            >
              <PersonPinIcon />
            </Avatar>
          )
        })}
      </div>
    );
  }
}
