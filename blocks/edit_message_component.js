module.exports = {
    name: "Edit Message (Component)",

    description: "Edits a message. This Block is made by @EXCORDO",

    category: "Component Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message to edit.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "message_text",
            "name": "Message Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new text for this message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "message_embed",
            "name": "Message Embed",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The new embed for this message. (OPTIONAL)",
            "types": ["object", "unspecified"]
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
        const message = this.GetInputValue("message", cache);
        const message_text = this.GetInputValue("message_text", cache);
        const message_embed = this.GetInputValue("message_embed", cache);
        const component = this.GetInputValue("component", cache);

        if (typeof message_text === "undefined") {
            await message.edit(undefined, { embed: message_embed , components: component}).catch(error => {
                this.StoreOutputValue(error.message, "error", cache);
                this.RunNextBlock("action", cache);
            });

            this.RunNextBlock("action", cache);
        } else {
            await message.edit(message_text, { embed: undefined , components: component}).catch(error => {
                this.StoreOutputValue(error.message, "error", cache);
                this.RunNextBlock("action", cache);
            });

            this.RunNextBlock("action", cache);
        }
    }
}