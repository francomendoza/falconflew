{
    id: 1,
    node_label: "Container",
    node_properties: [
    {
        name: "name",
        type: "text",
        value: null
    }
    ],
    related_nodes: []
},
{
    id: 2,
    node_label: "Flask",
    node_properties: [
    {
        name: "name",
        type: "text",
        value: null
    },
    {
        name: "max_volume",
        type: "text",
        value: null
    }
    ],
    related_nodes: [
    {
        template_id: 1,
        relationship: "child_of",
        required: true,
        entity_id: null //(n:Container {name: "Flask"})
    },
    {
        template_id: 3,
        relationship: "has_part_number",
        required: true,
        entity_id: null
    }
    ]
},
{
    id: 3,
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
    id: 4,
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
        relationship: "location",
        required: true,
        entity_id: null
    }
    ]
},
{
    id: 5,
    node_label: "Location",
    node_properties: [
    {
        name: "city",
        type: "text",
        value: null
    },
    {
        name: "country"
        type: "text",
        value: null
    }
    ],
    related_nodes: []
},
{
    id: 6,
    node_label: "Plate",
    node_properties: [
    {
        name: "name",
        type: "text",
        value: null
    },
    {
        name: "well_volume",
        type: "text",
        value: null
    },
    {
        name: "number_of_wells",
        type: "text",
        value: null
    }
    ],
    related_nodes: [
    {
        template_id: 1,
        relationship: "child_of",
        required: true,
        entity_id: null
    },
    {
        template_id: 3,
        relationship: "has_part_number",
        required: true,
        entity_id: null
    }
    ]
},
{
    id: 7,
    node_label: "Box",
    node_properties: [
    {
        name: "name",
        type: "text",
        value: null
    },
    {
        name: "max_quantity",
        type: "text",
        value: null
    }
    ],
    related_nodes: [
    {
        template_id: 1,
        relationship: "child_of",
        required: true,
        entity_id: null
    },
    {
        template_id: 3,
        relationship: "has_part_number",
        required: true,
        entity_id: null
    }
    ]
},
{
    id: 8,
    node_label: "Refrigerator",
    node_properties: [
    {
        name: "name",
        type: "text",
        value: null
    },
    {
        name: "size",
        type: "text",
        value: null
    },
    {
        name: "temperature",
        type: "text",
        value: null
    }
    ],
    related_nodes: [
    {
        template_id: 1,
        relationship: "child_of",
        required: true,
        entity_id: null
    },
    {
        template_id: 9,
        relationship: "child_of",
        required: true,
        entity_id: null
    },
    {
        template_id: 3,
        relationship: "has_part_number",
        required: true,
        entity_id: null
    }
    ]
},
{
    id: 9,
    node_label: "Equipment",
    node_properties: [
    {
        name: "name",
        type: "text",
        value: null
    }
    ],
    related_nodes: []
},
{
    id: 10,
    node_label: "Freezer",
    node_properties: [
    {
        name: "name",
        type: "text",
        value: null
    },
    {
        name: "size",
        type: "text",
        value: null
    },
    {
        name: "temperature",
        type: "text",
        value: null
    }
    ],
    related_nodes: [
    {
        template_id: 1,
        relationship: "child_of",
        required: true,
        entity_id: null
    },
    {
        template_id: 9,
        relationship: "child_of",
        required: true,
        entity_id: null
    },
    {
        template_id: 3,
        relationship: "has_part_number",
        required: true,
        entity_id: null
    }
    ]
},
{
    id: 11,
    node_label: "Vial",
    node_properties: [
    {
        name: "name",
        type: "text",
        value: null
    },
    {
        name: "volume",
        type: "text",
        value: null
    }
    ],
    related_nodes: [
    {
        template_id: 1,
        relationship: "child_of",
        required: true,
        entity_id: null
    },
    {
        template_id: 3,
        relationship: "has_part_number",
        required: true,
        entity_id: null
    }
    ]
},
{
    id: 12,
    node_label: "Bottle",
    node_properties: [
    {
        name: "name",
        type: "text",
        value: null
    },
    {
        name: "volume",
        type: "text",
        value: null
    }
    ],
    related_nodes: [
    {
        template_id: 1,
        relationship: "child_of",
        required: true,
        entity_id: null
    },
    {
        template_id: 3,
        relationship: "has_part_number",
        required: true,
        entity_id: null
    }
    ]
},
{
    id: 13,
    node_label: "Bag",
    node_properties: [
    {
        name: "name",
        type: "text",
        value: null
    },
    {
        name: "volume",
        type: "text",
        value: null
    }
    ],
    related_nodes: [
    {
        template_id: 1,
        relationship: "child_of",
        required: true,
        entity_id: null
    },
    {
        template_id: 3,
        relationship: "has_part_number",
        required: true,
        entity_id: null
    }
    ]
},
{
    id: 14,
    node_label: "Compound",
    node_properties: [
    {
        name: "name",
        type: "text",
        value: null
    }
    ]
    related_nodes: []
},
{
    id: 15,
    node_label: "Salt",
    node_properties: [
    {
        name: "name",
        type: "text",
        value: null
    },
    {
        name: "formula",
        type: "text",
        value: null
    }
    ],
    related_nodes: [
    {
        template_id: 14,
        relationship: "child_of",
        required: true,
        entity_id: null
    }
    ]
},