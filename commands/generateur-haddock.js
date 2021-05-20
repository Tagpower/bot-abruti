
const salutations = ["Salut","Salut","Bonjour","Salutations","Bonjour", "Bonsoir", "Coucou", "Holà"];

const groupes = ["bande","bande","ramassis","tas","espèces","bougres"];

const adjectifs_N = ["de","de","de","de","de","de","de","de","d'infâmes", "d'ignobles", "d'horribles", "de sales", "de jeunes", "de sombres",
					"d'immondes", "de triples", "de quintuples", "de pauvres","d'enfants de","d'insupportables", "de misérables", "d'incorrigibles"];
const adjectifs_M = ["d'affreux", "de gros", "de vieux", "de petits", "d'insignifiants", "de grands", "d'éternels","de fils de", "de fichus", "de maudits",
					 "de satanés"].concat(adjectifs_N);
const adjectifs_F = ["d'affreuses", "de grosses", "de vieilles", "de petites", "d'insignifiantes", "de grandes", "d'éternelles", "de fichues", "de maudites",
					 "de satanées"].concat(adjectifs_N);

const objets_M = ["porcs","tabourets","tractopelles","abrutis","chiens","gens plutôt méprisables","bâtards",
				"fumiers","consanguins","clochards","gougnafiers","déchets","demeurés","moules à gaufre","bachi-bouzouks","branquignols","branques",
				"meurtriers récidivistes","rats","incapables","malpropres","péquenauds","clampins","pervers",
				"gibiers de potence", "anthropopithèques", "boit-sans-soif", "pirates", "casse-pieds", "chauffards", "cloportes", "cornichons",
				"diables","doryphores","ectoplasmes","emplâtres","enfonceurs de portes ouvertes","escogriffes","escrocs","flibustiers","marins d'eau douce",
				"forbans","galopins", "gangsters","garnements","vauriens","gredins","gros-pleins-de-soupe","hurluberlus","hors-la-loi","iconoclastes","lascars",
				"malappris","malotrus","scélérats", "faux jetons", "écornifleurs", "zouaves", "zouaves", "zouaves", "vers de terre", "moussaillons", "olibrius",
				"ornythorinques", "ostrogoths", "pachydermes", "paltoquets", "patapoufs", "pirates d'eau douce", "renégats", "sacripants", "sapajous", "saltimbanques",
				"sauvages", "terroristes", "troglodytes", "va-nu-pieds", "vandales", "zapotèques" ];

const objets_F = ["truies","pourritures","connasses","ordures","catins","raclures de lavabo","aubergines",
				"bennes à ordures","fosses septiques","feignasses","erreurs de la nature","hontes de l'Humanité","perverses",
				"cloches à fromage","diablesses","grenouilles","saletés","sauvages", "vermines"];

// const objets_substance_M = ["sacs à","réservoirs de","canons à","camions de","mangeurs de","coulis de","jerrycans de","refourgueurs de","dealers de","distributeurs de",
// 							"résidus de","robinets à","torchons à","marchands de"];

// const objets_substance_F = ["poches à","flaques de","capotes remplies de","serviettes à","poubelles à", "boîtes à", "mangeuses de", "brosses à", "piscines à",
// 							"omelettes de", "soupes de", "marchandes de"];

// const substances = ["caca","merde","chiasse","vomi","morve","foutre","sperme","sperme séché","glaires","pisse","excréments","gerbouille","cyprine","mouille","diarrhée","vieux pâté","dégueulis",
// 					"crottes de nez","urine","crotte"];

const conteneurs = ["en boîte","en spray","en poudre","en tube","en barres","en bocal","en tonneau","en bouteille"];

const animal = ["chèvre","chien","cheval","chat","yack","boeuf","rhinocéros","lapin","lama","tigre","dromadaire"]; //TODO

const complements_N = ["des bois","des plaines","des montagnes","des mers","des neiges","à deux balles","en rut",
					"à la mords-moi-l'noeud","à la sauce barbecue","à la sauce soja","à la sauce samouraï","à la sauce blanche","à la sauce tartare",
					"sans ketchup","qui feraient vomir un dromadaire", "interplanétaires",
					"borgnes","malades","à vomir","en putréfaction","à l'eau de Javel","en Sopalin",
					"en mousse","en carton","du schnidouboub","des ténèbres","à roulettes","au rabais","en feu", "à la graisse de hérisson", "de carnaval",
					"à la noix de coco", "des Alpes"];

const complements_M = ["finis","dégénérés","pourris","dépressifs","putassiers","croupissants","galeux","moisis","surgelés","volants","finis à la pisse",
					   "contagieux","repoussants","répugnants", "diplômés","ambulants", "mal embouchés", "mal léchés"].concat(complements_N);
const complements_F = ["finies","dégénérées","pourries","dépressives","putassières","croupissantes","galeuses","moisies","surgelées","volantes","finies à la pisse",
					   "contagieuses","repoussantes","répugnantes", "diplômées","ambulantes", "mal embouchées", "mal léchées"].concat(complements_N);

const complements_bonus = ["de mille sabords", "de tonnerre de Brest", "de mille millions de mille sabords", "de malheur", "de mille sabords de tonnerre de Brest",
						   "de mille milliards de mille sabords", "de mille tonnerres de Brest"]

const questions = ["comment ça va", "ça va", "comment ça se passe", "comment vous allez", "vous faites quoi", "quoi de neuf", "quoi de beau",
				  "je vous dérange pas", "je vous ai manqué", "vous allez bien", "vous passez une bonne journée", "tout va bien", "comment allez-vous"];

const images = [
	"https://www.telerama.fr/sites/tr_master/files/styles/simplecrop1000/public/medias/2016/07/media_145803/mille-sabords-le-capitaine-haddock-est-vraiment-increvable%2CM360308.jpg",
	"https://anniversaire-celebrite.com/upload/250x333/capitaine-haddock-250.jpg",
	"http://media.topito.com//wp-content/uploads/2007/08/haddock-600x434.jpg",
	"https://www.babelio.com/users/QUIZ_Tintin--jurons-insultes-injures-du-capitaine-Hadd_3322.jpeg",
	"https://3.bp.blogspot.com/-QthrXpCPX9Y/UfYsjw7S1oI/AAAAAAAAC78/EMXuTDAhxlw/s1600/Haddock_E20010523_01.png",
	"https://i2.wp.com/portdattache.bzh/wp-content/uploads/2017/01/haddock-mecontent.jpg",
	"https://images-na.ssl-images-amazon.com/images/I/41XE28jQs6L._AC_.jpg",
	"https://tintinbd.files.wordpress.com/2015/03/images.jpg",
	"https://www.artmajeur.com/medias/standard/v/i/vivien-apotheloz/artwork/10826836_img-2237.jpg",
	"https://www.lamarquezone.fr/images/Image/tintin-haddock-statuette-44017.jpg",
	"https://img.20mn.fr/YjnHtCZ6RkGWGJpYCosazw/310x190_haddock-interprete-andy-serkis-aventures-tintin-secret-licorne.jpg",
	//"https://external-preview.redd.it/p_Ois3XZ90RwSYXo07X5uHL_YwQjSZAGScHpvsuX2tI.jpg",
	"https://i.dailymail.co.uk/i/pix/2011/10/06/article-2045560-0E426F1C00000578-35_634x350.jpg",
	"https://i.ytimg.com/vi/U2F9IGm066Q/hqdefault.jpg"
]

Array.prototype.sampleProba = function(p) {
	if (Math.random() < p) {
		return this.sample();
	} else {
		return "";
	}
}

function objet_M() {
	//if (Math.random() < 0.75) {
		return objets_M.sample();
	// } else {
	// 	return objets_substance_M.sample() + " " + substance();
	// } 
}

function objet_F() {
	//if (Math.random() < 0.75) {
		return objets_F.sample();
	// } else {
	// 	return objets_substance_F.sample() + " " + substance();
	// } 
}

function substance() {
	if (Math.random() < 0.5) {
		return substances.sample();
	} else if (Math.random() < 0.75) {
		return substances.sample() + " " + conteneurs.sample(); 
	} else {
		return substances.sample() + " de " + animal.sample(); 
	}
}

function adjectifObjetComplement() {
	if (Math.random() < 0.5) {
		return adjectifs_M.sample() + " " + objet_M() + " " + complements_M.sampleProba(0.75) + " " + complements_bonus.sampleProba(0.25);
	} else {
		return adjectifs_F.sample() + " " + objet_F() + " " + complements_F.sampleProba(0.75) + " " + complements_bonus.sampleProba(0.25);
	}
}

function contract(string) {
	return string.replace(/ de a/gi, " d'a").replace(/ de e/gi," d'e").replace(/ de é/gi," d'é").replace(/ de u/gi," d'u").replace(/ de i/gi, " d'i").replace(/ de o/gi," d'o").replace(/  /gi," ").replace(/ ,/gi,",");
}

function generate() {
	return contract(`${salutations.sample()} ${groupes.sample()} ${adjectifObjetComplement()}, ${questions.sample()} ?`);
}

module.exports = {
	name: 'haddock',
	description: "Affiche un message de salutations du Capitaine Haddock. Ajoutez 'image' pour y adjoindre une accueillante image d'Archibald !",
	works_in_dm: true,
	execute(message, args) {
		if (args[0] == "image") {
			message.channel.send(`_${generate()}_ `, {files: [images.sample()]});
		} else {
			message.channel.send(`_${generate()}_ `);
		}
	},
	executeFromCron(channel) {
		channel.send(`_${generate()}_ ` + emoji("abruti"));
	}
}