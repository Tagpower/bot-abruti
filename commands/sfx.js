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
			var son = getSfx(args[0]);
			console.log(son);
			if (son) {
				message.channel.send(
					{ files: [son]}
					//{files:[`./assets/sfx/taisezvous.mp3`]}
				);
			} else {
				message.channel.send(`_Y a pas ce son-là !_ ${emoji('plsabruti')}`);
			}
		}
	}
}

var listOfSounds = [];

fs.readdirSync("./assets/sfx/").forEach(file => {
	listOfSounds.push(file.split('.')[0]);
});

getSfx = function(soundfile) {
	var son = "";
	if (listOfSounds.find(s => s === soundfile.toLowerCase())) {
		//const buffer = fs.readFileSync(`./assets/sfx/${soundfile}.mp3`);
		//const attachment = new Discord.MessageAttachment(buffer, `${soundfile}.mp3`);

		try {
			if(fs.existsSync(`./assets/sfx/${soundfile}.mp3`)) {
				son = `./assets/sfx/${soundfile}.mp3`;
			} else if(fs.existsSync(`./assets/sfx/${soundfile}.wav`)) {
				son = `./assets/sfx/${soundfile}.wav`;
			}
		} catch(err) {
			console.error(err);
		}
	}
	return son;
}

list = function() {
	return `_Sons disponibles : ${listOfSounds.toString()}_`;
}