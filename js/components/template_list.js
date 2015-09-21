var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var TemplateList = React.createClass({
  getInitialState: function() {
    var templates = JSON.parse(localStorage.getItem('templates'));
    return {templates: templates};
  },

  render: function() {
    return <div>
        <h2>Templates</h2>
        <ul>
          {this.state.templates.map(function(template) {
           return <li key={template.template_id}><Link to='template_form' params={{template_id: template.template_id}}>{template.node_label}</Link></li>
          })}
        </ul>
      </div>;
  }
});

module.exports = TemplateList;
