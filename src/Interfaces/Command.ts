import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import DJSClient from "../Structures/Client";

export default interface Command {
  name: string;
  aliases?: string[];
  description?: string;
  isSlash: boolean | "BOTH";
  data?: SlashCommandBuilder | SlashCommandSubcommandBuilder;
  run: (client: DJSClient, ...args: any) => any;
  interrun: (client: DJSClient, ...args: any) => any;
}
