{
  currentTemplateId: 3, //from route
  templateStateMap: {
    'x00': {
      visible: true,
      submitted: true,
      count_of_related: [2, 3]
    },
    'x01': {
      visible: true,
      submitted: true
    }
  },
  focusTemplate: 'x00',  //for styling,
  entitiesForAutosuggestByTemplateId: {
    "Equipment": {
      exact: [1,4,5],
      child: []
    }
  },
  entitiesById:{1:{}, 4:{}, 5:{}},
  mapInstanceKeys: { x0: [x01], x01:[x011], x011: [ ] },
  related_node_count: { x0: [1, 2]}
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
          entity_id: [50, 60],
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
          template_label: ["pH Probe",]
          relationship: "located",
          required: true,
          entity_id: null // [ 2, 3 ]
          limit:
          // current:
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