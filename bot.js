require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const axios = require("axios");

client.once("ready", () => {
    console.info("Ready!");

    const channel = client.guilds.cache
        .get(process.env.SERVER_ID)
        .client.channels.cache.get(process.env.CHANNEL_ID);

    const URL = `${process.env.YT_API_URL}${process.env.YT_CHANNEL_ID}`;

    axios
        .get(URL)
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

    /*  axios.get(URL).then(
        (response) => {
            console.info(response);
        },
        (err) => {
            console.error(err);
        }
    ); */
    //channel.send("content");
});

// Add code to get YT Community Poists

// Add client reply bot

client.login(token);
