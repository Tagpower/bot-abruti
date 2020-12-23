const prefix = '='; //TODO mettre en config

const mots_en_i = ["Inarrêtable", "Irascible", "Incontrôlable", "Incroyable", "Imprévisible",
                   "Invraisemblable","Indétrônable","Indéfectible","Improbable","Immoral",
                   "Irrationnel","Insupportable","Inimitable","Illustre","Invincible",
                   "Inoubliable","Inouï","Infernal","Incorrigible","Impossible",
                   "Indéfinissable", "Indescriptible", "Inénarrable", "Incommensurable"];
function mot_en_i() {
    return mots_en_i.sample();
}

module.exports = {
	name: 'help',
	description: "Affiche l'aide",
	works_in_dm: true,
	execute(message, args) {
		message.channel.send(`_Salut ! Je suis l'Abominable Bot Rarement Utile de Tagpower l'${mot_en_i()}. ${emoji("abruti")} \nVoilà ce que je sais faire :\n\

__Général__\n\
**${prefix}help** : Affiche ce message.\n\
**${prefix}ping** : Renvoie un gentil Poung.\n\
**${prefix}yt [mots-clés]** : Recherche une vidéo sur Youtube. :construction: \n\
**${prefix}tablatures** OU **tabs [titre]** : Recherche des tablatures pour une musique.\n\
**${prefix}scrabble [mot]** : Donne la valeur en points d'un mot au Scrabble francophone.\n\
**${prefix}urban [mot]** : Demander la définition d'un terme sur UrbanDictionary.\n\
**${prefix}tagmark [somme]** : Convertit une somme en Tagmarks.\n\
**${prefix}pyramide [emoji] [lignes]** : Génère une pyramide avec un emoji.\n\
**${prefix}wtc [image]** : Affiche un message de salutations à la WTC. Ajoutez 'image' pour y adjoindre une accueillante photo d'Antoine !\n\
**${prefix}haddock [image]** : "Affiche un message de salutations du Capitaine Haddock. Ajoutez 'image' pour y adjoindre une accueillante image d'Archibald !\n\
**${prefix}journee** : Demande à A.B.R.U.T.I. comment sera ta journée !\n\
**${prefix}météo [ville] [demain]** : Donne la météo pour une ville donnée, aujourd'hui ou demain.\n\

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
**${prefix}evidemment** : Insister sur l'évidence de quelque chose.\n\
**${prefix}ntm [nom]** : Enjoindre [nom] à N sa M.\n\

__Commandes de modération__\n\
**${prefix}clear [N]** : Efface les N messages avant la commande.\n\
**${prefix}mute [membre] [durée]** : Empêche un membre de poster des messages pendant [durée] secondes.\n\
**${prefix}unmute [membre]** : Annule un mute donné à un membre.\n\
_`);
	},
};