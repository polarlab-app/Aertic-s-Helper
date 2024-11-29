module.exports = {
    name: "Edit Thinking Message (Component)",

    description: "Edits a thinking message. This Block is made by @EXCORDO",

    category: "Component Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message_text",
            "name": "Message Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new text for this message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "component",
            "name": "Component",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The component for this message.",
            "types": ["object", "list", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "error",
            "name": "Error",
            "description": "Type: Object, List\n\nDescription: Error.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        const message_text = this.GetInputValue("message_text", cache);
        const component = this.GetInputValue("component", cache);

        await component.reply.edit(message_text).catch(error => {
            this.StoreOutputValue(error.message, "error", cache);
            this.RunNextBlock("action", cache);
        });
            this.RunNextBlock("action", cache);
    }
}