const cartes = [];
for (var suite of [":spades:",":clubs:",":hearts:",":diamonds:"]) {
	for (var valeur of [":a:",":prince:",":princess:",":man_in_tuxedo:",":keycap_ten:",":nine:",":eight:",":seven:",":six:",":five:",":four:",":three:",":two:"]) {
		cartes.push(""+valeur+suite);
	}
}

const carte = function(nb, jokers, remise) {
	var nombre = 1;
	var reponse = "";
	if (!isNaN(nb) && nb >= 1 && ((nb <= 52)) || (nb <= 54 && jokers) || (remise && nb <= 90)){ 
		nombre = Math.floor(nb);
	} else if (nb !== undefined) {
		reponse += `_Nombre de cartes invalide. Dans l'doute, j'en prends qu'une !_\n`;
	}
	console.log(nb, jokers, remise);
	var deck = Array.from(cartes);
	if (jokers) {
		deck.push(":black_joker:\t");
		deck.push(":black_joker:\t");
	}
	reponse += `${emoji('abruti')} :point_right: :raised_back_of_hand:\n`;
	var pioche = "";
	for (var i = 0; i < nombre; i++) {
		pioche = deck.sample();
		if (!remise) { //Retirer la carte piochée si pas de remise
			if (pioche === ":black_joker:\t") {
				deck.pop() //Retirer un seul joker au lieu des deux
			} else {
				deck = deck.filter(x => x !== pioche);
			}
		}
		reponse += `${pioche}\t`;
		if ((i+1)%5 == 0) reponse += '\n';
	}
	return reponse;
}

module.exports = {
	name : "carte",
	description : "Pioche des cartes",
	works_in_dm : true,
	execute(message, args) {
		var nb = 1;
		var jokers = false;
		var remise = false;
		if (args.includes("jokers") || args.includes("joker")) jokers = true;
		if (args.includes("remise")) remise = true;
		if (!isNaN(args[0])) nb = args[0];
		message.channel.send(carte(nb, jokers, remise));
	}
}