import { ClientEvents } from "discord.js";
import DJSClient from "../Structures/Client";

export default interface Event {
  event: keyof ClientEvents;
  run: (client: DJSClient, ...args: any) => any;
}
