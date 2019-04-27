function scrabble(mot) {
	score = 0;
	if (mot.length > 15) {
		return `_Ce mot est trop long pour être joué au Scrabble !_ ${emoji('pls')}`;
	} 
	for (var char of mot) {
		if ("aàâäeéèêëiîïlnoôörstuûùü".includes(char)) {
			score++;
		} else if ("dgm".includes(char)) {
			score += 2;
		} else if ("bcçp".includes(char)) {
			score += 3;
		} else if ("fhv".includes(char)) {
			score += 4;
		} else if ("jq".includes(char)) {
			score += 8;
		} else if ("kwxyÿz".includes(char)) {
			score += 10;
		} else {
			return `_Ton mot contient des caractères chelous !_ ${emoji('pls')}`;
		}
	}
	return `_Le mot ${mot.toUpperCase()} vaut ${score} points au Scrabble (s'il est valide) !_ ${emoji('abruti')}`;
}

module.exports = {
	name:"scrabble",
	description:"Donne la valeur en points d'un mout au Scrabble francophone.",
	works_in_dm : true,
	execute(message, args) {
		if (!args[0]) {
			message.channel.send(`_Entre un mot, s'il te plaît !_ ${emoji('nyeh')}`);
			return;
		} else {
			message.channel.send(scrabble(args[0].toLowerCase()));
		}
	}
}
	