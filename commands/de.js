function de(face, de) {
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

module.exports = {
	name: "de",
	aliases: ["dé"],
	description: "Lance un ou plusieurs dés.",
	works_in_dm: true,
	execute(message, args) {
		if (args[0] && args[0].match(/^\d*d\d*$/i)) { //Si expression de type "2d10"
		var expression = args[0].toLowerCase().split('d');
		message.channel.send(de(expression[1], expression[0]));
		} else {
			message.channel.send(de(args[0], args[1]));
		}
	}
}