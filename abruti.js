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

var today = new Date();
var qui_a_parle_aujourdhui = [];

client.on('ready', () => {
    console.log("C'est tipar !");
    client.user.setActivity("ses cobayes", { type: "WATCHING"});
})

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cron = require("node-cron");
cron.schedule('0 0 8 * * *', () => {
    qui_a_parle_aujourdhui = [];
    var camionnette = client.guilds.find(g => g.name === "La Camionnette").channels.find(c => c.name === "général");
    client.commands.get("wtc").executeFromCron(camionnette);



}, {timezone:"Europe/Paris"});


client.on('message', message => {
    //Vérifier s'il s'agit d'une commande

    if (message.content.startsWith(prefix)) {
        var args = message.content.split(/ +/);
        var commandName = args.shift().substring(1).toLowerCase();
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
                if (message.content.startsWith("#")) {
                    var channel = client.guilds.find(g => g.name === "La Camionnette").channels.find(c => c.name.startsWith(message.content.substring(1, message.content.indexOf(' '))));
                    if (channel != null) {
                        if (message.content.endsWith(' pls')) {
                            channel.send(`_${message.content.substring(message.content.indexOf(' ')+1, message.content.length-4)}_ ` + emoji("pls"));
                        } else {
                            channel.send(`_${message.content.substring(message.content.indexOf(' ')+1)}_ ` + emoji("abruti"));
                        }
                    }
                }
                //var camionnette = client.guilds.find(g => g.name === "La Camionnette").channels.find(c => c.name === "test-du-bot");

            }
        } else if (!message.author.bot && (message.isMentioned(client.user) || message.content.toLowerCase().includes("abruti") || message.content.toLowerCase().includes("a.b.r.u.t.i"))) { //Quand le bot est mentionné/cité
            if (message.content.toLowerCase().includes('merci')) {
                message.channel.send(`_De rien poto_ ${emoji('abruti')}:punch:`);
            } else {
                message.channel.send(`_${["Oui ?", "Oui ?", "Oui ?", "Ouais ?", "ui qoi", "C'est moi", "On m'a appelé ?", "Qu'entends-je ?", "Qu'ouïs-je ?", "Plaît-il ?"].sample()}_ ${emoji('abruti')}`);
            }
        }
        if (message.content.toLowerCase().includes("wee woo")) {
            message.react(emoji('ngah')).then().catch(reason => console.log(`Erreur de réaction : ${reason}`));
        }

        //Journée des gens
        if (!message.author.bot && !qui_a_parle_aujourdhui.find(p => p === message.author.id)) {
            today = new Date();
            if (today.getHours() >= 4 && today.getHours() < 12) {
                var reponse = `Salut ${message.author} ! Laisse-moi te dire comment va se passer ta journée... ${emoji('abruti')}:open_hands::crystal_ball:\n\n`;
                reponse += [":zero: Oh putain, je sais pas quel dieu sadique t'as énervé récemment, mais tu vas passer une des pires journées que t'aies connues !",
                            ":one: Houlà... Désolé mais je crois que tu vas passer une sacrée journée à chier !",
                            ":two: Ouais bah ça va être une journée bien naze. T'aurais mieux fait de pas t'lever !",
                            ":three: Journée pas terrible. T'attends pas à grand-chose de cool...",
                            ":four: Journée bof... ça pourrait être pire, mais pas super quand même.",
                            ":five: Mouais, journée totalement quelconque. Ni bonne ni mauvaise.",
                            ":six: Bon, pas une journée de fou, mais quelques trucs positifs quand même.",
                            ":seven: Journée pas mal, pas trop de souci à te faire !",
                            ":eight: Profite, ça va être une journée très cool !",
                            ":nine: Journée de malade !! Que du bonheur pour toi aujourd'hui !" ,
                            ":keycap_ten: HELL YEAH !!! Ça va être une journée dont tu te souviendras toute ta vie !"].sample();
                message.channel.send(`*${reponse}* ${emoji('abruti')}`);
                
                qui_a_parle_aujourdhui.push(message.author.id);
            }
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