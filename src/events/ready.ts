import { ActivityType } from "discord.js";
import Event from "../Interfaces/Event";
import DJSClient from "../Structures/Client";

export default {
  event: "ready",
  run: (client: DJSClient, ...args) => {
    console.log(`Logged in as ${client.user?.username}`);
    client.user?.setActivity({
      name: "in Dev Mode",
      type: ActivityType.Watching,
    });
  },
} as Event;
