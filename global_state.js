{
  currentTemplateId: 3, //from route
  subTemplates: {
    'x00': {
      visible: true,
      submitted: true
    },
    'x01': {
      visible: true,
      submitted: true
    }
  },
  focusTemplate: 2,  //for styling,
  entitiesForAutosuggestByTemplateId: {3: [1,4,5]},
  entitiesById:{1:{}, 4:{}, 5:{}}
  templateInstanceById: {
    'x00': {
      parent_et: null,
      template_id: 3,
      node_label: "PartNumber",
      node_properties: [
        {
          name: "part_number",
          type: "text",
          value: null
        }
      ],
      related_nodes: [
        {
          template_id: 4, 
          relationship: "child_of",
          required: true,
          entity_id: null,
          entity_template: 
        }
      ]
    },
    'x01': {
      template_id: 4,
      node_label: "Company",
      node_properties: [
        {
          name: "name",
          type: "text",
          value: null
        }
      ],
      related_nodes: [
        {
          template_id: 5,
          relationship: "located",
          required: true,
          entity_id: null
        }
      ]
    },
    'x02': {
      template_id: 5,
      node_label: "Location",
      node_properties: [
        {
          name: "name",
          type: "text",
          value: null
        }
      ],
      related_nodes: []
    }
  }
}