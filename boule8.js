
const reponses_oui = [
	"Oui.", "Évidemment.", "Tout à fait.", "Absolument !", "Bien sûr ! Tout le monde le sait !", "Ça me fait chier de l'admettre, mais oui.", "Ouais, t'inquiète.",
	"Pas le moindre doute là-dessus.", "Oui, un peu.", "BAH OUI"
];

const reponses_non = [
	"Non.",	"N'y compte pas !",	"Aucune chance !", "Sûrement pas.", "Ça m'étonnerait.", "Je crois pas.", "Pas du tout.", "Non, mais pas loin.", "Non. Et gare à toi si tu me redemandes.",
	"Que nenni !","Nan, t'es fou !","Nope !", "BAH NON"
];

const reponses_ptet = [
	"Peut-être.", "Difficile à dire.", "Même moi, je sais pas.", "Personne ne sait vraiment.", "Rien n'est moins sûr...", "Possible.", "Ça dépend.", "Pas toujours."
]

const reponses_quand = [
	"Probablement jamais.",	"Très bientôt !", "Plus tôt que tu le penses.",	"Va falloir être patient !", "Assez vite.", "Dans la semaine.", "C'est déjà passé !"
]

module.exports.ask = function(question){
	if(!question.includes('?')) { //TODO regex
		return "C'est pas une question, ça !";
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