import { Message } from "discord.js";
import Event from "../Interfaces/Event";
import DJSClient from "../Structures/Client";

export default {
  event: "messageCreate",
  run: (client: DJSClient, message: Message) => {
    if (!message.content.startsWith(client.prefix) || message.author.bot) {
      return;
    }
    const args = message.content.slice(client.prefix.length).split(/ +/);
    const commandNa = args.shift()?.toLocaleLowerCase();
    const command: any = client.commands.get(commandNa);
    if (!command) return;
    command.default.run(client, message);
  },
} as Event;
