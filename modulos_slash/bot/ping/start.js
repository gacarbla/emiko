const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    try {
      var embed = new Discord.MessageEmbed()
        .setDescription(`${client.ws.ping} ms`)
        .setColor(0x5865f2)
      await interaction.reply({ embeds: [embed], ephemeral: true }).catch((e)=>{
        require("../../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
      })
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    }
  }
}