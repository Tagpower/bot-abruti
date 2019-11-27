module.exports = {
	name: 'ntm',
	aliases: [],
	description: "Enjoindre quelqu'un à N sa M.",
	works_in_dm: true,
	execute(message, args) {
		var nom = "";
		var reponse = "";
		if (args.length > 0) {
			nom = args.join(" ");
			if (!["abruti","a.b.r.u.t.i","le bot"].includes(nom.toLowerCase())) {
				reponse = `_Oui, **${nom}** ! C'est bien à toi qu'on cause ! NIQUE BIEN TA MÈRE, ${nom.toUpperCase()} !_ ${emoji('abruti')}`;
			} else {
				reponse = `_Mais je t'emmerde, p'tit con !_ ${emoji('abruti')}`;
				nom = message.author.username;
			}
		} else {
			reponse = `_Oui ! C'est bien à toi qu'on cause ! NIQUE BIEN TA MÈRE, FDP !_ ${emoji('abruti')}`;
		}
		message.channel.send(reponse + `\n_https://vaniquertame.re/${nom.replace(/ /gi, "+")}_`);
	}

}