module.exports = {
  name: "Interaction [Event] [DONATOR ACCESS v0.4.0]",

  description: "Made by @JU & @EXCORDO",

  category: "Events",

  auto_execute: true,

  inputs: [],

  options: [],

  outputs: [
      {
        "id": "action",
        "name": "Action",
        "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
        "types": ["action"]
      },
      {
        "id": "options",
        "name": "Arguments",
        "description": "Type: Action\n\nDescription: Soon.",
        "types": ["object"]
      },
      {
        "id": "channel",
        "name": "Channel",
        "description": "Type: Action\n\nDescription: Soon.",
        "types": ["object"]
      },
      {
        "id": "user",
        "name": "User",
        "description": "Type: Action\n\nDescription: Soon.",
        "types": ["object"]
      },
      {
        "id": "name",
        "name": "Name",
        "description": "Type: Action\n\nDescription: Soon.",
        "types": ["text"]
      },
      {
        "id": "packet",
        "name": "Interaction",
        "description": "Type: Action\n\nDescription: Soon.",
        "types": ["object"]
      }
  ],

  async code(cache) {
    this.events.on("raw", async packet => {
      if(!["INTERACTION_CREATE"].includes(packet.t) || packet.d.type !== 2) return

      let data

      if (packet.d.data.resolved !== undefined) {
        if (packet.d.data.resolved.members !== undefined) {
          data = packet.d.data.resolved.members
        } else if (packet.d.data.resolved.messages !== undefined) {
          data = packet.d.data.resolved.messages
        }
      } else if (packet.d.data.options !== undefined) {
        data = packet.d.data.options.reduce((acc, option) => ({...acc, [option.name]: option.value}), {})
      }

      let member

      if (packet.d.member === undefined) {
        member = await this.client.users.fetch(packet.d.user.id).catch(() => {return null})
      } else {
        member = await this.client.users.fetch(packet.d.member.user.id).catch(() => {return null})
      }

      const command = {
          channel: await this.client.channels.fetch(packet.d.channel_id).catch(() => {return null}),
          guild: await this.client.guilds.fetch(packet.d.guild_id).catch(() => {return null}),
          member: member,
          options: data,
          name: packet.d.data.name,
          id: packet.d.id,
          token: packet.d.token,
      }

      const options = command["options"]
      const channel = command["channel"]
      const user = command["member"]
      const name = command["name"]

      this.StoreOutputValue(options, "options", cache);
      this.StoreOutputValue(channel, "channel", cache);
      this.StoreOutputValue(user, "user", cache);
      this.StoreOutputValue(name, "name", cache);
      this.StoreOutputValue(packet, "packet", cache);

      this.RunNextBlock("action", cache);
    })
  }
}
