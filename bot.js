require("dotenv").config();

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const axios = require("axios");
const fs = require("fs");

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
            const communityPosts = data.items[0].community;
            let newTime = JSON.stringify(communityPosts[0].date);
            let lastTime = null;
            // TODO: Now compare new post date lastTime from API. Only send if newer.
            fs.readFile("./lastPostTime.json", "utf8", (err, lastTime) => {
                if (err) {
                    console.error("File read failed:", err);
                    return;
                } else {
                    lastTime = JSON.parse(lastTime);
                    newTime = JSON.parse(newTime);
                    console.info(`Date of previous post is: ${lastTime}`);
                    console.info(`Date of latest post is: ${newTime}`);

                    // TODO: Find out how to compare 5 hours ago etc. time difference
                    if (lastTime.includes("days")) {
                        console.info("Days");
                        lastTime = parseInt(lastTime.split(" ")[0]);
                        newTime = parseInt(newTime.split(" ")[0]);
                        if (lastTime > newTime) {
                            postContent(communityPosts, newTime);
                        }
                    }
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });

    function postContent(communityPost, newTime) {
        const post = communityPost[0];
        // Send Discord message to channel
        const postText = post.contentText[0].text;
        console.info(postText);
        if (post.image) {
            const imgURL = post.image.thumbnails[5].url;
            const imgEmbed = new EmbedBuilder()
                .setTitle("New YT Image")
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
        // TODO: Check this updates
        newTime = JSON.stringify(newTime);
        fs.writeFile(
            "lastPostTime.json",
            JSON.stringify(post.date),
            function (err) {
                if (err) {
                    console.info(err);
                } else {
                    console.info("Time written");
                }
            }
        );
    }
});

client.login(token);
