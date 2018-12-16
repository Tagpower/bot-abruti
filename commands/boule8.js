
const reponses_oui = [
	"Oui.", "Évidemment.", "Tout à fait.", "Absolument !", "Bien sûr ! Tout le monde le sait !", "Ça me fait chier de l'admettre, mais oui.", "Ouais, t'inquiète.",
	"Pas le moindre doute là-dessus.", "Oui, un peu.", "BAH OUI", "Est-ce que le Pape chie dans les bois ?", "Oui, oui !", "Hmmm... oui.", "Ah bah oui !", "N... ah en fait si !"
];

const reponses_non = [
	"Non.",	"N'y compte pas !",	"Aucune chance !", "Sûrement pas.", "Ça m'étonnerait.", "Je crois pas.", "Pas du tout.", "Non, mais pas loin.",
	"Non. Et gare à toi si tu me redemandes.", "Que nenni !","Nan, t'es fou !","Nope !", "BAH NON", "T'as fumé ou quoi ?", "Désolé, mais non.", "Certainement pas.",
	"Arrête de rêver.", "Ah bah non !", "Non, faut pas déconner !", "Au risque de te décevoir, non."
];

const reponses_ptet = [
	"Peut-être.", "Difficile à dire.", "Même moi, je sais pas.", "Personne ne sait vraiment.", "Rien n'est moins sûr...", "Possible.", "Ça dépend.", "Pas toujours.",
	"Alors là, j'en sais rien.", "Tu me poses une colle, là..."
]

const reponses_quand = [
	"Probablement jamais.",	"Très bientôt !", "Plus tôt que tu le penses.",	"Va falloir être patient !", "Assez vite.", "Dans la semaine.", "C'est déjà passé !", "Demain !",
	"Quand il gèlera en Enfer !", "Dans trois jours.", "Compte quelques heures.", "Sous cinq jours ouvrés.", 
]

const reponses_pourquoi = [
	"Parce que c'est un comportement normal.", "Parce que t'es con et tu sais pas faire du café noir, boulet !", "Pour faire parler les abrutis !",
	"C'est maintenant que tu te poses la question !?", "Pour l'argent.", "Pour le bien de l'Humanité.", "Pour la **GUERRE !**", "Pour satisfaire le peuple.",
	"Parce que c'était la solution la plus simple."
]

const reponses_qui = [
	"Ma foi, je dirais XXX.", "XXX.", "C'est XXX, obligé !", "J'pense que c'est XXX.", "Bah, personne !", "Pas moi, en tout cas.", "XXX ! Je l'ai vu faire !",
	"C'est pas toi ?", "Je ne vois que XXX pour ça.", "Alors ça, c'est bien un truc que XXX ferait !", "Un peu tout le monde, non ?"
];

let questions_speciales = new Map();
questions_speciales.set("est-ce que je suis schizophrène ?","Non, je suis le fantôme d'un vieux pharaon égyptien ! Ta gueule !");
questions_speciales.set("quel est le sens de la vie ?","42.");
questions_speciales.set("qui es-tu ?","Tu peux taper **=help** pour le savoir.");
questions_speciales.set("la mort ou tchétché ?","C'est quoi tchétché ?");

module.exports.ask = function(question, message){
	if(!(question.includes('?')) ) { //TODO regex
		return "C'est pas une question, ça !";
	} else if (questions_speciales.has(question.toLowerCase()) ) {
		return questions_speciales.get(question.toLowerCase());
	} else if(question.toLowerCase().startsWith("qui")) {
		var result = reponses_qui.sample();
		var personne = message.guild.members.random(1)[0].user;
		console.log(personne);

		return result.replace('XXX', `**${personne.username}**`);
	} else if(question.toLowerCase().startsWith("pourquoi")) {
		return reponses_pourquoi.sample();
	} else if(question.toLowerCase().includes("quand")) {
		return reponses_quand.sample();
	} else {
		var x = Math.random();
		if (x < 0.4) {
			return reponses_non.sample();
		} else if (x < 0.8) {
			return reponses_oui.sample();
		} else {
			return reponses_ptet.sample();
		}
	}
}