module.exports = {
	name: 'tablatures',
	aliases: ["tabs"],
	description: "Recherche des tablatures pour une musique.",
	works_in_dm: true,
	execute(message, args) {
		if (args.length > 0) {
			message.channel.send(`https://www.911tabs.com/search.php?search=${args.join('+')}`)
		} else {
			message.channel.send(`_Entre le titre d'une chanson, abruti !_ ${emoji('abruti')}`);
		}
	}

}