module.exports.de = function(emoji, face, de) {
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
	reponse += `${emoji("abruti")}:hand_splayed: :curly_loop: ${":game_die:".repeat(des_a_afficher)} _${resultat}._`;
	return reponse;

}

module.exports.piece = function(emoji, nb) {
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
	reponse += `${emoji("abruti")}:ok_hand: :curly_loop: ${emoji("tagcoin").toString().repeat(pieces_a_afficher)} _${resultat}._`;
	return reponse;
}