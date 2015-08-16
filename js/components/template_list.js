var TemplateList = React.createClass({
  getInitialState: function() {
    return {templates: templates}
  },

  render: function() {
    return <div>
        <h2>Templates</h2>
        <ul>
          {this.state.templates.map(function(template) {
           return <li key={template.id}><Link to='template_form' params={{template_id: template.id}}>{template.template_name}</Link></li>
          })}
        </ul>
      </div>;
  }
});
