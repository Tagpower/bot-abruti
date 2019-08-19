module.exports = {
	name: 'evidemment',
	aliases: ["évidemment"],
	description: "Insister sur l'évidence de quelque chose.",
	works_in_dm: true,
	execute(message, args) {
		message.channel.send(`https://www.youtube.com/watch?v=6Hhzc_156tk ${emoji('abruti')}`);
	}
}