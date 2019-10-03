module.exports = {
	name: 'journee',
	aliases: ["journée"],
	description: "Demande au bot comment va se passer ta journée.",
	works_in_dm: true,
	execute(message, args) {
		var reponse = `Salut **${message.author.username}** ! Laisse-moi te dire comment va se passer ta journée... ${emoji('abruti')}:open_hands::crystal_ball:\n\n`;
				reponse += [":zero: Oh putain, je sais pas quel dieu sadique t'as énervé récemment, mais tu vas passer une des pires journées que t'aies connues !",
							":zero: Bah dis donc, t'as vraiment pas de bol, toi ! Grosse journée de chiasse en perspective !",
                            ":one: Houlà... Désolé mais je crois que tu vas passer une sacrée journée à chier !",
                            ":one: Pas de chance, ça va être une journée sacrément pourrie !",
                            ":two: Ouais bah ça va être une journée bien naze. T'aurais mieux fait de pas t'lever !",
                            ":two: Mouais, comme un lundi après les vacances en ayant laissé plein de boulot de merde en plan !",
                            ":three: Journée pas terrible. T'attends pas à grand-chose de cool...",
                            ":three: Journée un peu caca. Désolé.",
                            ":four: Journée bof... ça pourrait être pire, mais pas super quand même.",
                            ":four: Journée neutre à tendance ennuyeuse. Courage !",
                            ":five: Mouais, journée totalement quelconque. Ni bonne ni mauvaise.",
                            ":five: Journée on ne peut plus normale. Du bon et du mauvais, mais rien d'exceptionnel.",
                            ":six: Bon, pas une journée de fou, mais quelques trucs positifs quand même.",
                            ":six: Journée correcte. Un peu de tranquillité !",
                            ":seven: Journée pas mal, pas trop de souci à te faire !",
                            ":seven: Tu vas voir, ça va être une journée plutôt sympa !",
                            ":eight: Profite, ça va être une journée très cool !",
                            ":eight: Super, voilà une journée dont tu vas me dire des nouvelles !",
                            ":nine: Journée de malade !! Que du bonheur pour toi aujourd'hui !" ,
                            ":nine: Je te prédis une journée absolument géniale ! Trop cool !" ,
							":keycap_ten: HELL YEAH !!! Ça va être une journée dont tu te souviendras toute ta vie !",
							":keycap_ten: OH YEAH !!! Une des meilleures journées que t'aies jamais passées !"].sample();
							
        message.channel.send(`*${reponse}* ${emoji('abruti')}`);
	}
}