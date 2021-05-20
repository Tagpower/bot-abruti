module.exports = {
	name: 'mute',
	description: "Empêche un membre de poster des messages.",
	works_in_dm: false,
	moderation: true, //TODO
	execute(message, args) {
		if(message.member.hasPermission("ADMINISTRATOR")) { //FIXME
			let duree = 60;
			if (!(isNaN(parseInt(args[1])) || parseInt(args[1]) < 1 || args[1] === undefined)) {
				duree = parseInt(args[1]);
			}
			let mute_role = message.guild.roles.cache.find(r => r.name === 'Mute'); // this is where you can replace the role name
			let member = message.mentions.members.first();
			if (!member) {
				message.channel.send(`_Choisis quelqu'un à muter, abruti !_ ${emoji('abruti')}`);
				return;
			}
			console.log(member.user.id);
			if (member.user.username === 'A.B.R.U.T.I.' && member.user.bot) {
				message.channel.send(`_Non mais dis donc, tu crois qu'on peut me faire taire aussi facilement !? ${emoji('abruti')}_`);
			} else {
				member.roles.add(mute_role.id); // <- this assign the role
				setTimeout(() => {
					//if (member.roles.cache.has(mute_role.id)) {
						member.roles.remove(mute_role.id);
						message.channel.send(`_**${member.displayName}** n'est plus mute. Mais fais gaffe, on te surveille !_ ${emoji('abruti')}`);
					//}
				}, duree * 1000); // <- sets a timeout to unmute the user.
				message.channel.send(`${emoji('abruti')}:right_fist::boom:_**${member.displayName}** se prend ${duree} secondes de mute !_`);
			}
		} else {
			message.channel.send(`_Hé ! Seul Tag a le droit de faire ça !_ ${emoji('abruti')}`);
		}
	}
}
