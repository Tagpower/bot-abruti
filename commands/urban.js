//Tester l'interrogation d'API
const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');

const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);


module.exports = {
	name: 'urban',
	description: "Rechercher une définition sur UrbanDictionary.",
	works_in_dm: true,
	execute: async function (message, args) {
		if (!args.length) {
			return message.channel.send(`_Entre un terme à chercher, abruti !_ ${emoji('abruti')}`);
		}
		const query = querystring.stringify({ term: args.join(' ') });
		const {list} = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

		if (!list.length) {
			return message.channel.send(`_Y a pas de résultat pour **${args.join(' ')}**... t'as dû vraiment chercher un truc chelou !_`);
		}

		const [answer] = list;

		const embed = new Discord.RichEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addField('Definition', trim(answer.definition.replace(/[\[\]']+/g,''), 256))
			.addField('Example', trim(answer.example.replace(/[\[\]']+/g,''), 256))
			.addField('Rating', `${answer.thumbs_up} :thumbsup: ${answer.thumbs_down} :thumbsdown:.`);

		message.channel.send(embed);
		
	}
}