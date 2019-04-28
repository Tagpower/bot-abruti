
const reponses_oui = [
	"Oui.", "Évidemment.", "Tout à fait.", "Absolument !", "Bien sûr ! Tout le monde le sait !", "Ça me fait chier de l'admettre, mais oui.", "Ouais, t'inquiète.",
	"Pas le moindre doute là-dessus.", "Oui, un peu.", "BAH OUI", "Est-ce que le Pape chie dans les bois ?", "Oui, oui !", "Hmmm... oui.", "Ah bah oui !", "N... ah en fait si !",
	"Euh... oui ?", "Tout porte à croire que oui.", "Ma foi, aucune raison que non !"
];

const reponses_non = [
	"Non.",	"N'y compte pas !",	"Aucune chance !", "Sûrement pas.", "Ça m'étonnerait.", "Je crois pas.", "Pas du tout.", "Non, mais pas loin.",
	"Non. Et gare à toi si tu me redemandes.", "Que nenni !","Nan, t'es fou !","Nope !", "BAH NON", "T'as fumé ou quoi ?", "Désolé, mais non.", "Certainement pas.",
	"Arrête de rêver.", "Ah bah non !", "Non, faut pas déconner !", "Au risque de te décevoir, non.", "Dans aucun scénario.", "Pas possible.", "Bien sûr... que non !"
];

const reponses_ptet = [
	"Peut-être.", "Difficile à dire.", "Même moi, je sais pas.", "Personne ne sait vraiment.", "Rien n'est moins sûr...", "Possible.", "Ça dépend.", "Pas toujours.",
	"Alors là, j'en sais rien.", "Tu me poses une colle, là...", "Je l'ignore !"
]

const reponses_quand = [
	"Probablement jamais.",	"Très bientôt !", "Plus tôt que tu le penses.",	"Va falloir être patient !", "Assez vite.", "Dans la semaine.", "C'est déjà passé !", "Demain !",
	"Quand il gèlera en Enfer !", "Dans trois jours.", "Compte quelques heures.", "Sous cinq jours ouvrés.", "En moins de temps qu'il n'en faut pour le dire !"
]

const reponses_pourquoi = [
	"Parce que c'est un comportement normal.", "Parce que t'es con et tu sais pas faire du café noir, boulet !", "Pour faire parler les abrutis !",
	"C'est maintenant que tu te poses la question !?", "Pour l'argent.", "Pour le bien de l'Humanité.", "Pour la **GUERRE !**", "Pour satisfaire le peuple.",
	"Parce que c'était la solution la plus simple.", "Pour faire chier le monde, voilà pourquoi !", "Pour avoir plus de votes !", "Pour faire des vues !"
]

const reponses_comment = [
	""
] //TODO

const reponses_combien = [
	"500.", "Beaucoup plus que tu imagines.", "Pas beaucoup.", "Aucun !", "Des milliards !", "Deux.", "Et si tu faisais **=de** pour savoir ?", "Une dizaine.",
	"UN SACRÉ PAQUET !!", "Un seul !", "Que dalle !", "Moins que prévu.", "Plus que prévu."
]

const reponses_qui = [
	"Ma foi, je dirais XXX.", "XXX.", "C'est XXX, obligé !", "J'pense que c'est XXX.", "Bah, personne !", "Pas moi, en tout cas.", "XXX ! Je l'ai vu faire !",
	"C'est pas toi ?", "Je ne vois que XXX pour ça.", "Alors ça, c'est bien un truc que XXX ferait !", "Un peu tout le monde, non ?", "Ça doit être un coup de XXX, ça !",
	"Alors ça, c'est signé XXX !", "C'est XXX... à moins que ça ne soit YYY ?"
];

let questions_speciales = new Map();
questions_speciales.set("est-ce que je suis schizophrène ?","Non, je suis le fantôme d'un vieux pharaon égyptien ! Ta gueule !");
questions_speciales.set("quel est le sens de la vie ?","42.");
questions_speciales.set("qui es-tu ?","Tu peux taper **=help** pour le savoir.");
questions_speciales.set("la mort ou tchétché ?","C'est quoi tchétché ?");
questions_speciales.set("ton patron te casse les couilles ?","Appelle Joe la Mouk !\nhttps://www.youtube.com/watch?v=tGr4HPYPMfE");
questions_speciales.set("ta meuf te casse les couilles ?","Appelle Joe la Mouk !\nhttps://www.youtube.com/watch?v=Qvv4MfrJyDY");

const ask = function(question, message){
	if(!(question.includes('?')) ) { //TODO regex
		return "C'est pas une question, ça !";
	} else if (questions_speciales.has(question.toLowerCase()) ) {
		return questions_speciales.get(question.toLowerCase());
	} else if(question.toLowerCase().startsWith("qui")) {
		var result = reponses_qui.sample();
		var personne = message.guild.members.random(1)[0].user;
		if (result.includes('YYY')) {
			var autre_personne = message.guild.members.random(1)[0].user;
			return result.replace('XXX', `**${personne.username}**`).replace('YYY', `**${autre_personne.username}**`);
		} else {
			return result.replace('XXX', `**${personne.username}**`);
		}
	} else if(question.toLowerCase().startsWith("pourquoi")) {
		return reponses_pourquoi.sample();
	} else if(question.toLowerCase().startsWith("combien")) {
		return reponses_combien.sample();
	} else if(question.toLowerCase().includes("quand") && !question.toLowerCase().includes("quand même")  && !question.toLowerCase().includes("quand meme")) {
		return reponses_quand.sample();
	} else {
		var x = Math.random();
		if (message.author.id === '304666321340203010') {
			if (x < 0.1) {
				return "Non chérie :broken_heart:";
			} else if (x < 0.9) {
				return "Oui chérie :heart:";
			} else {
				return "Je sais pas chérie :heart:";
			}
		} else {
			if (x < 0.4) {
				return reponses_non.sample();
			} else if (x < 0.8) {
				return reponses_oui.sample();
			} else {
				return reponses_ptet.sample();
			}
		}
	}
}

module.exports = {
	name: 'boule',
	aliases: ['bouli'],
	description: "Pose une question à la Boule 8 magique de Tag",
	works_in_dm: true,
	execute(message, args) {
		if (args.length === 0) {
			message.channel.send(`_Si tu veux que la boule réponde, pose-lui d'abord une question ! ${emoji("abruti")}_`);
		} else {
			message.channel.send(`${emoji("abruti")}:hand_splayed: :curly_loop: :8ball: _${ask(args.join(' '), message)}_`);
		}
	}
}