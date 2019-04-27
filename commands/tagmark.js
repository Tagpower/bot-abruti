const tagmark = 0.93;

module.exports = {
	name: "tagmark",
	description: "Convertit une somme en Tagmarks",
	works_in_dm: true,
	execute(message, args) {
		if (args[0] === undefined) {
			message.channel.send(`_Le Tagmark (Tm, ou ${emoji('tagcoin')}) est la monnaie officielle de la Tagmanie.\n\
Sa valeur en euros est indexée sur le prix d'un paquet de Monster Munch goût Salé de 85 grammes au Super U le plus proche de chez Tag.\n\
Un Tagmark est composé de 100 minitags.
Actuellement, le cours est de 1 € = ${tagmark} ${emoji('tagcoin')}.\n\
Elle n'est valable que pour les achats suivants :\n\
\`\`\`- Jeux vidéo\n\
- Albums de musique\n\
- Instruments de musique\n\
- Abonnements de salle de sport\n\
- Nourriture (de préférence mauvaise pour la santé)\n\
- Tours de Peugeotag\n\
- Essence pour la Peugeotag\n\
- Factures de l'Appartag\n\
- Billets d'avion et de train pour la Suisse\`\`\`
Pour obtenir des ${emoji('tagcoin')}, il suffit de se rendre ~~sous le~~ au bureau de change de Tag, dans l'Appartag ! ${emoji('crazytag')}_ `)
		} else if (isNaN(args[0])) { 
			message.channel.send(`_Entre-moi un nombre correct, abruti !_ ${emoji('abruti')}`);
		} else {
			let exchange = (Number.parseFloat(args[0])/tagmark).toFixed(2);
			message.channel.send(`_${args[0]} € = ${exchange + ' ' + emoji('tagcoin')}, soit ${(exchange*0.085).toPrecision(4)} kilos de Monster Munch ! ${emoji('abruti')}_`);
		}
	}
}