/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EntityStore = __webpack_require__(1);
	var Empty = __webpack_require__(3);
	var EntityList = __webpack_require__(4);
	var TemplateList = __webpack_require__(5);
	var TemplateForm = __webpack_require__(6);

	var App = React.createClass({
	  displayName: 'App',

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(TemplateList, null),
	      React.createElement(EntityList, null),
	      React.createElement(
	        'div',
	        { className: 'template_form' },
	        React.createElement(RouteHandler, null)
	      )
	    );
	  }
	});

	var routes = React.createElement(
	  Route,
	  { name: 'app', path: '/', handler: App },
	  React.createElement(Route, { name: 'template_form', path: '/template_form/:template_id', subform: false, handler: TemplateForm }),
	  React.createElement(DefaultRoute, { handler: Empty })
	);

	ReactRouter.run(routes, function (Handler) {
	  React.render(React.createElement(Handler, null), document.getElementById('main'));
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var FormActions = __webpack_require__(2);

	var EntityStore = Reflux.createStore({
	  listenables: [FormActions],
	  getInitialState: function getInitialState() {
	    return { e: entities };
	  },

	  updateState: function updateState(newState) {},

	  next_index: function next_index() {
	    return entities.length + 1;
	  },

	  onSubmitNodeForm: function onSubmitNodeForm(obj) {
	    console.log(obj);
	    // new_obj = obj.entity_template;
	    // new_obj[id] = getNextId();
	    entities.push(_.merge(obj, { entity_id: this.next_index() }));

	    this.trigger(entities);
	  },
	  onUpdateFormElement: function onUpdateFormElement(obj) {
	    this.trigger(obj);
	  }
	});

	module.exports = EntityStore;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var FormActions = Reflux.createActions(["submitNodeForm", "updateFormElement"]);

	module.exports = FormActions;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var Empty = React.createClass({
	  displayName: "Empty",

	  render: function render() {
	    return React.createElement("div", null);
	  }
	});

	module.exports = Empty;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EntityStore = __webpack_require__(1);

	var EntityList = React.createClass({
	  displayName: 'EntityList',

	  mixins: [Reflux.connect(EntityStore)],

	  getInitialState: function getInitialState() {
	    return { entities: entities };
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        'Entities'
	      ),
	      React.createElement(
	        'ul',
	        null,
	        this.state.entities.map(function (entity) {
	          return React.createElement(
	            'li',
	            { key: entity.node_label },
	            entity.node_properties[0].value,
	            ' (',
	            entity.node_label,
	            ')'
	          );
	        })
	      )
	    );
	  }
	});

	module.exports = EntityList;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var TemplateList = React.createClass({
	  displayName: 'TemplateList',

	  getInitialState: function getInitialState() {
	    return { templates: templates };
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        'Templates'
	      ),
	      React.createElement(
	        'ul',
	        null,
	        this.state.templates.map(function (template) {
	          return React.createElement(
	            'li',
	            { key: template.template_id },
	            React.createElement(
	              Link,
	              { to: 'template_form', params: { template_id: template.template_id } },
	              template.node_label
	            )
	          );
	        })
	      )
	    );
	  }
	});

	module.exports = TemplateList;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Empty = __webpack_require__(3);
	var PropertyFormElement = __webpack_require__(7);
	var RelationshipFormElement = __webpack_require__(8);

	var TemplateForm = React.createClass({
	  displayName: 'TemplateForm',

	  contextTypes: {
	    router: React.PropTypes.func
	  },

	  getTemplateName: function getTemplateName(template_id) {
	    var component = this;
	    var this_template = _.find(templates, function (template) {
	      return template.template_id == component.props.params.template_id;
	    });
	    return {
	      template_name: this_template.template_name
	    };
	  },

	  updateStateFromChild: function updateStateFromChild(data_obj) {

	    if (data_obj.related_node) {
	      this.state.entity_template.related_nodes[data_obj.index] = data_obj.data;
	      this.setState(data_obj, function () {
	        console.log(this.state.entity_template);
	      });
	    } else if (data_obj.node_properties) {
	      this.state.entity_template.node_property[data_obj.index] = data_obj.data;
	      this.setState(data_obj, function () {
	        console.log(this.state.entity_template);
	      });
	    }
	  },

	  getInitialState: function getInitialState() {
	    return {
	      entity_template: this.getTemplate(this.props.params.template_id),
	      submitted: false,
	      active: true
	    };
	  },

	  getTemplate: function getTemplate(id) {
	    var this_template = _.find(templates, function (template) {
	      return template.template_id == id;
	    });
	    return this_template;
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(next_props) {
	    this.setState({
	      entity_template: this.getTemplate(next_props.params.template_id)
	    }, function () {
	      console.log(this.state);
	    });
	  },

	  createNode: function createNode() {
	    // submit ajax request to create new node
	    // ajax response will have ID/info for that node
	    // use response to change state of form
	    //check if this is a subform
	    // if so change state of relationshipformelement
	    this.setState({
	      submitted: true
	    }, function () {
	      FormActions.submitNodeForm(this.state.entity_template);
	    });
	    if (!this.props.subform) {
	      this.context.router.transitionTo('/');
	    }
	  },

	  updateParentBackground: function updateParentBackground() {
	    this.setState({ active: false });
	  },

	  render: function render() {
	    var component = this;

	    var header, properties, related_nodes, submitButton, template;

	    var background_color = "#cfd4d8";
	    if (this.state.active) {
	      background_color = "white";
	    }

	    header = React.createElement(
	      'h3',
	      { style: { padding: "10px", margin: "0" } },
	      'New ',
	      this.state.entity_template.node_label
	    );
	    properties = this.state.entity_template.node_properties.map(function (property, index) {
	      return React.createElement(PropertyFormElement, {
	        key: index,
	        index: index,
	        property: { data: property },
	        updateParentState: component.updateStateFromChild });
	    });
	    related_nodes = this.state.entity_template.related_nodes.map(function (related_node, index) {
	      return React.createElement(RelationshipFormElement, {
	        key: index,
	        index: index,
	        updateParentState: component.updateStateFromChild,
	        related_node: { data: related_node },
	        updateParentBackground: component.updateParentBackground });
	    });
	    submitButton = React.createElement(
	      'div',
	      { style: { padding: "10px" } },
	      React.createElement(
	        'button',
	        { onClick: this.createNode },
	        ' Submit '
	      )
	    );

	    if (!this.state.submitted) {
	      template = React.createElement(
	        'div',
	        { style: { outline: "black solid 1px", backgroundColor: background_color } },
	        ' ',
	        header,
	        ' ',
	        properties,
	        ' ',
	        related_nodes,
	        ' ',
	        submitButton,
	        ' '
	      );
	    } else {
	      template = React.createElement(Empty, null);
	    }

	    return React.createElement(
	      'div',
	      null,
	      ' ',
	      template,
	      ' '
	    );
	  }

	});

	module.exports = TemplateForm;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var PropertyFormElement = React.createClass({
	  displayName: "PropertyFormElement",

	  contextTypes: {
	    router: React.PropTypes.func
	  },

	  getInitialState: function getInitialState() {
	    return this.props.property;
	  },

	  handleChange: function handleChange(event) {
	    var obj = this.props.property;
	    obj.data.value = event.target.value;
	    obj.index = this.props.index;
	    obj.node_property = true;
	    // this.setState({value: event.target.value},function(){
	    this.props.updateParentState(obj);
	    // });
	  },

	  render: function render() {
	    var property = this.props.property.data;
	    return React.createElement(
	      "div",
	      { className: "property_element" },
	      React.createElement(
	        "label",
	        null,
	        property.name,
	        ": "
	      ),
	      React.createElement("input", { type: property.type,
	        name: property.name,
	        value: property.value,
	        onChange: this.handleChange })
	    );
	  }
	});

	module.exports = PropertyFormElement;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EntityStore = __webpack_require__(1);
	var Autocomplete = __webpack_require__(9);
	var TemplateForm = __webpack_require__(6);

	var RelationshipFormElement = React.createClass({
	  displayName: 'RelationshipFormElement',

	  mixins: [Reflux.listenTo(EntityStore, 'onEntityAdded')],

	  getInitialState: function getInitialState() {
	    var matching_entities = this.getEntitiesForTemplate(entities);
	    var entity_id = null;
	    if (matching_entities.length > 0) {
	      entity_id = matching_entities[0].entity_id;
	    }
	    return { is_creating: false, value: entity_id };
	  },

	  handleChange: function handleChange(event) {
	    this.setState({ value: event.target.value });
	    this.triggerUpdateForParent();
	  },

	  triggerUpdateForParent: function triggerUpdateForParent() {
	    var obj = this.props.related_node;
	    obj.data.entity_id = this.state.value;
	    obj.index = this.props.index;
	    obj.related_node = true;
	    this.props.updateParentState(obj);
	  },

	  newEntityForm: function newEntityForm() {
	    this.setState({ is_creating: true });
	    this.props.updateParentBackground();
	  },
	  getTemplateById: function getTemplateById(id) {
	    return _.find(templates, function (template) {
	      return template.template_id === id;
	    }) || { node_label: '' };
	  },

	  getEntitiesForTemplate: function getEntitiesForTemplate(these_entities) {
	    var that = this;
	    return _.filter(these_entities, function (entity) {
	      return entity.template_id === that.props.related_node.data.template_id;
	    });
	  },

	  onEntityAdded: function onEntityAdded(updated_entities) {
	    new_entities = this.getEntitiesForTemplate(updated_entities);
	    this.setState({ value: _.last(new_entities).entity_id });
	    this.triggerUpdateForParent();
	  },
	  //<select value={this.state.value} onChange={this.handleChange}>
	  //{entities_for_template.map(function(entity, index){
	  //return <option value={entity.entity_id} key={index}>{entity.node_properties[0].value}</option>;
	  //})}
	  //</select>

	  render: function render() {
	    var that = this;
	    var template_form;
	    var entities_for_template = this.getEntitiesForTemplate(entities);
	    if (this.state.is_creating) {
	      template_form = React.createElement(TemplateForm, { params: { template_id: this.props.related_node.data.template_id }, subform: true });
	    }
	    return React.createElement(
	      'div',
	      { className: 'relationship_element' },
	      React.createElement(
	        'div',
	        { style: { padding: "10px" } },
	        React.createElement(
	          'label',
	          null,
	          this.getTemplateById(this.props.related_node.data.template_id).node_label,
	          ': '
	        ),
	        React.createElement(Autocomplete, { options: [{ value: 1, label: 'Test' }] }),
	        React.createElement(
	          'button',
	          { onClick: this.newEntityForm },
	          'Create New'
	        )
	      ),
	      template_form
	    );
	  }
	});

	module.exports = RelationshipFormElement;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Empty = __webpack_require__(3);
	var Autocomplete = React.createClass({
	  displayName: 'Autocomplete',

	  getInitialState: function getInitialState() {
	    return {
	      has_text: false,
	      current_text: ''
	    };
	  },

	  getMatches: function getMatches() {
	    var matches = _.filter(this.props.options, function (el) {
	      el.label === this.state.current_text;
	    });
	    return matches;
	  },

	  handleTextInput: function handleTextInput(e) {
	    if (this.target.value.replace(/^\s+|\s+$/g, '') === '') {
	      this.setState({ has_text: false });
	    }
	    this.setState({ current_text: this.target.value });
	  },

	  render: function render() {
	    var dropdown = React.createElement(Empty, null);
	    if (this.state.has_text) {
	      dropdown = React.createElement(
	        'div',
	        null,
	        this.getMatches().map(function (match) {
	          return React.createElement(
	            'li',
	            null,
	            match.label
	          );
	        })
	      );
	    }
	    return React.createElement(
	      'div',
	      null,
	      React.createElement('input', { type: 'text', onChange: this.handleTextInput }),
	      dropdown
	    );
	  }

	});

	module.exports = Autocomplete;

/***/ }
/******/ ]);