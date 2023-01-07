const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
  const error = interaction.options.getString('descripción')
    if(!error){
      var embed = new Discord.MessageEmbed()
        .setDescription('*ERROR 01**\nNo tengo ni idea de cómo, pero has usado un comando que no está permitido')
        .setFooter('Para ver la definición concreta del error, use el comando /error')
        .setColor(0xed4245)
      await interaction.reply({embeds: [embed], ephemeral: true})
    } else {
      const componente = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId(`proces_${interaction.member.id}`)
          .setLabel('En proceso')
          .setStyle('PRIMARY'),
  			new Discord.MessageButton()
  			  .setCustomId(`solucionado_${interaction.member.id}`)
  				.setLabel('Solucionado')
  				.setStyle('SUCCESS'),
        new Discord.MessageButton()
          .setCustomId(`noe_${interaction.member.id}`)
          .setLabel('No es un error')
          .setStyle('DANGER'),
  		);
      if (!usuarios.has(`${interaction.member.id}.temporizadores.errorreportado`)){
        usuarios.establecer(`${interaction.member.id}.temporizadores.errorreportado`, 0)
      }
      var tempo = await usuarios.obtener(`${interaction.member.id}.temporizadores.errorreportado`)
      if (tempo<Date.now()) {
        var embed = new Discord.MessageEmbed()
          .setTitle('ERROR REPORTADO')
          .addField('Usuario:', `<@!${interaction.member.id}>\n${interaction.user.username}#${interaction.user.discriminator}\n${interaction.member.id}`, true)
          .addField('Servidor:', `${interaction.guild.name}\n${interaction.guild.id}`, true)
          .addField('Error reportado:', `\`\`\`\n${error}\n\`\`\``)
          .setTimestamp()
        client.channels.resolve(`908444648371028040`).send({content: `<@!643575943289634836>`, components: [componente], embeds: [embed]})
        var embed = new Discord.MessageEmbed()
          .setDescription('El error ha sido reportado con éxito')
          .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], ephemeral: true})
        usuarios.establecer(`${interaction.member.id}.temporizadores.errorreportado`, Math.floor(Date.now()+60000))
      } else {
        var embed = new Discord.MessageEmbed()
          .setDescription("Lamentamos las molestias pero con motivo de evitar SPAM hemos restringido el número de errores que se pueden reportar a `1 por minuto`")
          .setColor(0xed4245)
        await interaction.reply({embeds: [embed], ephemeral: true})
      }
    }
  }
}