var TemplateForm = React.createClass({
 // mixins: [Reflux.connect(EntityStore)],
 contextTypes: {
  router: React.PropTypes.func
 },

 getTemplateName: function(template_id){
   // if(template_id){
   //   var this_template =  _.find(templates, function(template) {
   //     return template.id == template_id
   //   });
   //   return { template_name: this_template.template_name };
   // }else{
  var component = this;
  var this_template =  _.find(templates, function(template) {
    return template.id == component.props.params.template_id
  });
  return { template_name: this_template.template_name };
   // }
 },

 updateState: function(property_value) {
  this.setState(property_value);
 },

 getInitialState: function(){
   // if(this.props.template_id) {
   //  console.log(this.props);
   //  return this.getTemplateName(this.props.template_id);
   // } else {
    // return this.getTemplateName();
    return this.getTemplate(this.props.params.template_id);
   // }
 },

 getTemplate: function(id){
  // var that = this;
  var this_template = _.find(templates, function(template){
    return template.id == id
  });
  return this_template
 },

  componentWillReceiveProps: function(next_props){
    this.setState(this.getTemplate(next_props.params.template_id),function(){
      console.log(this.state);
    });
  },

 createNode: function() {
  // submit ajax request to create new node
  // ajax response will have ID/info for that node
  // use response to change state of form
  //check if this is a subform
  // if so change state of relationshipformelement
   FormActions.submitNodeForm(this.state);

   // this.context.router.transitionTo('/');
 },

 getTemplateIdByName: function(template_name) {
  // console.log(template_name)
   var component = this;
   var matching_templates =  _.find(templates, function(template) { return template.template_name === template_name});
   // console.log(matching_templates)
   return matching_templates.id
 },

 render: function() {
   var component = this;
   var template_id;
   if(component.props.params) {
     template_id = component.props.params.template_id;
   } else {
     template_id = component.props.template_id;
   }
   var this_template =  _.find(templates, function(template) { return template.id == template_id});
   return <div>
               { this_template.node_properties.map(function(property){
                       return <PropertyFormElement
                       key = {property.name}
                       label={property.name}
                       name={property.name}
                       parent_state={component.state}
                       updateParentState={component.updateState}
                       value={component.state[property.name]}/>
               }) }
               { this_template.related_nodes.map(function(related_node){
                 return <RelationshipFormElement
                 key = {related_node.template_name}
                 template_name = {related_node.template_name}
                 template_id = {component.getTemplateIdByName(related_node.template_name)}
                 />
               }) }
               <button onClick={this.createNode}>Submit</button>
          </div>;
 }
});
