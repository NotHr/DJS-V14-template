import { Routes, Client, ClientOptions, Collection } from "discord.js";
import { REST } from "discord.js";
import fs from "fs";
import path from "path";

export default class DJSClient extends Client {
  commands = new Collection();
  commandInterface = [];
  prefix = "!";
  client_id = "1001346380142481458";
  guild_id = "991674162697482260";
  constructor(options: ClientOptions) {
    super(options);
  }
  loadEvents(client: DJSClient) {
    const eventFolder = fs.readdirSync(
      path.join(`${process.cwd()}`, "build", "events"),
      {
        withFileTypes: true,
      }
    );

    for (const file of eventFolder) {
      const event = require(`../../build/events/${file.name}`);
      const eventObj = event[Object.keys(event)[0]];
      client.on(eventObj.event, (...args) => {
        eventObj.run(client, ...args);
      });
    }
  }
  loadCommands(client: DJSClient) {
    const commandFolders = fs.readdirSync(
      path.join(`${process.cwd()}`, "build", "commands")
    );
    for (const folder of commandFolders) {
      const commandfiles = fs.readdirSync(
        path.join(`${process.cwd()}`, "build", "commands", `${folder}`)
      );
      for (const file of commandfiles) {
        const command = require(`../../build/commands/${folder}/${file}`);
        const commandName = command[Object.keys(command)[0]];
        client.commands.set(commandName.name, command);
      }
    }
  }
  registerCommands(client: DJSClient) {
    const commandFolders = fs.readdirSync(
      path.join(`${process.cwd()}`, "build", "commands")
    );
    for (const folder of commandFolders) {
      const commandfiles = fs.readdirSync(
        path.join(`${process.cwd()}`, "build", "commands", `${folder}`)
      );
      for (const file of commandfiles) {
        const interaction = require(`../../build/commands/${folder}/${file}`);
        const interName = interaction[Object.keys(interaction)[0]];
        if (interName.isSlash === true || "BOTH") {
          const commandBody = interName.data;
          client.commandInterface.push(commandBody as never);
        }
      }
    }
  }
  loadslashCommands(client: DJSClient) {
    const rest = new REST({ version: "10" }).setToken(
      process.env.TOKEN as string
    );

    (async () => {
      try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
          Routes.applicationGuildCommands(client.client_id, client.guild_id),
          {
            body: client.commandInterface,
          }
        );

        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();
  }
}
