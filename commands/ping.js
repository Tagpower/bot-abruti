module.exports = {
	name: 'ping',
	description: "Pour pinger mdr",
	works_in_dm: true,
	execute(message, args) {
		message.channel.send(`_Poung. _` + emoji("nyeh"));
	}
}