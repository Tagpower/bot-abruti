/**
 * A.B.R.U.T.I., un bot de Tagpower
 */
//const Constants = require('./constants.js');
const Constants = {
    token: process.env.TOKEN,
    myId: process.env.TAGPOWER_DISCORD_ID,
    googleAPI: process.env.GOOGLE_API
};

const Discord = require('discord.js');
const YouTube = require("youtube-node");
const wtcGen = require("./generateur-wtc");
const boule8 = require("./boule8");

const client = new Discord.Client();
const youtube = new YouTube();
youtube.setKey(Constants.googleAPI);

const prefix = '=';

Array.prototype.sample = function() {
	return this[Math.floor(Math.random() * this.length)];
}

function emoji(name) {
    return client.emojis.find(emoji => emoji.name === name);
}

const mots_en_i = ["Inarrêtable", "Irascible", "Incontrôlable", "Incroyable", "Imprévisible","Invraisemblable","Indétrônable","Indéfectible","Improbable","Immoral","Irrationnel","Insupportable","Inimitable","Illustre","Invincible","Inoubliable","Inouï","Infernal","Incorrigible"];
function mot_en_i() {
    return mots_en_i[Math.floor(Math.random()*mots_en_i.length)];
}

client.on('ready', () => {
  console.log("C'est tipar !");
  client.user.setActivity("ses cobayes", { type: "WATCHING"});
})

function commande(cmd, args, message) {
    console.log(cmd, args);
    switch (cmd) {
        /**
         * HELP : Lste des commandes
         */
        case "help":
            message.channel.send(`_Salut ! Je suis l'Abominable Bot Rarement Utile de Tagpower l'${mot_en_i()}. ${emoji("abruti")} \n\nT'inquiète poto, tu l'auras ta liste de commandes. \nMais pour l'instant je sais pas faire grand-chose !_\n\n\`\`\`\
${prefix}help : Affiche ce message.\n\
${prefix}ping : Renvoie un gentil Poung.\n\
${prefix}de [F] [N] : Lance N dés à F faces et envoie le résultat.\n\
${prefix}piece [N] : Lance N pièces.\n\
${prefix}clear [N] : Efface les N messages avant la commande. Réservé aux modérateurs.\n\
${prefix}wtc : Envoie un message de salutation à la Antoine Daniel !\n\
${prefix}boule [question] : Pose une question à la Boule 8 Magique de Tag !\n\
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
         * DE : Lance un certain nombre de dés
         */
        case "de":
            var faces = 6;
            var des = 1;
            var des_a_afficher = 1;
            var resultat = 0;
            if (!isNaN(args[0]) && args[0] > 1 && args[0] < Infinity ) { 
                faces = args[0];
            } else if (args[0] !== undefined) {
                message.channel.send(`_Nombre de faces invalide. Dans l'doute, j'en mets 6 !_`)
            }
            if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 1000000) {
                des = args[1];
                des_a_afficher = Math.min(10, des)
            } else if (args[1] !== undefined) {
                message.channel.send(`_Nombre de dés invalide. Dans l'doute, j'en lance qu'un !_`)
            }

            //Lancer des dés
            for (var i=1; i <= des; i++) {
                resultat += Math.floor(Math.random() * faces) +1;
            }
            message.channel.send(`${emoji("abruti")}:hand_splayed: :curly_loop: ${":game_die:".repeat(des_a_afficher)} _${resultat}._`);

        break;

        /**
         * PIECE : Lance une pièce
         */
        case "piece":
            var pieces = 1;
            var pieces_a_afficher = 1;
            var resultat = "";

            if (!isNaN(args[0]) && args[0] >= 1 && args[0] <= 1000000) {
                pieces = args[0];
                pieces_a_afficher = Math.min(10, pieces)
            } else if (args[0] !== undefined) {
                message.channel.send(`_Nombre de pièces invalide. Dans l'doute, j'en lance qu'une !_`)
            }

            //Lancer des pièces
            var piles = 0;
            var faces = 0;
            for (var i=1; i <= pieces; i++) {
                if (Math.random() < 0.5) {
                    piles++;
                } else {
                    faces++;
                }
            }
            if (pieces > 1) {
                resultat = `${piles} Pile${piles > 1 ? "s":""} et ${faces} Face${faces > 1 ? "s":""}`;
            } else {
                resultat = (piles ? "Pile" : "Face");
            }
            message.channel.send(`${emoji("abruti")}:ok_hand: :curly_loop: ${emoji("tagcoin").toString().repeat(pieces_a_afficher)} _${resultat}._`);

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

        /**
         * WTC : envoie une salutation à la WTC
         */
        case "wtc":
            message.channel.send(`_${wtcGen.generate()} ${emoji("abruti")}_`);
        break;

        /**
         * BOULE : interroge la boule 8 magique de Tag.
         */
        case "boule":
            if (args.length === 0) {
                message.channel.send(`_Si tu veux que la boule réponde, pose-lui d'abord une question ! ${emoji("abruti")}_`);
            } else {
                message.channel.send(`${emoji("abruti")}:hand_splayed: :curly_loop: :8ball: _${boule8.ask(args.join(' '))}_`);
            }
        break;

        case "toriel":
            message.channel.send(`_Commande bientôt disponible ! _ ${emoji('abruti')}`);
        break;

        /**
         * CLEAR : efface les derniers messages
         */
        case "clear":
            if(isNaN(parseInt(args[0])) || parseInt(args[0]) < 1 || args[0] === undefined) {
                message.channel.send(`_Donne-moi un nombre de messages à effacer ! _ ${emoji('pls')}`);
            } else {
                if (message.member.hasPermission("MANAGE_MESSAGES")) {
                    message.channel.fetchMessages({limit: parseInt(args[0])+1})
                    .then(mess => {
                            message.channel.bulkDelete(mess)
                        }, function(err){message.channel.send(`_March po_ ${emoji('abruti')}`)})                        
                    message.channel.send(`_${args[0]} message${args[0] > 1 ? 's':''} à la poub' ! _ ${emoji('abruti')}`)
                        .then(mess => {mess.delete(6000)});
                } else {
                    message.channel.send(`_Dis donc, tu crois avoir le droit de supprimer des messages comme ça ?_ ${emoji('abruti')}`);
                }
            }
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
    const channel = member.guild.channels.find(ch => ch.name === 'général');
    console.log(channel);
    if (!channel) return;
    channel.send(`_Salut ${member} ! Bienvenue dans la camionnette de Tag.\nDésolé, j'ai déjà bouffé tous les Monster Munch _` + emoji("abruti"));
})

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'général');
    if (!channel) return;
    channel.send(`_**${member.nickname}** vient de fuir... Il ou elle n'était pas à la hauteur _` + emoji("abruti"));
})

client.login(Constants.token);