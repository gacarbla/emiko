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
                label: '/error significado',
		  				  value: 'error_significado',
              },
		  			]),
		  	);
      var embed = new Discord.MessageEmbed()
        .setDescription('**CUADRO DE AYUDA**\n\n**Comando `/error reportar`**')
        .setColor(0xfee75c)
        .addField('¿Qué hace?', 'Reporta un error a nuestros desarrolladores para que lo solucionen lo antes posible.\nNota: El bot recogerá datos del servidor de forma anónima para poder solucionar el error de forma más eficiente y rápida.')
        .addField('Uso', '`/error reportar <descripción>`')
        .addField('Permisos bot', 'Ver canales\nEnviar mensajes\nInsertar enlaces', true)
        .addField('Permisos usuario', 'Enviar mensajes\nUsar comandos de aplicaciones', true)
      await interaction.update({embeds: [embed], components:[lista], ephemeral: true}).catch(()=>{ return })
    } catch { return }
  }
}