module.exports = {
  name: "Delete Interaction Message [DONATOR ACCESS v0.1.0]",

  description: "Made by @JU & @EXCORDO",

  category: "Interaction Stuff",

  inputs: [
    {
      "id": "action",
      "name": "Action",
      "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
      "types": ["action"]
    },
    {
      "id": "packet",
      "name": "Interaction",
      "description": "Type: Action\n\nDescription: Soon.",
      "types": ["object", "unspecified"]
    }
  ],

  options: [],

  outputs: [
    {
      "id": "action",
      "name": "Action",
      "description": "Type: Action\n\nDescription: Soon.",
      "types": ["action"]
    },
    {
      "id": "error",
      "name": "Error",
      "description": "Type: Action\n\nDescription: Soon.",
      "types": ["text", "unspecified"]
    }
  ],

  async code(cache) {
    const {default: axios} = await this.require('axios');
    const packet = this.GetInputValue("packet", cache);

    await axios.delete(`https://discord.com/api/v8/webhooks/${packet.d.application_id}/${packet.d.token}/messages/@original`)
    .catch(error => {
      this.StoreOutputValue(error, "error", cache);
      this.RunNextBlock("action", cache);
    });
    this.RunNextBlock("action", cache)
  }
}
