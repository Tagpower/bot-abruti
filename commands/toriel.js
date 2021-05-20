module.exports = {
	name: 'toriel',
	description: "?",
	works_in_dm: true,
	execute(message, args) {
		message.channel.send(`_Yes, my child ?... ${emoji("happytori")}_`, {files: ["assets/toriel.png"]});
	}
}