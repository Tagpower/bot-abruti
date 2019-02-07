const abruti = require('../abruti.js');

const cartes = [];
for (var suite of [":spades:",":clubs:",":hearts:",":diamonds:"]) {
	for (var valeur of [":a:",":prince:",":princess:",":man_in_tuxedo:",":keycap_ten:",":nine:",":eight:",":seven:",":six:",":five:",":four:",":three:",":two:"]) {
		cartes.push(""+valeur+suite);
	}
}

module.exports.carte = function(nb, jokers, remise) {
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

module.exports.de = function(face, de) {
	var faces = 6;
	var des = 1;
	var des_a_afficher = 1;
	var resultat = 0;
	var reponse = "";
	if (!isNaN(face) && face > 1 && face <= 1000000000 ) { 
		faces = Math.floor(face);
	} else if (face !== undefined) {
		reponse += `_Nombre de faces invalide. Dans l'doute, j'en mets 6 !_\n`;
	}
	if (!isNaN(de) && de >= 1 && de <= 1000000) {
		des = Math.floor(de);
		des_a_afficher = Math.min(10, des)
	} else if (de !== undefined) {
		reponse += `_Nombre de dés invalide. Dans l'doute, j'en lance qu'un !_\n`;
	}

	//Lancer des dés
	for (var i=1; i <= des; i++) {
		resultat += Math.floor(Math.random() * faces) +1;
	}
	reponse += `${abruti.emoji("abruti")}:hand_splayed: :curly_loop: ${":game_die:".repeat(des_a_afficher)} _${resultat}._`;
	return reponse;

}

module.exports.piece = function(nb) {
	var pieces = 1;
	var pieces_a_afficher = 1;
	var resultat = "";
	var reponse ="";

	if (!isNaN(nb) && nb >= 1 && nb <= 1000000000) {
		pieces = nb;
		pieces_a_afficher = Math.min(10, pieces)
	} else if (nb !== undefined) {
		reponse += `_Nombre de pièces invalide. Dans l'doute, j'en lance qu'une !_\n`;
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
	reponse += `${abruti.emoji("abruti")}:ok_hand: :curly_loop: ${abruti.emoji("tagcoin").toString().repeat(pieces_a_afficher)} _${resultat}._`;
	return reponse;
}

module.exports.roulette = function() {
	var nombre = Math.floor(Math.random() * 37);
	if (nombre == 0) {
		return `${abruti.emoji("abruti")}:ok_hand: :curly_loop: :white_circle:\n_Zéro !_`;
	} else {
		var couleur = ([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(nombre) ? ":red_circle:" : ":black_circle:");
		var parite = (nombre % 2 == 0 ? "pair" : "impair");
		var passe = (nombre <= 18 ? "manque" : "passe");
		return `${abruti.emoji("abruti")}:ok_hand: :curly_loop: :white_circle:\n*${nombre} ${couleur}, ${parite} et ${passe} !*`;
	}

}

const sujets = ["Quelle est votre odeur préférée ?", "Partagez un de vos souvenirs d'enfance.", "Une petite chose qui vous rend toujours heureux.se ?",
				"Quel est votre plat préféré ?", "Quel est le premier jeu vidéo auquel vous avez joué ?", "Quelle est votre boisson préférée ?",
				"Quel sport aimeriez-vous essayer ?", "Si vous vous retrouviez 100 ans dans le futur, quelle question poseriez-vous en premier ?",
				"Où êtes-vous allé le plus loin de chez vous ?", "Sur quel site allez-vous le plus souvent ?", "Quel est votre plus grand exploit ?",
				"Si on vous demandait de prendre la parole devant le monde entier, que diriez-vous ?"];

module.exports.sujet = function() {
	return `${abruti.emoji("abruti")}:hand_splayed: :curly_loop: :game_die: _${sujets.sample()}_`;
}