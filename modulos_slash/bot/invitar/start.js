const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    try {
      // Establece un nuevo embed
      var embed = new Discord.MessageEmbed()
        .setTitle('INVITAR A DORI')
        .setURL('https://top.gg/bot/851215512427823104/invite')
        .setDescription('Invita a Dori a tu servidor desde top.gg\n\nhttps://top.gg/bot/851215512427823104/invite')
        .setThumbnail(client.user.avatarURL())
        .setColor(0x5865f2)

      // Envía el embed y si no puede envía error 05
      await interaction.reply({ embeds: [embed], ephemeral: true }).catch((e)=>{
        require("../../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
      })
    } catch (e) {
      // Envía un mensaje de error
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    }
  }
}