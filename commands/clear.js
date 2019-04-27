module.exports = {
	name: 'clear',
	description: "Efface un certain nombre de messages.",
	works_in_dm: false,
	moderation: true, //TODO
	execute(message, args) {
		if(isNaN(parseInt(args[0])) || parseInt(args[0]) < 1 || args[0] === undefined) {
			message.channel.send(`_Donne-moi un nombre de messages à effacer !_ ${emoji('pls')}`);
		} else {
			if (message.member.hasPermission("MANAGE_MESSAGES")) {
				message.channel.fetchMessages({limit: parseInt(args[0])+1})
				.then(mess => {
						message.channel.bulkDelete(mess)
					}, function(err){message.channel.send(`_March po_ ${emoji('abruti')}`)})                        
				message.channel.send(`_${args[0]} message${args[0] > 1 ? 's':''} à la poub' !_ ${emoji('abruti')}`)
					.then(mess => {mess.delete(6000)});
			} else {
				message.channel.send(`_Dis donc, tu crois avoir le droit de supprimer des messages comme ça ?_ ${emoji('abruti')}`);
			}
		}
	}
}


			
