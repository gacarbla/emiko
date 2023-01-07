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
                label: '/bot info',
  						  value: 'bot_info',
              },{
  						  label: '/bot invitar',
  						  value: 'bot_invitar',
              },{
  							label: '/bot ping',
  							value: 'bot_ping',
  						},{
  							label: '/bot sugerencia',
  							value: 'bot_sugerencia',
  						},{
  							label: '/bot topgg',
  							value: 'bot_topgg',
  						},{
  							label: '/bot versión',
  							value: 'bot_versión',
  						},
  					]),
  			);
      var titulo = "**CUADRO DE AYUDA**"
      var info = "\`/bot info\` **::** Información\n"
      var invitar = "\`/bot invitar\` **::** Invitación del bot\n"
      var ping = "\`/bot ping\` **::** Ping API Discord\n"
      var sugerencia = "\`/bot sugerencia\` **::** Sugerir un cambio\n"
      var topgg = "\`/bot topgg\` **::** [TopGG](https://top.gg)\n"
      var version = "\`/bot version\` **::** Versión del bot\n"
      var embed = new Discord.MessageEmbed()
        .setDescription(`${titulo}\n**Categoría \`/bot\`**\n\n${info}${invitar}${ping}${sugerencia}${topgg}${version}`)
        .setColor(0xfee75c)
      await interaction.update({embeds: [embed], components:[lista], ephemeral: true}).catch(()=>{return})
    } catch { return }
  }
};