module.exports = (client, guildMember) => {
    // Add the new user to the default role of "Disciple"
    console.log(`${guildMember.user.username} has joined the server.`);
    const channel = guildMember.guild.channels
        .find(channel => channel.name === client.config.defaultChannel)
        .send(`${guildMember.user.username} has entered the pit!`);
    return;
};