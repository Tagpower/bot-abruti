module.exports = {
	name: 'cobaye',
	description: "Attribue ou retire le role Cobaye",
	works_in_dm: false,


	execute(message, args) {
		let role_cobaye = message.guild.roles.cache.find(r => r.name === 'Cobayes');
		//console.log(role_cobaye);
		//console.log(message.member.roles);
		if(message.member.roles.cache.has(role_cobaye.id)) {
			message.member.roles.remove(role_cobaye.id);
			message.channel.send(`_Bah alors **${message.author.username}**, on veut plus être un cobaye ? Bon, d'accord..._ ${emoji("plsabruti")}` );
		} else {
			message.member.roles.add(role_cobaye.id);
			message.channel.send(`_Félicitations **${message.author.username}**, tu es maintenant un cobaye !_ ${emoji("abruti")}`  );
		}

	}
}