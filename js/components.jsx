var Router = ReactRouter;

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var FormActions = Reflux.createActions([
  "submitNodeForm",
  "updateFormElement"
]);

var EntityStore = Reflux.createStore({
  listenables: [FormActions],
  onSubmitNodeForm: function(formData){
    console.log(formData);
  },
  onUpdateFormElement: function(){
    
  }
});

var entities = [
  {
    id: 1,
    template_name: "Salt Instance",
    template_category: "entity",
    node_properties: [
      {
        name: "name",
        type: "text"
      },
      {
        name: "chemical formula",
        type: "text"
      }
    ],
    related_nodes: [
      {
        template_name: "Material",
        relationship: "child_of",
        required: true,

      }
    ]
  },
  {
    id: 2,
    template_name: "Company Instance",
    template_category: "entity",
    node_properties: [
      {
        name: "name",
        type: "text"
      },
      {
        name: "chemical formula",
        type: "text"
      }
    ],
    related_nodes: [
      {
        template_name: "Material",
        relationship: "child_of",
        required: true
      }
    ] 
  }
];

class App extends React.Component {
  render() {
   return (<div>
             <EntityList />
             <RouteHandler />
           </div>);
  }
}
  
class Empty extends React.Component {
  render() {
    return <div></div>;
  }
}
  
class FormElement extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.state[this.props.name] = this.props.value;
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event){
    var obj = {};
    obj[this.props.name] = event.target.value;
    FormActions.updateFormElement(obj);
  }
  
  render() {
    return <div>
        <label>{ this.props.label }: </label>
        <input type='text' name={ this.props.name } onChange={component.handleChange} value={this.props.value}/>
      </div>;
  }
}

var TemplateForm = React.createClass({
 mixins: [Reflux.connect(EntityStore,"form_data")],
  
 createNode: function() {
   FormActions.submitNodeForm(this.state.form_data);
 },
  
 render: function() {
   var component = this;
   var this_entity =  _.find(entities, function(ent) { return ent.id == component.props.params.entity_id});
   return <div>
               { this_entity.node_properties.map(function(property){
                return <FormElement label={property.name} name={property.name} value={component.state.form_data[property.name]}/>
               }) }
               <button onClick={this.createNode}>Submit</button>
          </div>;
 } 
});

var EntityList = React.createClass({
  getInitialState: function() {
    return {entities: entities}
  },
  
  render: function() {
    return <div>
        <h2>Entities</h2>
        <ul>
          {this.state.entities.map(function(entity) {
           return <li><Link to='template_form' params={{entity_id: entity.id}}>{entity.template_name}</Link></li>
          })}
        </ul>
      </div>;
  }   
});

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='template_form' path='/template_form/:entity_id' handler={TemplateForm} />
    <DefaultRoute handler={Empty}/>
  </Route>
)

ReactRouter.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('main'))
});