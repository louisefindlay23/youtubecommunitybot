require("dotenv").config();

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const axios = require("axios");
const fs = require("fs");

client.once("ready", () => {
    console.info("Ready!");
    // Get Discord Server Channel to post in
    // TODO: Get Server from Discord.js and Channel from User Input
    const channel = client.guilds.cache
        .get(process.env.SERVER_ID)
        .client.channels.cache.get(process.env.CHANNEL_ID);
    // YT API URL for Community Posts with Channel ID
    const URL = `${process.env.YT_API_URL}${process.env.YT_CHANNEL_ID}`;
    // Call YT API every hour
    callAPI();
    setInterval(callAPI, 3600000);

    // Axios GET Request
    function callAPI() {
        axios
            .get(URL)
            .then(function (response) {
		let data = response.data;
                const communityPosts = data.items[0].community;
                let newPostID = JSON.stringify(communityPosts[0].id);
                let lastPostID = null;
		//console.log(communityPosts[0])
                // Read previous YT Post ID
                fs.readFile("./lastPostID.json", "utf8", (err, lastPostID) => {
                    if (err) {
                        console.error("File read failed:", err);
                        return;
                    } else {
                        lastPostID = JSON.parse(lastPostID);
                        newPostID = JSON.parse(newPostID);
                        console.info(`ID of previous post is: ${lastPostID}`);
                        console.info(`ID of latest post is: ${newPostID}`);

						if (lastPostID === newPostID) {
							console.info("No new posts");
						} else {
						
                        // Find previous post array index and slice the array to get newer posts
                        communityPosts.forEach((post, index) => {
                        console.info(lastPostID, post.id);
                            if (post.id === lastPostID) {
                                console.info(index);
                                const newPosts = communityPosts.slice(0, index);
                                postContent(newPosts, newPostID);
                            }
                        });
                    }
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Format and send Discord message to channel
    function postContent(newPosts, newPostID) {
        newPosts.forEach((post) => {
            const postText = post.contentText[0].text;
            console.info(postText);
            if (post.image && post.image.thumbnails[5]) {
                const imgURL = post.image.thumbnails[5].url;
                const imgEmbed = new EmbedBuilder()
                    .setTitle("New YT Image")
                    .setDescription(`**Description:** ${postText} \n**Post Link:** https://www.youtube.com/post/${post.id}`)
                    .setImage(imgURL);
                channel.send({
                    embeds: [imgEmbed],
                })
                  .then(console.log)
                  .catch(console.error);
            } else if (post.poll) {
                let choiceArray = [];
                post.poll.choices.forEach((choice) => {
                    choiceArray.push(choice.text);
                });
                choiceArray = choiceArray.join("\n");
                const pollEmbed = new EmbedBuilder()
                    .setTitle("New YT Poll")
                    .setDescription(
                        `**Poll Title:** ${postText} \n**Choices:** \n${choiceArray}\n**Total Votes:** ${post.poll.totalVotes} \n**Poll Link:** https://www.youtube.com/post/${post.id}`
                    );
                channel.send({
                    embeds: [pollEmbed],
                })
                  .then(console.log)
                  .catch(console.error);
            } else {
                const textEmbed = new EmbedBuilder()
                    .setTitle("New YT Post")
                    .setDescription(`**Post Text:** ${postText} \n**Post Link:** https://www.youtube.com/post/${post.id}`);
                channel.send({
                    embeds: [textEmbed],
                })
                  .then(console.log)
                  .catch(console.error);
            }
        });
        // Write the new post ID to the JSON file
        newPostID = JSON.stringify(newPostID);
        fs.writeFile("lastPostID.json", newPostID, function (err) {
            if (err) {
                console.info(err);
            } else {
                console.info("ID written");
            }
        });
    }
});

client.login(token);
