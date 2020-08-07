const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const getMeAJoke = require('discord-jokes');
require('dotenv').config();

const configs = {
    prefix: process.env.PREFIX
};

const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTU1MzEwNzQxMTAwOTU2NyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg2Nzc5MTI4fQ.-vnXYC6uVsTsfzjid4zTsUdsP0X4zS98ZgKy-OP0tp4', client);
 
// Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})
 
dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

// Ready Event
client.once('ready', () => {
    client.user.setActivity(`Jokes in ${client.guilds.cache.size} guilds with ${client.users.cache.size} users`, { type: ("WATCHING")})
    console.log(`Ready! ${client.user.tag} | on ${client.guilds.cache.size} guilds`);
});

// Events
client.on('guildCreate', guild => {
    console.log(`New Guild Joined: ${guild.name} with id: ${guild.id}. This Guild has ${guild.memberCount} members!`)
});
client.on('guildDelete', guild => {
    console.log(`Removed from ${guild.name} (id: ${guild.id})`);
});

// Message Event.
client.on('message', message => {
    if (!message.content.startsWith(configs.prefix) || message.author.bot) return;

    const args = message.content.slice(configs.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.content === `${configs.prefix}joke`) {
        getMeAJoke.getRandomDadJoke (function(joke) {
            message.channel.send(joke);
        }); 
    } else if (message.content === `${configs.prefix}cnjoke`) {
        getMeAJoke.getRandomCNJoke (function(cnjoke) {
            message.channel.send(cnjoke);
        });
    } else if (message.content === `${configs.prefix}jackiechan`) {
        const fn = "Jackie";
        const ln = "Chan";

        getMeAJoke.getCustomJoke (fn, ln, function(jcjoke){
            message.channel.send(jcjoke)
        });
    } else if (message.content === `${configs.prefix}tonystark`) {
        const fn = "Tony";
        const ln = "Stark";

        getMeAJoke.getCustomJoke (fn, ln, function(tsjoke){
            message.channel.send(tsjoke)
        });
    } else if (message.content === `${configs.prefix}willsmith`) {
        const fn = "Will";
        const ln = "Smith";

        getMeAJoke.getCustomJoke (fn, ln, function(wsjoke){
            message.channel.send(wsjoke)
        });
    } else if (message.content === `${configs.prefix}ping`) {
        let clientping = new Discord.MessageEmbed()
        .setTitle("PONG 🏓")
        .addField("Latency", `${client.ws.ping}ms`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`)
        message.channel.send(clientping);
    } else if (message.content === `${configs.prefix}invite`) {
        let botinvite = new Discord.MessageEmbed()
        .setColor('BLUE')
        .addField("Bot Invite Link", '[click here to invite](https://discordapp.com/api/oauth2/authorize?client_id=689553107411009567&permissions=8&scope=bot)')
        .setTimestamp()
        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(botinvite);
    } else if (message.content === `${configs.prefix}help`) {
        let help0 = new Discord.MessageEmbed()
        .setTitle("Help!")
        .setColor('BLUE')
        .setDescription("A discord bot that will entertain your server with cool and awesome jokes. The Bot contains two categories A simple jokes and Chuck Norris Jokes. In addition we have added Jackie chan Jokes command.")
        .addField("Need Additional Help?", "[Join our Help Server](https://discord.gg/Me5wfTw)", true)
        .addField("Donate to bot", "[Click here to donate](https://www.patreon.com/m/devmirza)", true)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(help0);
    } else if (message.content === `${configs.prefix}commands`) {
        let thumb = client.user.displayAvatarURL();
        let commands1 = new Discord.MessageEmbed()
        .setTitle("Commands List")
        .setColor('BLUE')
        .setThumbnail(thumb)
        .addField("**🤣 Fun 🤣**", "j.joke\nj.cnjoke (Chuck Norris)\nj.jackiechan\nj.tonystark", true)
        .addField("**😊 Basic 😊**", "ping\nhelp\ninvite\nstats", true)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(commands1);
    } else if (message.content === `${configs.prefix}stats`) {
        let servercount = client.guilds.cache.size
        let usercount = client.users.cache.size
        let channelcount = client.channels.cache.size
        let thumb = client.user.displayAvatarURL()

        let statembed2 = new Discord.MessageEmbed()
        .setTitle("🌐 Statistics of the Bot!")
        .setColor('BLUE')
        .setThumbnail(thumb)
        .addField("Total Servers", `${servercount}`, true)
        .addField("Total Users", `${usercount}`, true)
        .addField("Total Channels", `${channelcount}`, true)
        .setTimestamp()
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(statembed2);
    }
});

client.login(process.env.BOT_TOKEN);
