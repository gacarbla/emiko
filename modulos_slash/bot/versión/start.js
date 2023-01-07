const Discord = require('discord.js')
const config = require('../../../ajustes.json')
var version = config.version
const package = require('../../../package.json')
var discordjs = package.dependencies['discord.js']

module.exports = {
  run: async (client, interaction) => {
    try {

      // Establece un nuevo embed
      var embed = new Discord.MessageEmbed()
        .addField('Versión BOT', `${version}`, true)
        .addField('Versión Discord.js', `${discordjs.slice(1)}`, true)
        .setColor(0x5865f2)
      
      // Intenta enviar el embed, pero si no puede envía error 05
      await interaction.reply({ embeds: [embed], ephemeral: true }).catch((e)=>{
        require("../../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
      })
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    }
  }
}