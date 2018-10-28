/**
 * A.B.R.U.T.I., un bot de Tagpower
 */
const token = require('./token.js');

const Discord = require('discord.js');
// Create an instance of a Discord client
const client = new Discord.Client();

const prefix = '=';

function emoji(name) {
    return client.emojis.find(emoji => emoji.name === name);
}


client.on('ready', () => {
  console.log("C'est tipar !");
});


function commande(cmd, args, message) {
    console.log(cmd);
    console.log(args);
    switch (cmd) {
        case "ping":
        message.channel.send('_Poung._' + emoji("nyeh"));
        break;
        
        /**
         * HELP pour la liste des commandes
         */
        case "help":
        message.channel.send("_Salut ! Je suis l'Abominable Bot Rarement Utile de Tagpower l'Inarrêtable. " + emoji("abruti") + "\n\nT'inquiète poto, tu l'auras ta liste de commandes. \nMais pour l'instant je sais pas faire grand-chose !_\n\n"
        + "\`\`\`=help : Affiche ce message.\n=ping : Renvoie un gentil Poung.\n=scrabble [mot] : donne la valeur en points d'un mot au Scrabble francophone. (WIP)\`\`\`")
        break;
        
        /**
         * SCRABBLE : Compte les points d'un mot au Scrabble francophone
         * Ne vérifie pas la validité du mot.
         */
        case "scrabble":
        if (args === undefined || args.length === 0 || args[0] === "") {
            message.channel.send(`_Entre un mot, s'il te plaît !_ ${emoji('nyeh')}`);
            return;
        }
        mot = args[0].toLowerCase();
        score = 0;
        console.log("mot = " + mot);
        if (mot.length > 15) {
            message.channel.send(`_Ce mot est trop long pour être joué au Scrabble !_ ${emoji('pls')}`);
            return;
        } 
        for (var char of mot) {
            if ("aàâäeéèêëiîïlnoôörstuûùü".includes(char)) {
                score++;
            } else if ("dgm".includes(char)) {
                score += 2;
            } else if ("bcçp".includes(char)) {
                score += 3;
            } else if ("fhv".includes(char)) {
                score += 4;
            } else if ("jq".includes(char)) {
                score += 8;
            } else if ("kwxyÿz".includes(char)) {
                score += 10;
            } else {
                message.channel.send(`_Ton mot contient des caractères chelous !_ ${emoji('pls')}`);
                return;
            }
        }
        message.channel.send(`_Le mot ${mot.toUpperCase()} vaut ${score} points au Scrabble francophone (s'il est valide) !_ ${emoji('abruti')}`);
        break;
        default:
        message.channel.send(`_Je ne connais pas cette commande. Désolé, je suis encore en train d\'apprendre ${emoji("abruti")}\nTape donc **=help** si besoin !_`);
        break;
    }
}

// Create an event listener for messages
client.on('message', message => {
    //Vérifier s'il s'agit d'une commande
    if (message.content.startsWith(prefix)) {
        var array = message.content.split(' ');
        var command = array.shift().substring(1);
        commande(command, array, message);
    }
});

//Message de bienvenue
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'général');
    // Do nothing if the channel wasn't found on this server
    console.log(channel);
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`_Salut ${member} ! Bienvenue dans la camionnette de Tag.\nDésolé, j'ai déjà bouffé tous les Monster Munch_` + emoji("abruti"));
});
client.login(token.token);