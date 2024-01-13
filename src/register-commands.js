require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "m",
    description: "Mute every member in a voice channel.",
  },

  {
    name: "um",
    description: "Unmute every member in a voice channel.",
  },

  {
    name: "d",
    description: "Deafen every member in a voice channel.",
  },

  {
    name: "ud",
    description: "Undeafen every member in a voice channel.",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Slash commands were registered successfully");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
