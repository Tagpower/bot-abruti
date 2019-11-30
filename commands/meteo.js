const Discord = require('discord.js');
const Weather = require("../abruti.js").weather;
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
	name: 'météo',
	aliases: ["meteo"],
	description: "Donne la météo pour une ville ou un code postal donné.",
	works_in_dm: true,
	execute: async function(message, args) {
		if (args.length > 0) {
			var method, q_args;
			if (args[args.length-1] == "demain") {
				method = "forecast";
				q_args = args.slice(0,-1).join(' ');
			} else {
				method = "weather";
				q_args = args.join(' ')
			}
			console.log(q_args);

			const query = querystring.stringify({ q: q_args,
			metric : true,
			appid: Weather.getApiKey() });
			
			var answer = await fetch(`http://api.openweathermap.org/data/2.5/${method}?${query}`).then(response => response.json());
			if (!answer || answer.cod == 404) {
				return message.channel.send(`_J'ai pas trouvé d'infos pour ta ville !_ ${emoji('pls')}`);
			}
			//console.log(JSON.stringify(answer));

			var cityAndCountry;
			if (method == "forecast") {
				var today = new Date();
				today.setHours(13);
				today.setMinutes(0);
				today.setSeconds(0);
				var tomorrow = new Date(today);
				tomorrow.setDate(today.getDate()+1);
				//tomorrow.setTime(12, 0, 0);
				console.log(today.toISOString().replace("T", " ").slice(0, -5));
				console.log(tomorrow.toISOString().replace("T", " ").slice(0, -5));
				cityAndCountry = answer.city.name + ", " + answer.city.country + " pour demain à 12h";
				answer = answer.list.find(x => x.dt_txt == tomorrow.toISOString().replace("T", " ").slice(0, -5));
				console.log(answer);
				
			} else {
				cityAndCountry = answer.name + ', ' + answer.sys.country;
			}
							
			console.log(answer.weather[0]);
			var temps = answer.weather[0].main;
			var emoji_temps = "";
			var color = "#008FFF";
			switch (temps) {
				case 'Clear': emoji_temps = ':sunny:'; color = "#FFCF22"; break;
				case 'Drizzle': emoji_temps = ':cloud_rain:'; break;
				case 'Rain': emoji_temps = ':cloud_rain:'; break;
				case 'Snow': emoji_temps = ':cloud_snow:'; color = "#EFEFEF"; break;
				case 'Thunderstorm': emoji_temps = ':thunder_cloud_rain: '; color = "#004F7F"; break;
				case 'Clouds': emoji_temps = ':cloud:'; color = "#aaaaaa"; break;
				case 'Mist': emoji_temps = ':fog:'; color = "#aaaaaa"; break;
				case 'Fog': emoji_temps = ':fog:'; color = "#999999"; break;

			}
			var humidite = answer.main.humidity;
			var emoji_humidite = "";
			if (humidite >= 95) {
				emoji_humidite = ":droplet::droplet::droplet::droplet:";
			} else if (humidite >= 75) {
				emoji_humidite = ":droplet::droplet::droplet:";
			} else if (humidite >= 50) {
				emoji_humidite = ":droplet::droplet:";
			} else if (humidite >= 25) {
				emoji_humidite = ":droplet:";
			}
			
			var vent = answer.wind.speed;
			var emoji_vent = "";
			if (vent >= 10.0) {
				emoji_vent = ":dash::dash::dash::dash:";
			} else if (vent >= 7.5) {
				emoji_vent = ":dash::dash::dash:";
			} else if (vent >= 5.0) {
				emoji_vent = ":dash::dash:";
			} else if (vent >= 2.0) {
				emoji_vent = ":dash:";
			}

			const embed = new Discord.RichEmbed()
				.setColor(color)
				.setTitle(`Météo à ${cityAndCountry} : ${emoji_temps}`)
				.addField('Températures', `Min : ${(-273.15 + answer.main.temp_min).toFixed(2)}°C\nMax : ${(-273.15 + answer.main.temp_max).toFixed(2)}°C`)
				.addField('Humidité', `${humidite} %` + emoji_humidite)
				.addField('Vent', `${vent} m/s` + emoji_vent)
	
			message.channel.send(embed);
			// console.log(embed)

		} else {
			message.channel.send(`_Entre un nom de ville, abruti !_ ${emoji('abruti')}`);
		}
	}

}