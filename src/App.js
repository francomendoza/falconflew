import React from 'react';
import NavBar from './routes/entities/components/nav_bar';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div style={{marginTop: '64px', padding: '20px'}}>
          { this.props.children }
        </div>
      </div>
    );
  }
}
