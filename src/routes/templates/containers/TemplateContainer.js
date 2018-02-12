import React from 'react';
import { connect } from 'react-redux';
import TemplateList from '../components/template_list';

class TemplateContainer extends React.Component {
  render() {
    return (
      <div>
        <TemplateList autocompleteItems = { this.props.autocompleteItems } dispatch = { this.props.dispatch } />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    autocompleteItems: state.autocompleteItems
  }
}

export default connect(mapStateToProps)(TemplateContainer);
