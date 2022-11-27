![YouTube Community Bot](https://socialify.git.ci/louisefindlay23/youtubecommunitybot/image?description=1&logo=https%3A%2F%2Fviewsfly.b-cdn.net%2Fwp-content%2Fuploads%2F2021%2F08%2FYouTube-Community.jpg&name=1&theme=Dark)

<div align="center">
<img src="https://forthebadge.com/images/badges/made-with-javascript.svg">
</div>

# 📚 Table of Contents

- [👁 Overview](#-overview)
- [🎯 YouTube Community Bot Features](#-youtube-community-bot-features)
- [⚡ Installation](#-installation)
  - [Discord Server](#-discord-server)
  - [Self-hosting the Bot](#-self-hosting-the-bot)
- [👀 Screenshots](#-screenshots)
- [💡 Why YouTube Community Bot Was Built](#-why-youtube-community-bot-was-built)
- [💻 NPM Modules](#-npm-modules)

# 👁 Overview

Looking for a bot which will alert your followers about your latest YouTube Community Post? YouTube Community Bot is the solution for posting your latest YouTube Community posts to your Discord server.

YouTube Community Bot will monitor a specific YouTube channel and post the latest image, poll or text post to your desired Discord channel. 🚀

# 🎯 YouTube Community Bot Features

- **Posts the Latest YouTube Community Post** - No need to worry about our bot spamming your server with posts. YouTube Community Bot will only post if there's new content available.

- **Supports All YouTube Community Post Types** - All post types are supported including polls. Whether your favourite YouTuber creates polls, image and text posts, our bot will send them to you.

- **Choose your YouTube Channel** - Pick the YouTube channel of your choice. You can be notified of any YouTube channel you wish.

- **Install on your Server** - Use the [invite link](https://discord.com/api/oauth2/authorize?client_id=1040986118193168434&permissions=19456&scope=bot) to invite YouTube Community Bot to your server. Follow the [installation instructions](#-installation) to set up the bot.

- **Pick Any Channel** - Choose any channel you wish our bot to post in. Don't have a specific #updates channel? Pick any existing channel or create a new one specifically for the bot.

# ⚡ Installation

## Discord Server

Love our bot and want to install it in your Discord server? 😍

- Head over to the [invite link](https://discord.com/api/oauth2/authorize?client_id=1040986118193168434&permissions=19456&scope=bot).

- Select the server you want to download YouTube Community Bot in.

![Server Installation Page](https://user-images.githubusercontent.com/26024131/204139007-8208bda2-b7eb-4d66-8958-672dcef6f216.png)

## Self-hosting the Bot

- Currently, you'll need to self-host YouTube Community Bot and manually define the YouTube Channel ID, Discord Server ID and Discord Channel ID for the bot to work.

- Follow the instructions below, and you are good to go 💯

Here's a step by step guide on how to install and run the bot.

1. Clone the repository using `git clone https://github.com/louisefindlay23/youtubecommunitybot`
2. Install needed NPM packages with `npm install`
3. Create an `.env` file with information for the following five variables:
   1. `BOT_TOKEN` - View [instructions](https://discordjs.guide/preparations/setting-up-a-bot-application.html) to obtain through the Discord Developer Portal
   2. `SERVER_ID` - Use [this guide](https://www.alphr.com/discord-find-server-id) to obtain the ID of your Discord Server.
   3. `CHANNEL_ID` - To find the ID of an individual Discord Channel, follow this [guide](https://docs.statbot.net/docs/faq/general/how-find-id/)
   4. `YT_API_URL` - Use the YouTube Operational API URL (`https://yt.lemnoslife.com`) or [self-host it](https://github.com/Benjamin-Loison/YouTube-operational-API) and append `/channels?part=community&id=`.
   5. `YT_CHANNEL_ID` - Enter the name or URL of the desired YouTube channel [here](https://commentpicker.com/youtube-channel-id.php) to obtain its Channel ID.
5. Run the bot with `npm start`

```bash
git clone https://github.com/louisefindlay23/youtubecommunitybot
cd youtubecommunitybot
npm install
nano .env
```

```bash
BOT_TOKEN=<Discord Token>
SERVER_ID=<Discord Server ID>
CHANNEL_ID=<Discord Channel ID>
YT_API_URL=<YouTube Operational API URL>
YT_CHANNEL_ID=<YouTube Channel ID>
```

And the YouTube Community Bot should be running 🚀. Every hour, the bot will check for any new posts and then post them in the specific Discord channel you chose.

Encounter any issues? Feel free to open an [issue](https://github.com/louisefindlay23/youtubecommunitybot/issues/new) with a detailed description of any error messages that occur and describe the specific problem and I'd be happy to help.

# 👀 Screenshots

<div align="center">
<table>
  <tr>
    <td align="center"><img src="https://user-images.githubusercontent.com/26024131/204140476-3fdef5c7-e3a2-4172-9b2f-53958a1b8c7c.png" alt="YouTube Community Bot Text Screenshot"></td>
    <td align="center"><img src="https://user-images.githubusercontent.com/26024131/204140853-69a86636-86f2-46a1-b28d-e0019a0942da.png" alt="YouTube Community Bot Poll Screenshot"></td>
  </tr>
  <tr>
  <td align="center"><img src="https://user-images.githubusercontent.com/26024131/204140814-9b3517fa-718e-421e-9ff3-a8f72392980d.png" alt="YouTube Community Bot Image Screenshot"></td>
  </tr>
</table>
</div>

# 💡 Why YouTube Community Bot Was Built

Subscribers are not always notified of every community post from a subscribed channel so this Discord Bot aims to solve this by creating a new post in a specified server channel whenever a channel releases a new Community Post.

# 💻 NPM Modules

A range of NPM Modules was used in order to create YouTube Community Bot.

- **Discord API** - [Discord.js](https://discord.js.org)
- **YouTube API** - [YouTube Operational API](https://yt.lemnoslife.com)
- **HTTP Client** - [Axios](https://www.npmjs.com/package/axios)
- **Secrets** - [Dotenv](https://github.com/motdotla/dotenv)
