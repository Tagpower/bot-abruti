function roulette() {
	var nombre = Math.floor(Math.random() * 37);
	if (nombre == 0) {
		return `${emoji("abruti")}:ok_hand: :curly_loop: :white_circle:\n_Zéro !_ :green_circle:`;
	} else {
		var couleur = ([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(nombre) ? ":red_circle:" : ":black_circle:");
		var parite = (nombre % 2 == 0 ? "pair" : "impair");
		var passe = (nombre <= 18 ? "manque" : "passe");
		return `${emoji("abruti")}:ok_hand: :curly_loop: :white_circle:\n*${nombre} ${couleur}, ${parite} et ${passe} !*`;
	}
}
		
module.exports = {
	name: 'roulette',
	description: 'Tire un nombre à la roulette.',
	works_in_dm: true,
	execute(message, args) {
		message.channel.send(roulette());
	}
}