/**
 * A.B.R.U.T.I., un bot de Tagpower
 */
const Constants = require('./constants.js');

const Discord = require('discord.js');
const YouTube = require("youtube-node");

const client = new Discord.Client();
const youtube = new YouTube();
youtube.setKey(Constants.googleAPI);

const prefix = '=';

client.on('ready', () => {
  console.log("C'est tipar !");
  client.user.setActivity("ses cobayes", { type: "WATCHING"})

})

function emoji(name) {
    return client.emojis.find(emoji => emoji.name === name);
}

function commande(cmd, args, message) {
    console.log(cmd, args);
    switch (cmd) {
        /**
         * HELP : Lste des commandes
         */
        case "help":
            message.channel.send(`_Salut ! Je suis l'Abominable Bot Rarement Utile de Tagpower l'Inarrêtable. ${emoji("abruti")} \n\nT'inquiète poto, tu l'auras ta liste de commandes. \nMais pour l'instant je sais pas faire grand-chose !_\n\n\`\`\`\
${prefix}help : Affiche ce message.\n\
${prefix}ping : Renvoie un gentil Poung.\n\
${prefix}scrabble [mot] : Donne la valeur en points d'un mot au Scrabble francophone.\n\
${prefix}youtube OU ${prefix}yt [mots-clés] : Recherche une vidéo sur Youtube.\`\`\``)
        break;

        /**
         * PING pour pinger mdr
         */
        case "ping":
            message.channel.send('_Poung._' + emoji("nyeh"));
        break;
        
        
        /**
         * SCRABBLE : Compte les points d'un mot au Scrabble francophone
         * Ne vérifie pas la validité du mot.
         */
        case "scrabble":
            if (!args[0]) {
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
            message.channel.send(`_Le mot ${mot.toUpperCase()} vaut ${score} points au Scrabble (s'il est valide) !_ ${emoji('abruti')}`);
        break;

        /**
         * YOUTUBE : rechercher une vidéo sur Youtube
         */
        case "yt":
        case "youtube":
            if (args.length > 0) {
                youtube.search(args.join(' '), 10, function(error, result) {
                    if (error) {
                        console.log(error);
                        message.channel.send(`_Désolé, je me suis planté comme un A.B.R.U.T.I. ! _ ${emoji('pls')}`);
                    }
                    else {
                        //console.log(result.items.find(function(v) {return (v.id.kind === "youtube#video")}));
                        //console.log(result)
                        if (result.items.length > 0) {
                        var reponse = result.items.find(function(v) {return (v.id.kind === "youtube#video")});
                        if (reponse) {
                            message.channel.send(`_Voilà ta vidéo :_ https://youtube.com/watch?v=${reponse.id.videoId}  ${emoji('abruti')}`);
                        } else {
                            message.channel.send(`_J'ai rien trouvé... _ ${emoji('pls')}`);
                        }
                        } else {
                        message.channel.send(`_J'ai rien trouvé... _ ${emoji('pls')}`);
                        }
                    }
                });
            } else {
                message.channel.send(`_Entre des mots-clés ou un lien, abruti ! _ ${emoji('abruti')}`);
            }
        break;

        case "toriel":
            message.channel.send(`_Commande bientôt disponible ! _ ${emoji('abruti')}`);
        break;

        /**
         * CLEAR : efface les derniers messages
         */
        case "clear":
            // if(parseInt(args[0]).isNaN() || parseInt(args[0]) < 1 ) {
            //     for (var i = 0; i < args[0]; i++) {
            //         message.channel.find
            //     }

            //     if (message.member.hasPermission("MANAGE_MESSAGES")) {
            //         message.channel.fetchMessages({limit: args[0]})
            //         .then(mess => {
            //                 mess.first().;
            //             }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
            //     }
            // } else {

            // }
            message.channel.send(`_Commande bientôt disponible ! _ ${emoji('abruti')}`);
        break;

        case "somme":
            message.channel.send(`_Tu m'as pris pour ton tableur Excel ou quoi !? \nC'est pas parce que le préfixe est un **=** qu'y faut te croire tout permis !! ${emoji("abruti")}_`);
        break;


        /**
         * Commande inconnue
         */
        default:
            message.channel.send(`_Je ne connais pas cette commande. Désolé, je suis encore en train d'apprendre ${emoji("abruti")}\nTape donc **${prefix}help** si besoin !_`);
        break;
    }
}

// Create an event listener for messages
client.on('message', message => {
    //Vérifier s'il s'agit d'une commande
    
    if (message.content.startsWith(prefix)) {
        var array = message.content.split(' ');
        var command = array.shift().substring(1).toLowerCase();
        commande(command, array, message);
    } else {
        if(message.channel instanceof Discord.DMChannel) {
            if (message.author.id === Constants.myId) {
                var camionnette = client.guilds.find(g => g.name === "La Camionnette");
                camionnette.channels.find(c => c.name === "test-du-bot").send(`_${message.content}_ ` + emoji("abruti"));
            }
        }
    }


})

//Message de bienvenue
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'général');
    // Do nothing if the channel wasn't found on this server
    console.log(channel);
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`_Salut ${member} ! Bienvenue dans la camionnette de Tag.\nDésolé, j'ai déjà bouffé tous les Monster Munch _` + emoji("abruti"));
})

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'général');
    if (!channel) return;
    channel.send(`_**${member.nickname}** vient de fuir... Il ou elle n'était pas à la hauteur _` + emoji("abruti"));
})

client.login(Constants.token);