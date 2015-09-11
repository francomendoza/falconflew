var TemplateForm = React.createClass({
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

  updateStateFromChild: function(data_obj) {

    if(data_obj.related_node){
      this.state.entity_template.related_nodes[data_obj.index] = data_obj.data
      this.setState(data_obj, function() {
        console.log(this.state.entity_template);
      });
    }else if(data_obj.node_properties){
      this.state.entity_template.node_property[data_obj.index] = data_obj.data
      this.setState(data_obj, function() {
        console.log(this.state.entity_template);
      });
    }
  },

  getInitialState: function() {
    return {
      entity_template: this.getTemplate(this.props.params.template_id),
      submitted: false,
      active: true,
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
      FormActions.submitNodeForm(this.state.entity_template);
    })
    if (!this.props.subform) {
      this.context.router.transitionTo('/');
    }
  },

  updateParentBackground: function(){
    this.setState({active: false});
  },

  render: function() {
    var component = this;

    var header, properties, related_nodes, submitButton, template;

    var background_color = "#cfd4d8"
    if(this.state.active){
      background_color = "white"
    }

    header = <h3 style={{padding: "10px", margin: "0"}}>New {this.state.entity_template.node_label}</h3>
    properties = this.state.entity_template.node_properties.map(function(property, index) {
      return <PropertyFormElement
      key = {index}
      index = {index}
      property = {{data: property}}
      updateParentState = {component.updateStateFromChild}/>
    })
    related_nodes = this.state.entity_template.related_nodes.map(function(related_node, index) {
      return <RelationshipFormElement
      key = {index}
      index = {index}
      updateParentState = {component.updateStateFromChild}
      related_node = {{data: related_node}}
      updateParentBackground = {component.updateParentBackground}/>
    })
    submitButton = <div style={{padding: "10px"}}><button onClick = {this.createNode}> Submit </button></div>

    if (!this.state.submitted) {
      template = <div style={{outline: "black solid 1px", backgroundColor: background_color}}> {header} {properties} {related_nodes} {submitButton} </div>
    } else {
      template = <Empty/>
    }


    return <div> {template} </div>;
  }

});
