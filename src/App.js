import React, { Component } from 'react';
import { connect } from 'react-redux';
import TemplateList from './routes/templates/components/template_list';
import NavBar from './routes/entities/components/nav_bar';

class App extends Component {
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

export default App;
