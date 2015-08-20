var TemplateForm = React.createClass({
  // mixins: [Reflux.connect(EntityStore)],
  contextTypes: {
    router: React.PropTypes.func
  },

  getTemplateName: function(template_id) {
    var component = this;
    var this_template = _.find(templates, function(template) {
      return template.id == component.props.params.template_id
    });
    return {
      template_name: this_template.template_name
    };
  },

  updateState: function(property_value) {
    this.setState(property_value, function() {
      console.log(this.state);
    });
  },

  getInitialState: function() {
    return {
      id: this.props.params.template_id,
      submitted: false,
    }
  },

  getTemplate: function(id) {
    var this_template = _.find(templates, function(template) {
      return template.id == id
    });
    return this_template
  },

  componentWillReceiveProps: function(next_props) {
    this.setState({
      id: next_props.params.template_id
    }, function() {
      console.log(this.state);
    });
  },

  createNode: function() {
    // submit ajax request to create new node
    // ajax response will have ID/info for that node
    // use response to change state of form
    //check if this is a subform
    // if so change state of relationshipformelement
    this.setState({
      submitted: true
    }, function() {
      console.log(this.state);
      FormActions.submitNodeForm(this.state);
    })
    if (!this.props.subform) {
      this.context.router.transitionTo('/');
    }
  },

  getTemplateIdByName: function(template_name) {
    var component = this;
    var matching_templates = _.find(templates, function(template) {
      return template.template_name === template_name
    });
    return matching_templates.id
  },

  render: function() {
    var component = this;
    var this_template = _.find(templates, function(template) {
      return template.id == component.props.params.template_id
    });

    var properties, related_nodes, submitButton;

    if (!this.state.submitted) {
      properties = this_template.node_properties.map(function(property) {
        return <PropertyFormElement
        key = {
          property.name
        }
        label = {
          property.name
        }
        name = {
          property.name
        }
        parent_state = {
          component.state
        }
        updateParentState = {
          component.updateState
        }
        value = {
          component.state[property.name]
        }
        />
      })
      related_nodes = this_template.related_nodes.map(function(related_node) {
        return <RelationshipFormElement
        key = {
          related_node.template_name
        }
        template_name = {
          related_node.template_name
        }
        template_id = {
          component.getTemplateIdByName(related_node.template_name)
        }
        />
      })
      submitButton = < button onClick = {
        this.createNode
      } > Submit < /button>
    } else {
      properties = < Empty / >
        related_nodes = < Empty / >
        submitButton = < Empty / >
    }

    return <div > {
      properties
    } {
      related_nodes
    } {
      submitButton
    } < /div>;
  }

});
