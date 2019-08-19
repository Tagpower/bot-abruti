module.exports = {
	name: 'prout',
	description: "Saluer les gens d'un prout bien senti.",
	works_in_dm: true,
	execute(message, args) {
		message.channel.send(`https://youtu.be/P8KSDJ5BQ0I?t=3 ${emoji('abruti')}`);
	}
}