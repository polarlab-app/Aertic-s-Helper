module.exports = {
    name: "Invert Boolean",

    description: "Changes a true for a false and a false for a true",

    category: "Boolean Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Description: Runs the block.",
            "types": ["action"]
        },
        {
            "id": "boolean",
            "name": "Boolean",
            "description": "Description: The Boolean that will be changed.",
            "types": ["boolean", "unspecified"],
            "required": true
        },
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Runs the next block.",
            "types": ["action"]
        },
        {
            "id": "boolean",
            "name": "Boolean",
            "description": "Type: The boolean but differemt.",
            "types": ["boolean", "unspecified"]
        }
    ],

 async   code(cache) {
     this.StoreOutputValue(this.GetInputValue("boolean", cache) ? false : true, "boolean", cache)
     this.RunNextBlock("action", cache)

    }
}