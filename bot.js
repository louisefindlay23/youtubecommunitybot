require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
    console.info("Ready!");
});

// Add code to get YT Community Poists

// Add client reply bot

client.login(token);
