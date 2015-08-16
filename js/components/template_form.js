var TemplateForm = React.createClass({
 mixins: [Reflux.connect(EntityStore)],
 contextTypes: {
  router: React.PropTypes.func
 },

 getTemplateName: function(props){
   if(props){
     var this_template =  _.find(templates, function(template) {
       return template.id == props.params.template_id
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

 getInitialState: function(){
   return this.getTemplateName()
 },

  componentWillReceiveProps: function(next_props){
    this.setState(this.getTemplateName(next_props));
  },

 createNode: function() {
   FormActions.submitNodeForm(this.state);
   this.context.router.transitionTo('/');
 },

 render: function() {
   var component = this;
   var this_template =  _.find(templates, function(template) { return template.id == component.props.params.template_id});
   return <div>
               { this_template.node_properties.map(function(property){
                       return <PropertyFormElement
                       key = {property.name}
                       label={property.name}
                       name={property.name}
                       parent_state={component.state}
                       value={component.state[property.name]}/>
               }) }
               { this_template.related_nodes.map(function(related_node){
                 return <RelationshipFormElement
                 key = {related_node.template_name}
                 template_name = {related_node.template_name}
                 />
               }) }
               <button onClick={this.createNode}>Submit</button>
          </div>;
 }
});
