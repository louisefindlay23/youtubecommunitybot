require("dotenv").config();

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const axios = require("axios");

client.once("ready", () => {
    console.info("Ready!");
    // Get Discord Server Channel to post in
    const channel = client.guilds.cache
        .get(process.env.SERVER_ID)
        .client.channels.cache.get(process.env.CHANNEL_ID);

    // YT API URL for Community Posts with Channel ID
    const URL = `${process.env.YT_API_URL}${process.env.YT_CHANNEL_ID}`;

    // Axios GET Request
    axios
        .get(URL)
        .then(function (response) {
            // Remove WAMP HTML from response
            let data = response.data.substring(
                response.data.lastIndexOf("</font>") + 1
            );
            data = data.split("\n").slice(1).join("\n");
            // Parse JSON
            data = JSON.parse(data);
            data.items[0].community.forEach((post) => {
                // Send Discord message to channel
                const postText = post.contentText[0].text;
                if (post.image) {
                    const imgURL = post.image.thumbnails[5].url;
                    const imgEmbed = new EmbedBuilder()
                        .setTitle("New YT Image Post")
                        .setDescription(postText)
                        .setImage(imgURL);
                    channel.send({
                        embeds: [imgEmbed],
                    });
                } else if (post.poll) {
                    let choiceArray = [];
                    post.poll.choices.forEach((choice) => {
                        choiceArray.push(choice.text);
                    });
                    choiceArray = choiceArray.join("\n");
                    const pollEmbed = new EmbedBuilder()
                        .setTitle("New YT Poll")
                        .setDescription(
                            `**Poll Title:** ${postText} \n**Choices:** \n${choiceArray}\n**Total Votes:** ${post.poll.totalVotes}`
                        );
                    channel.send({
                        embeds: [pollEmbed],
                    });
                } else {
                    const textEmbed = new EmbedBuilder()
                        .setTitle("New YT Post")
                        .setDescription(postText);
                    channel.send({
                        embeds: [textEmbed],
                    });
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});

client.login(token);
