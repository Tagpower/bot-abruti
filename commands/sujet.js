const sujets = ["Quelle est votre odeur préférée ?", "Partagez un de vos souvenirs d'enfance.", "Une petite chose qui vous rend toujours heureux.se ?",
				"Quel est votre plat préféré ?", "Quel est le premier jeu vidéo auquel vous avez joué ?", "Quelle est votre boisson préférée ?",
				"Quel sport aimeriez-vous essayer ?", "Si vous vous retrouviez 100 ans dans le futur, quelle question poseriez-vous en premier ?",
				"Où êtes-vous allé le plus loin de chez vous ?", "Sur quel site allez-vous le plus souvent ?", "Quel est votre plus grand exploit ?",
				"Si on vous demandait de prendre la parole devant le monde entier, que diriez-vous ?", "Quel est l'endroit de votre ville que vous préférez ?",
				"De quelle petite chose auriez-vous envie, là, maintenant ?", "Que préférez-vous consommer au petit déjeuner ?", "Qui est votre membre de famille préféré ?"];


module.exports = {
	name: 'sujet',
	description: "Lance un sujet de conversation",
	works_in_server: true,
	works_in_dm: true,
	execute(message, args) {
		message.channel.send(`${emoji("abruti")}:hand_splayed: :curly_loop: :game_die: _${sujets.sample()}_`);
	}
}
