import { CommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import Command from "../../Interfaces/Command";
import DJSClient from "../../Structures/Client";

export default {
  name: "ping",
  isSlash: "BOTH",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("A basic ping cmd"),
  run: (client: DJSClient, message: Message) => {
    message.reply("Pinging...").then((msg) => {
      msg.edit(
        `🏓 Pong! \nThe DiscordAPI ping is\`${
          client.ws.ping
        }ms\`\nThe Bot ping is \`${
          msg.createdTimestamp - message.createdTimestamp
        }ms\` `
      );
    });
  },
  interrun: (client: DJSClient, interaction: CommandInteraction) => {
    interaction.reply({ content: "Pong!", ephemeral: true });
  },
} as Command;
