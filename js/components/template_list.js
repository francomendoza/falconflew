var TemplateList = React.createClass({
  getInitialState: function() {
    return {templates: templates}
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
