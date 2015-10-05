{
  currentTemplateId: 3, //from route
  templateMap: {
    'x00': {
      visible: true,
      submitted: true
    },
    'x01': {
      visible: true,
      submitted: true
    }
  },
  focusTemplate: 'x00',  //for styling,
  entitiesForAutosuggestByTemplateId: {3: [1,4,5]},
  entitiesById:{1:{}, 4:{}, 5:{}},
  mapInstanceKeys: { x0: [x01], x01:[x011], x011: [ ] },
  templateInstanceById: {
    'x00': {
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