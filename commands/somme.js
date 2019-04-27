
module.exports = {
	name: 'somme',
	description: "?",
	works_in_dm: true,
	execute(message, args) {
		message.channel.send(`_Tu m'as pris pour ton tableur Excel ou quoi !? \nC'est pas parce que le préfixe est un **=** qu'y faut te croire tout permis !! ${emoji("abruti")}_`);
	}
}