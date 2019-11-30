module.exports = {
	name: 'ping',
	aliases: ["test"],
	description: "Pour pinger mdr",
	works_in_dm: true,
	execute(message, args) {
		message.channel.send(`_Poung. _` + emoji("nyeh"));
	}
}