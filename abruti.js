/**
 * A.B.R.U.T.I., un bot de Tagpower
 */
let Constants;
let local_test = false;
if (local_test) {
    Constants = require('./constants.js'); //Local
} else {
    Constants = {
        token: process.env.TOKEN,
        myId: process.env.TAGPOWER_DISCORD_ID,
        googleAPI: process.env.GOOGLE_API
    };
}


const Discord = require('discord.js');
const YouTube = require("youtube-node");
const wtcGen = require("./commands/generateur-wtc");
const boule8 = require("./commands/boule8");
var hasard = require("./commands/hasard");
//const sfx = require("./sfx");

const client = new Discord.Client();
const youtube = new YouTube();
youtube.setKey(Constants.googleAPI);

const prefix = '=';
const tagmark = 0.93;

Array.prototype.sample = function() {
    return this[Math.floor(Math.random() * this.length)];
}

emoji = function(name) {
    return client.emojis.find(emoji => emoji.name === name);
}

module.exports.emoji = emoji;

const mots_en_i = ["Inarrêtable", "Irascible", "Incontrôlable", "Incroyable", "Imprévisible",
                   "Invraisemblable","Indétrônable","Indéfectible","Improbable","Immoral",
                   "Irrationnel","Insupportable","Inimitable","Illustre","Invincible",
                   "Inoubliable","Inouï","Infernal","Incorrigible","Impossible",
                   "Indéfinissable", "Indescriptible", "Inénarrable", "Incommensurable"];
function mot_en_i() {
    return mots_en_i.sample();
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
message.channel.send(`_Salut ! Je suis l'Abominable Bot Rarement Utile de Tagpower l'${mot_en_i()}. ${emoji("abruti")} \nVoilà ce que je sais faire :\n\

__Général__\n\
**${prefix}help** : Affiche ce message.\n\
**${prefix}ping** : Renvoie un gentil Poung.\n\
**${prefix}yt [mots-clés]** : Recherche une vidéo sur Youtube.\n\
**${prefix}scrabble [mot]** : Donne la valeur en points d'un mot au Scrabble francophone.\n\
**${prefix}tagmark [somme]** : Convertit une somme en Tagmarks.\n\
**${prefix}wtc** : Envoie un message de salutation à la Antoine Daniel !\n\

__Jeux de hasard__\n\
**${prefix}piece [N]** : Lance N pièces.\n\
**${prefix}de [F] [N]** OU **${prefix}de [NdF]** : Lance N dés à F faces et envoie le résultat.\n\
**${prefix}carte [N] [joker] [remise]**  : Pioche N cartes. L'argument "joker" autorise les jokers. L'argument "remise" autorise de piocher plusieurs fois une même carte.\n\
**${prefix}roulette** : Tire un nombre à la roulette.\n\
**${prefix}sujet** : Lance le Dé à Sujets™ pour proposer un sujet de conversation.\n\
**${prefix}boule [question]** : Pose une question à la Boule 8 Magique de Tag !\n\

__Réactions__\n\
**${prefix}tg** : Invite verbeusement à se taire.\n\
**${prefix}nul** : Dire qu'un truc était nul.\n\

__Commandes de modération__\n\
**${prefix}clear [N]** : Efface les N messages avant la commande.\n\
**${prefix}mute [membre] [durée]** : Empêche un membre de poster des messages pendant [durée] secondes.\n\
**${prefix}unmute [membre]** : Annule un mute donné à un membre.\n\
_`);
        break;

        /**
         * PING pour pinger mdr
         */
        case "ping":
            message.channel.send('_Poung._' + emoji("nyeh"));
        break;

        /**
         * TAGMARK : Convertit une somme en Tagmarks.
         */
        case "tagmark":
            if (args[0] === undefined) {
                message.channel.send(`_Le Tagmark (Tm, ou ${emoji('tagcoin')}) est la monnaie officielle de la Tagmanie.\n\
Sa valeur en euros est indexée sur le prix d'un paquet de Monster Munch goût Salé de 85 grammes au Super U le plus proche de chez Tag.\n\
Un Tagmark est composé de 100 minitags.
Actuellement, le cours est de 1 € = ${tagmark} ${emoji('tagcoin')}.\n\
Elle n'est valable que pour les achats suivants :\n\
\`\`\`- Jeux vidéo\n\
- Albums de musique\n\
- Instruments de musique\n\
- Abonnements de salle de sport\n\
- Nourriture (de préférence mauvaise pour la santé)\n\
- Tours de Peugeotag\n\
- Essence pour la Peugeotag\n\
- Factures de l'Appartag\n\
- Billets d'avion et de train pour la Suisse\`\`\`
Pour obtenir des ${emoji('tagcoin')}, il suffit de se rendre ~~sous le~~ au bureau de change de Tag, dans l'Appartag ! ${emoji('crazytag')}_ `)
            } else if (isNaN(args[0])) { 
                message.channel.send(`_Entre-moi un nombre correct, abruti !_ ${emoji('abruti')}`);
            } else {
                let exchange = (Number.parseFloat(args[0])/tagmark).toFixed(2);
                message.channel.send(`_${args[0]} € = ${exchange + ' ' + emoji('tagcoin')}, soit ${(exchange*0.085).toPrecision(4)} kilos de Monster Munch ! ${emoji('abruti')}_`);
            }
        break;

        /**
         * DE : Lance un certain nombre de dés
         */
        case "dé":
        case "de":
            if (args[0] && args[0].match(/^\d*d\d*$/i)) { //Si expression de type "2d10"
                var expression = args[0].toLowerCase().split('d');
                message.channel.send(hasard.de(expression[1], expression[0]));
            } else {
                message.channel.send(hasard.de(args[0], args[1]));
            }
        break;

        /**
         * CARTE : Pioche une ou plusieurs cartes.
         */
        case "carte":
            var nb = 1;
            var jokers = false;
            var remise = false;
            if (args.includes("jokers") || args.includes("joker")) jokers = true;
            if (args.includes("remise")) remise = true;
            if (!isNaN(args[0])) nb = args[0];
            message.channel.send(hasard.carte(nb, jokers, remise));
        break;

        /**
         * ROULETTE : Tire un nombre à la roulette.
         */
        case "roulette":
            message.channel.send(hasard.roulette());
        break;

                /**
         * PIECE : Lance une pièce
         */
        case "piece":
            message.channel.send(hasard.piece(args[0]));
        break;
        
        case "sujet":
            message.channel.send(hasard.sujet());
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
         * SFX : envoie un son
         */
        // case "sfx":
        //     if (args.length > 0) {
        //         let sound = sfx.getSfx(args[0])
        //         if (sound) {
        //             console.log(sound);
        //             message.channel.send("_Voilà ton son : _" ,sound);
        //         } else {
        //             message.channel.send(`Son non trouvé ! ${emoji('pls')}`);
        //         }
        //     } else {
        //         message.channel.send(`\`\`\`${sfx.list()}\`\`\``);
        //     }
        // break;

        /**
         * YOUTUBE : rechercher une vidéo sur Youtube
         */
        case "yt":
            if (args.length > 0) {
                youtube.search(args.join(' '), 10, function(error, result) {
                    if (error) {
                        console.log(error);
                        message.channel.send(`_Désolé, je me suis planté comme un abruti !_ ${emoji('pls')}`);
                    }
                    else {
                        //console.log(result.items.find(function(v) {return (v.id.kind === "youtube#video")}));
                        //console.log(result)
                        if (result.items.length > 0) {
                            var reponse = result.items.find(function(v) {return (v.id.kind === "youtube#video")});
                            if (reponse) {
                                message.channel.send(`_Voilà ta vidéo :_ https://youtube.com/watch?v=${reponse.id.videoId}  ${emoji('abruti')}`);
                            } else {
                                message.channel.send(`_J'ai rien trouvé..._ ${emoji('pls')}`);
                            }
                        } else {
                            message.channel.send(`_J'ai rien trouvé..._ ${emoji('pls')}`);
                        }
                    }
                });
            } else {
                message.channel.send(`_Entre des mots-clés ou un lien, abruti !_ ${emoji('abruti')}`);
            }
        break;

        case "tg":
            message.channel.send(`https://youtu.be/EvTC5Da3INU ${emoji('abruti')}`);
        break;

        case "nul":
            message.channel.send(`https://youtu.be/oFWvNEG_jK0 ${emoji('abruti')}`);
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
                message.channel.send(`${emoji("abruti")}:hand_splayed: :curly_loop: :8ball: _${boule8.ask(args.join(' '), message)}_`);
            }
        break;

        case "bouli":
        if (args.length === 0) {
            message.channel.send(`_Si tu veux que Bouli réponde, pose-lui d'abord une question ! ${emoji("abruti")}_`);
        } else {
            message.channel.send(`${emoji("abruti")}:hand_splayed: :curly_loop: ${emoji('bouli')} _${boule8.ask(args.join(' '), message)}_`);
        }
        break;

        case "toriel":
            message.channel.send(`_Commande bientôt disponible ! _${emoji('abruti')}`);
        break;

        /**
         * CLEAR : efface les derniers messages
         */
        case "clear":
            if(isNaN(parseInt(args[0])) || parseInt(args[0]) < 1 || args[0] === undefined) {
                message.channel.send(`_Donne-moi un nombre de messages à effacer !_ ${emoji('pls')}`);
            } else {
                if (message.member.hasPermission("MANAGE_MESSAGES")) {
                    message.channel.fetchMessages({limit: parseInt(args[0])+1})
                    .then(mess => {
                            message.channel.bulkDelete(mess)
                        }, function(err){message.channel.send(`_March po_ ${emoji('abruti')}`)})                        
                    message.channel.send(`_${args[0]} message${args[0] > 1 ? 's':''} à la poub' !_ ${emoji('abruti')}`)
                        .then(mess => {mess.delete(6000)});
                } else {
                    message.channel.send(`_Dis donc, tu crois avoir le droit de supprimer des messages comme ça ?_ ${emoji('abruti')}`);
                }
            }
        break;

        case "mute":
            if(message.member.hasPermission("ADMINISTRATOR")) {
                let duree = 60;
                if (!(isNaN(parseInt(args[1])) || parseInt(args[1]) < 1 || args[1] === undefined)) {
                    duree = parseInt(args[1]);
                }
                let mute_role = message.guild.roles.find(r => r.name === "Mute"); // this is where you can replace the role name
                let member = message.mentions.members.first();
                if (!member) {
                    message.channel.send(`_Choisis quelqu'un à muter, abruti !_ ${emoji('abruti')}`);
                    return;
                }
                console.log(member.user.id);
                if (member.user.username === 'A.B.R.U.T.I.' && member.user.bot) {
                    message.channel.send(`_Non mais dis donc, tu crois qu'on peut me faire taire aussi facilement !? ${emoji('abruti')}_`);
                } else {
                    member.addRole(mute_role); // <- this assign the role
                    setTimeout(() => {
                        if (member.roles.has(mute_role.id)) {
                            member.removeRole(mute_role);
                            message.channel.send(`_**${member.displayName}** n'est plus mute. Mais fais gaffe, on te surveille !_ ${emoji('abruti')}`);
                        }
                    }, duree * 1000); // <- sets a timeout to unmute the user.
                    message.channel.send(`${emoji('abruti')}:right_fist::boom:_**${member.displayName}** se prend ${duree} secondes de mute !_`);
                }
            } else {
                message.channel.send(`_Hé ! Seul Tag a le droit de faire ça !_ ${emoji('abruti')}`);
            }
        break;

        
        case "unmute":
            if(message.member.hasPermission("ADMINISTRATOR")) {
                let mute_role = message.guild.roles.find(r => r.name === "Mute"); // this is where you can replace the role name
                let member = message.mentions.members.first();
                if (!member) {
                    message.channel.send(`_Choisis quelqu'un à démuter, abruti !_ ${emoji('abruti')}`);
                    return;
                }
                if (member.roles.has(mute_role.id)) {
                    member.removeRole(mute_role); // <- this assign the role
                    message.channel.send(`_**${member.displayName}** n'est plus mute. Mais fais gaffe, on te surveille !_ ${emoji('abruti')}`);
                } else {
                    message.channel.send(`_**${member.displayName}** n'était pas mute, abruti !_ ${emoji('abruti')}`);
                }
            } else {
                message.channel.send(`_Hé ! Seul Tag a le droit de faire ça !_ ${emoji('abruti')}`);
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
        setTimeout(() => {commande(command, array, message)}, 100);
    } else {
        if(message.channel instanceof Discord.DMChannel) {
            if (message.author.id === Constants.myId) {
                var camionnette = client.guilds.find(g => g.name === "La Camionnette");
                camionnette.channels.find(c => c.name === "test-du-bot").send(`_${message.content}_ ` + emoji("abruti"));
            }
        } else if (!message.author.bot && (message.isMentioned(client.user) || message.content.toLowerCase().includes("abruti") || message.content.toLowerCase().includes("a.b.r.u.t.i"))) { //Quand le bot est mentionné/cité
            if (message.content.toLowerCase().includes('merci')) {
                message.channel.send(`De rien poto ${emoji('abruti')}:punch:`);
            } else {
                message.channel.send(`Oui ? ${emoji('abruti')}`);
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