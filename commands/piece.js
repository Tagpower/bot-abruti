function piece(nb) {
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

module.exports = {
	name: "piece",
	description: "Lance une ou plusieurs pièces.",
	works_in_dm: true,
	execute(message, args) {
		message.channel.send(piece(args[0]));
	}
}