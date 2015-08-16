var TemplateForm = React.createClass({
 mixins: [Reflux.connect(EntityStore)],
 contextTypes: {
  router: React.PropTypes.func
 },

 getTemplateName: function(template_id){
   if(template_id){
     var this_template =  _.find(templates, function(template) {
       return template.id == template_id
     });
     return { template_name: this_template.template_name };
   }else{
     var component = this;
     var this_template =  _.find(templates, function(template) {
       return template.id == component.props.params.template_id
     });
     return { template_name: this_template.template_name };
   }
 },

 updateState: function(property_value) {
   this.setState(property_value);
 },

 getInitialState: function(){
   if(this.props.template_id) {
    console.log(this.props);
    return this.getTemplateName(this.props.template_id);
   } else {
    return this.getTemplateName();
   }
 },

  componentWillReceiveProps: function(next_props){
    this.setState(this.getTemplateName(next_props.params.template_id));
  },

 createNode: function() {
   FormActions.submitNodeForm(this.state);
   this.context.router.transitionTo('/');
 },

 getTemplateIdByName: function(template_name) {
                          console.log(template_name)
   var component = this;
   var matching_templates =  _.find(templates, function(template) { return template.template_name == template_name});
   console.log(matching_templates)
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
