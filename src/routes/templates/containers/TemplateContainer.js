import React from 'react';
import { connect } from 'react-redux';
import TemplateList from '../components/template_list';

var TemplateContainer = React.createClass({

  render: function() {
    return (
      <div>
        <TemplateList autocompleteItems = { this.props.autocompleteItems } dispatch = { this.props.dispatch } />
      </div>
    );
  }
});

function mapStateToProps(state){
  return {
    autocompleteItems: state.autocompleteItems
  }
}

export default connect(mapStateToProps)(TemplateContainer);
