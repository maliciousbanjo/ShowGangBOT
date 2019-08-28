const Discord = require('discord.js');
exports.run = (client, message) => {
    const query = `
        SELECT EMOTE.name as emote, MAX(EMOTE.count), SERVER.name
        FROM SERVER LEFT JOIN (EMOTE)
        ON (SERVER.server_id = EMOTE.server_id)
        GROUP BY emote
        ORDER BY EMOTE.count DESC 
        LIMIT 1;

        SELECT MAX(USER.messages) as messageCount, discord_id, username
        FROM USER
        GROUP BY username
        ORDER BY messageCount DESC
        LIMIT 1;
    `;

    client.sqlCon.query(query, (error, result, fields) => {
        if (error) throw error;
        const topEmote = client.emojis.find(emoji => emoji.name === result[0][0].emote);
        const maxMessage = message.guild.members.find(user => user.id === result[1][0].discord_id);
        
        const richEmbed = new Discord.RichEmbed()
        .setColor('BLUE')
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL)
        .addField('Created', new Date(message.guild.createdAt).toDateString())
        .addField('Top Emote', `${topEmote}`)
        .addField('Top Poster', `${maxMessage}: ${result[1][0].messageCount}`);

        message.channel.send(richEmbed);
    });
}