import { Interaction } from "discord.js";
import Event from "../Interfaces/Event";
import DJSClient from "../Structures/Client";

export default {
  event: "interactionCreate",
  run: (client: DJSClient, interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      const inter: any = client.commands.get(interaction.commandName);
      if (!inter) return;
      inter.default.interrun(client, interaction);
    }
  },
} as Event;
