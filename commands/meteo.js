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
			// Weather.getCurrent(args.join(" "), function(current) {
			// 	console.log(
			// 	  ["currently:",current.temperature(),"and",current.conditions()].join(" ")
			// 	);
			//   });
			  
			// Weather.getForecast(args.join(" "), function(forecast) {
			// console.log("Forecast High in Kelvin: " + forecast.high());
			// console.log("Forecast High in Fahrenheit" + Weather.kelvinToFahrenheit(forecast.high()));
			// console.log("Forecast High in Celsius" + Weather.kelvinToCelsius(forecast.high()));
			//});
			// const query = querystring.stringify({ term: args.join(' ') });
			// console.log(Weather.getApiKey());
			//const {list} = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${args.join("+")}&units=metric&appid=${Weather.getApiKey()}`).then(response => response.json());
			const query = querystring.stringify({ q: args.join(' '),
												  metric : true,
												  appid: Weather.getApiKey() });
										
			console.log(query);		  
			const answer = await fetch(`http://api.openweathermap.org/data/2.5/weather?${query}`).then(response => response.json());
			
			console.log(JSON.stringify(answer));

			if (!answer || answer.cod == 404) {
				return message.channel.send(`_J'ai pas trouvé d'infos pour ta ville !_ ${emoji('pls')}`);
			}
		

			var temps = answer.weather[0].main;
			var emoji_temps = "";
			var color = "#008FFF";
			switch (temps) {
				case 'Clear': emoji_temps = ':sunny:'; color = "#FFCF22"; break;
				case 'Drizzle': emoji_temps = ':cloud_rain:'; break;
				case 'Rain': emoji_temps = ':cloud_rain:'; break;
				case 'Snow': emoji_temps = ':cloud_snow:'; color = "#EFEFEF"; break;
				case 'Thunderstorm': emoji_temps = ':thunder_cloud_rain: '; color = "#004F7F"; break;
				case 'Clouds': emoji_temps = ':white_sun_small_cloud:'; color = "#aaaaaa"; break;
				case 'Mist': emoji_temps = ':fog:'; color = "#aaaaaa"; break;
				case 'Fog': emoji_temps = ':fog:'; color = "#999999"; break;

			}
			var humidite = answer.main.humidity;
			var emoji_humidite = "";
			if (humidite >= 95) {
				emoji_humidite = ":droplet::droplet::droplet::droplet:";
			} else if (humidite > 75) {
				emoji_humidite = ":droplet::droplet::droplet:";
			} else if (humidite > 50) {
				emoji_humidite = ":droplet::droplet:";
			} else if (humidite > 25) {
				emoji_humidite = ":droplet:";
			}

			const embed = new Discord.RichEmbed()
				.setColor(color)
				.setTitle(`Météo à ${answer.name}, ${answer.sys.country} : ${emoji_temps}`)
				.addField('Températures', `Min : ${(-273.15 + answer.main.temp_min).toFixed(2)}°C\nMax : ${(-273.15 + answer.main.temp_max).toFixed(2)}°C`)
				.addField('Humidité', `${answer.main.humidity} %` + emoji_humidite)
				.addField('Vent', `${answer.wind.speed} m/s :dash:`)
	
			message.channel.send(embed);
			// console.log(embed)

		} else {
			message.channel.send(`_Entre un nom de ville, abruti !_ ${emoji('abruti')}`);
		}
	}

}