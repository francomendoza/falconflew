{
  currentTemplateId: 3, //from route
  subTemplates: [
    {
      id: 4,
      open: true,
      submitted: true
    }
  ],
  focusTemplate: 2,  //for styling
  templates: [
    {
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
          entity_id: null
        }
      ]
    },
    {
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
    }
  ]
}