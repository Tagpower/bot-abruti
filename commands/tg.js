module.exports = {
	name: 'tg',
	description: "Invite verbeusement à se taire.",
	works_in_dm: true,
	execute(message, args) {
		message.channel.send(`https://youtu.be/EvTC5Da3INU ${emoji('abruti')}`);
	}
}