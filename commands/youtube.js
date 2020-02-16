const youtube = require("../abruti.js").youtube;

module.exports = {
	name: 'youtube',
	aliases: ['yt'],
	description: "Cherche une vidéo sur Youtube.",
	works_in_dm: true,
	execute(message, args) {
		if (args.length > 0) {
			youtube.search(args.join(' '), 10, function(error, result) {
				if (error) {
					console.log(error);
					message.channel.send(`_Désolé, je me suis planté comme un abruti !_ ${emoji('plsabruti')}`);
				}
				else {
					//console.log(result.items.find(function(v) {return (v.id.kind === "youtube#video")}));
					//console.log(result)
					if (result.items.length > 0) {
						var reponse = result.items.find(function(v) {return (v.id.kind === "youtube#video")});
						if (reponse) {
							message.channel.send(`_Voilà ta vidéo :_ https://youtube.com/watch?v=${reponse.id.videoId}  ${emoji('abruti')}`);
						} else {
							message.channel.send(`_J'ai rien trouvé..._ ${emoji('plsabruti')}`);
						}
					} else {
						message.channel.send(`_J'ai rien trouvé..._ ${emoji('plsabruti')}`);
					}
				}
			});
		} else {
			message.channel.send(`_Entre des mots-clés ou un lien, abruti !_ ${emoji('abruti')}`);
		}
	}
}