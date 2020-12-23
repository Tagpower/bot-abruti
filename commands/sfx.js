const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'sfx',
	description: "Envoyer un effet sonore.",
	works_in_dm: true,
	execute(message, args) {
		if (args.length == 0) {
			message.channel.send(list());
		} else {
			message.channel.send(
				{ files: [getSfx(args[0])]}
				//{files:[`./assets/sfx/taisezvous.mp3`]}
			);
		}
	}
}

const listOfSounds = ["taisezvous", "ftg", "jecodeaveclecul", "circus", "herculade"]

getSfx = function(soundfile) {
	if (listOfSounds.find(s => s === soundfile.toLowerCase())) {
		//const buffer = fs.readFileSync(`./assets/sfx/${soundfile}.mp3`);
		//const attachment = new Discord.MessageAttachment(buffer, `${soundfile}.mp3`);
		return `./assets/sfx/${soundfile}.mp3`;
	} else {
		return false;
	}
}

list = function() {
	return `_Sons disponibles : ${listOfSounds.toString()}_`;
}