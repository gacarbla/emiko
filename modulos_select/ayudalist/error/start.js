const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    try {
      const lista = new Discord.MessageActionRow()
  			.addComponents(
  				new Discord.MessageSelectMenu()
  					.setCustomId('ayudalist')
  					.setPlaceholder('Comando')
  					.addOptions([
              {
                label: 'Volver',
                description: 'Volver al menú principal',
  						  value: 'volver',
                emoji: {
                  id: "892449750538924032",
                  name: "atras"
                }
              },{
                label: '/error reportar',
  						  value: 'error_reportar',
              },{
  						  label: '/error significado',
  						  value: 'error_significado',
              },
  					]),
  			);
      var report = "\`/error reportar\` **::** Reportar errores\n"
      var meaning = "\`/error significado\` **::** Buscar el significado de un error\n"
      var embed = new Discord.MessageEmbed()
        .setDescription('**CUADRO DE AYUDA**\nComandos `/error`.\n\n'+report+meaning)
        .setColor(0xfee75c)
      await interaction.update({embeds: [embed], components:[lista], ephemeral: true}).catch(()=>{return})
    } catch { return }
  }
}