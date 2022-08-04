import DJSClient from "./Structures/Client";
import { config } from "dotenv";
config();

const client = new DJSClient({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
});
client.loadEvents(client);
client.loadCommands(client);
client.registerCommands(client);
client.loadslashCommands(client);
client.login(process.env.TOKEN);
