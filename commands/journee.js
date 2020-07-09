const myId = require("../abruti.js").myId;
var qui_a_demande_sa_journee_aujourdhui = require("../abruti.js").qui_a_demande_sa_journee_aujourdhui;

module.exports = {
	name: 'journee',
	aliases: ["journée"],
	description: "Demande au bot comment va se passer ta journée.",
	works_in_dm: true,
	execute(message, args) {

        console.log(qui_a_demande_sa_journee_aujourdhui);
        if (qui_a_demande_sa_journee_aujourdhui.find(p => p === message.author.id) && !(message.author.id === myId)) {
            message.channel.send(`*Je t'ai déjà annoncé ta journée, toi !* ${emoji('abruti')}`);
        } else {
            var reponse = `Salut **${message.author.username}** ! Laisse-moi te dire comment va se passer ta journée... ${emoji('abruti')}:open_hands::crystal_ball:\n\n`;
            
            // switch (Math.floor(Math.random()*11)) {
                //     case 0:
                //         reponse += [":zero: Oh putain, je sais pas quel dieu sadique t'as énervé récemment, mais tu vas passer une des pires journées que t'aies connues !",
                //         ":zero: Bah dis donc, t'as vraiment pas de bol, toi ! Grosse journée de chiasse en perspective !"].sample();
                //     break;
                //     case 1:
                //         reponse += [":one: Houlà... Désolé mais je crois que tu vas passer une sacrée journée à chier !",
                //         ":one: Pas de chance, ça va être une journée sacrément pourrie !"].sample();
                //     break;
                //     case 2:
                //         reponse += [":two: Ouais bah ça va être une journée bien naze. T'aurais mieux fait de pas t'lever !",
                //         ":two: Mouais, comme un lundi après les vacances en ayant laissé plein de boulot de merde en plan !"].sample();
                //     break;
                //     case 3:
                //         reponse += [":three: Journée pas terrible. T'attends pas à grand-chose de cool...",
                //         ":three: Journée un peu caca. Désolé."].sample();
                //     break;
                //     case 4:
                //         reponse += [":four: Journée bof... ça pourrait être pire, mais pas super quand même.",
                //         ":four: Journée neutre à tendance ennuyeuse. Courage !"].sample();
                //     break;
                //     case 5:
                //         reponse += [":five: Mouais, journée totalement quelconque. Ni bonne ni mauvaise.",
                //         ":five: Journée on ne peut plus normale. Du bon et du mauvais, mais rien d'exceptionnel."].sample();
                //     break;
                //     case 6:
                //         reponse += [":six: Bon, pas une journée de fou, mais quelques trucs positifs quand même.",
                //         ":six: Journée correcte. Un peu de tranquillité !"].sample();
                //     break;
                //     case 7:
                //         reponse += [":seven: Journée pas mal, pas trop de souci à te faire !",
                //         ":seven: Tu vas voir, ça va être une journée plutôt sympa !"].sample();
                //     break;
                //     case 8:
                //         reponse += [":eight: Profite, ça va être une journée très cool !",
                //         ":eight: Super, voilà une journée dont tu vas me dire des nouvelles !"].sample();
                //     break;
                //     case 9:
                //         reponse += [":nine: Journée de malade !! Que du bonheur pour toi aujourd'hui !" ,
                //         ":nine: Je te prédis une journée absolument géniale ! Trop cool !"].sample();
                //     break;
                //     case 10:
                //         reponse += [":keycap_ten: HELL YEAH !!! Ça va être une journée dont tu te souviendras toute ta vie !",
                //         ":keycap_ten: OH YEAH !!! Une des meilleures journées que t'aies jamais passées !"].sample();
                //     break;
                // }
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
                ":nine: Journée de malade !! Que du bonheur pour toi aujourd'hui !",
                ":nine: Je te prédis une journée absolument géniale ! Trop cool !",
                ":keycap_ten: HELL YEAH !!! Ça va être une journée dont tu te souviendras toute ta vie !",
                ":keycap_ten: OH YEAH !!! Une des meilleures journées que t'aies jamais passées !",
                ":exploding_head: Tu vas te rendre compte de quelque chose d'hallucinant !",
                ":exploding_head: Une guerre nucléaire va démarrer juste au-dessus de chez toi !",
                ":shushing_face: Quelqu'un va se confier à toi...",
                ":shushing_face: Attention : ton prochain repas va te faire faire des pets silencieux mais mortels !",
                ":nose: Mouais, je la sens pas, cette journée...",
                ":clown: Bon, est-ce que j'ai vraiment besoin d'expliquer comment tu vas foutre en l'air tout ce que tu feras aujourd'hui ?",
                ":giraffe:Aujourd'hui, une girafe vous lèchera l'oreille : signe de bonne chance !",
                ":flushed: Quelque chose ou quelqu'un va vous surprendre positivement !",
                ":sauropod: Tu vas te prendre un GROS coup de vieux !",
                ":tea: Un p'tit thé, et ça ira mieux !",
                ":coffee: Pas la peine de se faire d'illusions, ça ira pas mieux après ton petit café !",
                ":cloud_rain: La météo va ruiner tout ce que tu as prévu aujourd'hui !",
                ":popcorn: Il va y avoir du drama très croustillant aujourd'hui !"
                
            ].sample();
            qui_a_demande_sa_journee_aujourdhui.push(message.author.id);
            console.log(qui_a_demande_sa_journee_aujourdhui);
            
            message.channel.send(`*${reponse}* ${emoji('abruti')}`);
        }
	}
}