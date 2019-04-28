/**
 * A.B.R.U.T.I., un bot de Tagpower
 */
let Constants;
if (process.argv[2] === "local") {
    Constants = require('./constants.js'); //Local
} else {
    Constants = {
        token: process.env.TOKEN,
        myId: process.env.TAGPOWER_DISCORD_ID,
        googleAPI: process.env.GOOGLE_API
    };
}

const fs = require('fs');
const Discord = require('discord.js');
//const sfx = require("./sfx");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const YouTube = require("youtube-node");
const youtube = new YouTube();
youtube.setKey(Constants.googleAPI);
module.exports.youtube = youtube;

const prefix = '=';

Array.prototype.sample = function() {
    return this[Math.floor(Math.random() * this.length)];
}

emoji = function(name) {
    return client.emojis.find(emoji => emoji.name === name);
}

module.exports.emoji = emoji;

client.on('ready', () => {
  console.log("C'est tipar !");
  client.user.setActivity("ses cobayes", { type: "WATCHING"});
})

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.on('message', message => {
    //Vérifier s'il s'agit d'une commande

    if (message.content.startsWith(prefix)) {
        var args = message.content.split(/ +/);
        var commandName = args.shift().substring(1).toLowerCase();
        //setTimeout(() => {commande(command, array, message)}, 100);
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) {
            message.channel.send(`_Je ne connais pas cette commande. Désolé, je suis encore en train d'apprendre ${emoji("abruti")}\nTape donc **${prefix}help** si besoin !_`);
            return;
        }
        
        console.log(command.name, args);
        try {
            setTimeout(() => {
                if(message.channel instanceof Discord.DMChannel && !command.works_in_dm) {
                    message.channel.send("_Cette commande ne fonctionne pas dans les messages privés ! _" + emoji('pls'));
                } else {
                    command.execute(message, args);
                }
            }, 100);
                    
        } catch (error) {
            console.error(error);
            //message.reply('there was an error trying to execute that command!');
        }


    } else {
        if(message.channel instanceof Discord.DMChannel) {
            if (message.author.id === Constants.myId) {
                var camionnette = client.guilds.find(g => g.name === "La Camionnette").channels.find(c => c.name === "test-du-bot");
                if (message.content.endsWith(' pls')) {
                    camionnette.send(`_${message.content.substring(0, message.content.length-4)}_ ` + emoji("pls"));
                } else {
                    camionnette.send(`_${message.content}_ ` + emoji("abruti"));
                }
            }
        } else if (!message.author.bot && (message.isMentioned(client.user) || message.content.toLowerCase().includes("abruti") || message.content.toLowerCase().includes("a.b.r.u.t.i"))) { //Quand le bot est mentionné/cité
            if (message.content.toLowerCase().includes('merci')) {
                message.channel.send(`_De rien poto_ ${emoji('abruti')}:punch:`);
            } else {
                message.channel.send(`_Oui ?_ ${emoji('abruti')}`);
            }
        }
        if (message.content.toLowerCase().includes("wee woo")) {
            message.react(emoji('ngah')).then().catch(reason => console.log(`Erreur de réaction : ${reason}`));
        }
    }
})

//Message de bienvenue
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'général');
    console.log(channel);
    if (!channel) return;
    channel.send(`_Salut ${member} ! Bienvenue dans la camionnette de Tag.\nDésolé, j'ai déjà bouffé tous les Monster Munch _` + emoji("abruti"));
})

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'général');
    if (!channel) return;
    console.log(member);
    channel.send(`_**${member.displayName}** vient de fuir... Il ou elle n'était pas à la hauteur _` + emoji("abruti"));
})

client.login(Constants.token);