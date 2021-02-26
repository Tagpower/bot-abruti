const myId = require("../abruti.js").MY_ID;
var qui_a_demande_sa_journee_aujourdhui = require("../abruti.js").qui_a_demande_sa_journee_aujourdhui;

const { Client } = require('pg');
const DB = require('../abruti.js').Constants.DATABASE;

module.exports = {
	name: 'journee',
	aliases: ["journée"],
	description: "Demande au bot comment va se passer ta journée.",
	works_in_dm: true,
	// execute(message, args) {

    //     console.log(qui_a_demande_sa_journee_aujourdhui);
    //     if (qui_a_demande_sa_journee_aujourdhui.find(p => p === message.author.id) && !(message.author.id === myId)) {
    //         message.channel.send(`*Je t'ai déjà annoncé ta journée, toi !* ${emoji('abruti')}`);
    //     } else {
    //         var reponse = `Salut **${message.author.username}** ! Laisse-moi te dire comment va se passer ta journée... ${emoji('abruti')}:open_hands::crystal_ball:\n\n`;
            
    //             reponse += [":zero: Oh putain, je sais pas quel dieu sadique t'as énervé récemment, mais tu vas passer une des pires journées que t'aies connues !",
    //             ":zero: Bah dis donc, t'as vraiment pas de bol, toi ! Grosse journée de chiasse en perspective !",
    //             ":one: Houlà... Désolé mais je crois que tu vas passer une sacrée journée à chier !",
    //             ":one: Pas de chance, ça va être une journée sacrément pourrie !",
    //             ":one: Ouh, la bonne journée dégueulasse qui se prépare !...",
    //             ":two: Ouais bah ça va être une journée bien naze. T'aurais mieux fait de pas t'lever !",
    //             ":two: Mouais, comme un lundi après les vacances en ayant laissé plein de boulot de merde en plan !",
    //             ":two: Journée bien pourrie. Voilà.",
    //             ":three: Journée pas terrible. T'attends pas à grand-chose de cool...",
    //             ":three: Journée un peu caca. Désolé.",
    //             ":three: Une journée qui risque de mal commencer.",
    //             ":four: Journée bof... ça pourrait être pire, mais pas super quand même.",
    //             ":four: Journée neutre à tendance ennuyeuse. Courage !",
    //             ":four: Journée pas ouf. Peut-être demain ?",
    //             ":five: Mouais, journée totalement quelconque. Ni bonne ni mauvaise.",
    //             ":five: Journée on ne peut plus normale. Du bon et du mauvais, mais rien d'exceptionnel.",
    //             ":five: Journée oubliable. Mais au moins, pas trop de problèmes.",
    //             ":six: Bon, pas une journée de fou, mais quelques trucs positifs quand même.",
    //             ":six: Journée correcte. Un peu de tranquillité !",
    //             ":six: Journée normale, mais avec ptet une petite surprise !",
    //             ":seven: Journée pas mal, pas trop de souci à te faire !",
    //             ":seven: Tu vas voir, ça va être une journée plutôt sympa !",
    //             ":seven: Une journée qui fait plaisir !",
    //             ":eight: Profite, ça va être une journée très cool !",
    //             ":eight: Super, voilà une journée dont tu vas me dire des nouvelles !",
    //             ":eight: Journée super cool ! Enfin !",
    //             ":nine: Journée de malade !! Que du bonheur pour toi aujourd'hui !",
    //             ":nine: Je te prédis une journée absolument géniale ! Trop cool !",
    //             ":nine: Une journée trop bien qui va rentrer dans les mémoires !!",
    //             ":keycap_ten: HELL YEAH !!! Ça va être une journée dont tu te souviendras toute ta vie !",
    //             ":keycap_ten: OH YEAH !!! Une des meilleures journées que t'aies jamais passées !",
    //             ":keycap_ten: FUCK YEAH !!! LA MEILLEURE JOURNÉE EN FAIT !",
    //             ":exploding_head: Tu vas te rendre compte de quelque chose d'hallucinant !",
    //             ":exploding_head: Une guerre nucléaire va démarrer juste au-dessus de chez toi !",
    //             ":shushing_face: Quelqu'un va se confier à toi...",
    //             ":shushing_face: Attention : ton prochain repas va te faire faire des pets silencieux mais mortels !",
    //             ":nose: Mouais, je la sens pas, cette journée...",
    //             ":nose: Joyeux nez !!",
    //             ":clown: Bon, est-ce que j'ai vraiment besoin d'expliquer comment tu vas foutre en l'air tout ce que tu feras aujourd'hui ?",
    //             ":clown: Mais dis donc, t'as avalé un clown aujourd'hui ?",
    //             ":giraffe: Aujourd'hui, une girafe te lèchera l'oreille : signe de bonne chance !",
    //             ":flushed: Quelque chose ou quelqu'un va te surprendre positivement !",
    //             ":sauropod: Tu vas te prendre un GROS coup de vieux !",
    //             ":tea: Un p'tit thé, et ça ira mieux !",
    //             ":coffee: Pas la peine de se faire d'illusions, ça ira pas mieux après ton petit café !",
    //             ":cloud_rain: La météo va ruiner tout ce que tu as prévu aujourd'hui !",
    //             ":popcorn: Il va y avoir du drama très croustillant aujourd'hui !",
    //             ":hedgehog: Il va falloir aller vite !",
    //             ":woman_health_worker: Si tu vas voir ton médecin aujourd'hui, t'auras moitié prix sur la prochaine consultation !",
    //             ":whale: Attention aux chutes de baleines !",
    //             ":sheep: Journée pleine de douceur !",
    //             ":cherry_blossom: JAAAPOOOON !",
    //             ":hibiscus: Tu vas découvrir une nouvelle saveur de thé !",
    //             ":sneezing_face: Tu vas choper un vieux rhume à la con !",
    //             ":ok_hand: Tout ira bien aujourd'hui !",
    //             ":herb: Journée en communion avec la nature !",
    //             ":point_right: Tu vas être particulièrement de droite aujourd'hui !",
    //             ":point_left: Tu vas être particulièrement de gauche aujourd'hui !",
    //             ":leaves: Tu vas te prendre des gros vents mdr",
    //             ":pray: Le seul moyen de tenir le coup aujourd'hui, c'est de prier !",
    //             ":pleading_face: Pas la peine de me faire ces yeux de chat perdu, tu vas passer une journée nulle quand même !",
    //             ":slight_smile: :)",
    //             ":bricks: Tu vas être con comme une brique aujourd'hui !",
    //             ":avocado: Tu vas ptet avoir besoin d'appeler un avocat !",
    //             ":pretzel: Une journée bonne, mais salée !",
    //             ":peanuts: Tu vas tomber sur un très gros paquet de cacahuètes !",
    //             ":ferris_wheel: On va t'inviter au parc d'attractions !",
    //             ":busstop: Tu vas te faire emmerder dans le bus !",
    //             ":octagonal_sign: Tu vois ce que tu as fait hier ? BAH TU ARRÊTES",
    //             ":milky_way: Une bonne soirée pour regarder les étoiles !",
    //             ":first_place: Tu vas enfin gagner quelque part !",
    //             ":gem: Tu vas trouver plein de diamants dans Minecraft !",
    //             ":peacock: Tu vas te retrouver avec plein de plumes dans l'train !",
    //             ":rainbow: Tu vas devenir ultra gay (encore plus que d'habitude !)",
    //             ":pride_flag: Quelqu'un va te faire son coming-out !",
    //             ":cherries: Attention aux casse-couilles !",
    //             ":paperclips: Il semblerait que vous voulez savoir comment va se passer votre journée. Voulez-vous de l'aide ?",
    //             ":wastebasket: Journée à jeter. Point.",
    //             ":martial_arts_uniform: Tu prends un problème, et tu lui RETOURNES SA RACE !",
    //             ":abacus: Tu vas faire un mauvais calcul qui va te niquer toute ta journée !",
    //             ":man_mage: Un vieux magicien va t'annoncer ta destinée !",
    //             ":cloud_tornado: La journée va être mouvementée !",
    //             ":palm_tree: Un palmier va te faire de l'ombre !",
    //             ":watermelon: Manger une pastèque améliorera grandement ta journée !",
    //             ":repeat: Mouais, quasiment la même journée qu'hier.",
    //             ":sos: Demande de l'aide, tu t'en sortiras pas sans !",
    //             ":boomerang: Une connerie passée va bientôt retomber sur toi !",
    //             ":four_leaf_clover: Tu pourrais avoir beaucoup de chance aujourd'hui !",
    //             ":shamrock: Aujourd'hui, tu auras... pas plus de chance que d'habitude.",
    //             ":plunger: Journée de type chiotte !",
    //             ":brain: Tes capacités mentales (quelles qu'elles soient) vont se dépasser aujourd'hui !",
    //             ":sloth: OH LA GROSSE FLEMMASSE, HEIN.",
    //             ":bee: Une bonne journée pour sauver les abeilles !",
    //             ":ring: Tu vas peut-être te fiancer... un jour !",
    //             ":wind_blowing_face: Je te recommande de souffler un peu, aujourd'hui !",
    //             ":butterfly: Réfléchis aux conséquences de tes actes !",
    //             ":radioactive: Bon, va prendre une douche là, ça devient dangereux !...",
    //             ":eyes: Ta curiosité risque de te jouer des tours !",
    //             ":gift_heart: Quelqu'un va te faire un cadeau très touchant !",
    //             ":owl: Y aura un hibou derrière toi à un moment !",
    //             ":lungs: N'oublie pas de respirer !",
    //             ":nut_and_bolt: Tu vas faire du bricolage... et magnifiquement tout foirer !",
    //             ":pirate_flag: Au diable les principes, tu vas obtenir quelque chose illégalement !"
                
    //         ].sample();
    //         //qui_a_demande_sa_journee_aujourdhui.push(message.author.id);
    //         console.log(qui_a_demande_sa_journee_aujourdhui);
            
    //         message.channel.send(`*${reponse}* ${emoji('abruti')}`);
    //     }
    // }

    execute(message, args) {
        var nombre, random;
        db_client.query('SELECT count(*) AS nombre FROM public.journee', (err, res) => {
            if (err) console.log(err);
            nombre = res.rows[0].nombre;
            random = Math.floor(Math.random() * nombre) +1;
         
            db_client.query(`SELECT * FROM public.journee WHERE id=${random}`, (err, res) => {
                if (err) console.log(err);
                var reponse = `*Salut **${message.author.username}** ! Laisse-moi te dire comment va se passer ta journée... ${emoji('abruti')}:open_hands::crystal_ball:\n\n`;
                message.channel.send(`${reponse} :${res.rows[0].emoji}: ${res.rows[0].texte}* ${emoji('abruti')}`);
                
            });
        });
    }
    
   
}

const db_client = new Client({
    host: DB.HOST,
    port: 5432,
    user: DB.USER,
    password: DB.PASSWORD,
    database: DB.DATABASE,
    //connectionString: process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false
    }
});

db_client.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connexion DB faite !');
    }
});
    

