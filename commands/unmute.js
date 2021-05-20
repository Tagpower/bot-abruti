module.exports = {
	name: 'unmute',
	description: "Lève un mute précédemment appliqué à un membre.",
	works_in_dm: false,
	moderation: true, //TODO        
    execute(message, args) {
        if(message.member.hasPermission("ADMINISTRATOR")) {
            let mute_role = message.guild.roles.cache.find(r => r.name === "Mute"); // this is where you can replace the role name
            let member = message.mentions.members.first();
            if (!member) {
                message.channel.send(`_Choisis quelqu'un à démuter, abruti !_ ${emoji('abruti')}`);
                return;
            }
            if (member.roles.cache.has(mute_role.id)) {
                member.roles.remove(mute_role); // <- this assign the role
                message.channel.send(`_**${member.displayName}** n'est plus mute. Mais fais gaffe, on te surveille !_ ${emoji('abruti')}`);
            } else {
                message.channel.send(`_**${member.displayName}** n'était pas mute, abruti !_ ${emoji('abruti')}`);
            }
        } else {
            message.channel.send(`_Hé ! Seul Tag a le droit de faire ça !_ ${emoji('abruti')}`);
        }
    }
}