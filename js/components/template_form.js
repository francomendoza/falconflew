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

  updateStateFromChild: function(property_value) {
    //Start here: we need to set the children's values to
    //the state here... but it's nested
    //remember - we are passing the index to each child, so
    //if we somehow pass the type (e.g. property or related node)
    //and the index, then we can precisely change the
    //parent state. <3 Robear
    this.setState(property_value, function() {
      console.log(this.state);
    });
  },

  getInitialState: function() {
    return {
      entity_template: this.getTemplate(this.props.params.template_id),
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
      entity_template: this.getTemplate(next_props.params.template_id)
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

  render: function() {
    var component = this;
    // var this_template = _.find(templates, function(template) {
    //   return template.id == component.props.params.template_id
    // });

    var properties, related_nodes, submitButton;

    if (!this.state.submitted) {
      properties = this.state.entity_template.node_properties.map(function(property, index) {
        return <PropertyFormElement
        key = {index}
        property = {property}
        updateParentState = {component.updateStateFromChild}/>
      })
      related_nodes = this.state.entity_template.related_nodes.map(function(related_node, index) {
        return <RelationshipFormElement
        key = {index}
        updateParentState = {component.updateStateFromChild}
        related_node = {related_node}/>
      })
      submitButton = <button onClick = {this.createNode}> Submit </button>
    } else {
        properties = <Empty/>
        related_nodes = <Empty/>
        submitButton = <Empty/>
    }

    return <div > {properties} {related_nodes} {submitButton} </div>;
  }

});
