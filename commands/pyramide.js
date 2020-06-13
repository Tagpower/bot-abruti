function pyramide(emote, rang) {
	var ligne = "";
	var lignes = [];
	var espaces = 0;

	if (emote.startsWith('<')) {
		emote = emoji(emote.split(':')[1]);
	}

	while (rang > 0) {
		if (espaces == 0) {
			ligne = "";
		} else {
			ligne = `**${"   ".repeat(espaces)}**`;
		}
			
		for (var i=0; i<rang; i++) {
			ligne += emote;
		}
		lignes.push(ligne)
		rang--; espaces++;
	}
	lignes.reverse();
	return lignes.join('\n');

}

module.exports = {
	name: 'pyramide',
	description: "Fait une pyramide d'emojis.",
	works_in_dm: true,
	execute(message, args) {
		if (!args[0] /*|| !args[0].startsWith(':')*/) {
			message.channel.send(`_Donne-moi un emoji à pyramider, abruti !_ ${emoji('plsabruti')}`);
			return;
		}
		
		var reponse = "";
		if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 1 || parseInt(args[1]) > 15) {
			if (args[1]) reponse += `_Nombre invalide. Dans l'doute, taille par défaut de 3 !_\n`;
			message.channel.send(reponse + pyramide(args[0], 3));
		} else {
			reponse = pyramide(args[0], args[1]);
			if (reponse.length < 2000) {
				message.channel.send(reponse);
			} else {
				message.channel.send(`_Le message généré a trop de caractères !_ ${emoji('plsabruti')}`);
			}
		} 

	}
}