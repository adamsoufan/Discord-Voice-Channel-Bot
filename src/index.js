require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

// Error handlers
process.on("unhandledRejection", async (reason, promise) => {
  console.log(`Unhandled Rejection at: ${promise} reason: ${reason}`);
});
process.on("uncaughtException", (error) => {
  console.log(`Uncaught Exception: ${error}`);
});
process.on("uncaughtExceptionMonitor", (error, origin) => {
  console.log(`Uncaught Exception Monitor: ${error} ${origin}`);
});

// Bot is on
client.on("ready", (c) => {
  console.log(`${c.user.username} is online`);
});

// Handle commands
client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // If command is not sent in a voice channel, don't handle it
  if (interaction.channel.type !== 2) {
    interaction.reply({
      content: "Command must be sent in a voice channel's chat.",
      ephemeral: true,
    });
    return;
  }

  // Mute command
  if (interaction.commandName === "m") {
    try {
      interaction.channel.members.forEach(async (member) => {
        member.voice.setMute(true);
      });
    } catch (error) {
      console.log(`There was an error: ${error}`);
    }
    interaction.reply({
      content: "Muted.",
      ephemeral: true,
    });
  }

  // Unmute command
  if (interaction.commandName === "um") {
    interaction.channel.members.forEach(async (member) => {
      try {
        member.voice.setMute(false);
      } catch (error) {
        console.log(`There was an error: ${error}`);
      }
    });
    interaction.reply({
      content: "Unmuted.",
      ephemeral: true,
    });
  }

  // Deafen command
  if (interaction.commandName === "d") {
    interaction.channel.members.forEach(async (member) => {
      try {
        member.voice.setDeaf(true);
      } catch (error) {
        console.log(`There was an error: ${error}`);
      }
    });
    interaction.reply({
      content: "Deafened.",
      ephemeral: true,
    });
  }

  // Undeafen command
  if (interaction.commandName === "ud") {
    interaction.channel.members.forEach(async (member) => {
      try {
        member.voice.setDeaf(false);
      } catch (error) {
        console.log(`There was an error: ${error}`);
      }
    });
    interaction.reply({
      content: "Undeafened.",
      ephemeral: true,
    });
  }
});

client.login(process.env.TOKEN);
