module.exports = {
	name: 'asgore',
	description: "?",
	works_in_dm: true,
	execute(message, args) {
		message.channel.send(`_Yes, human ?..._`, {files: ["assets/asgore.png"]});
	}
}