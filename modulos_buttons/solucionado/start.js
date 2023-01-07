const Discord = require("discord.js")

module.exports = {
  run: async (client, interaction) => {
    
    // Inicia "try"
    try {

      // Actualiza el mensaje y lo deja sin componentes
      await interaction.update({ components: [] });

      // Establece el autor como el ID del botón desplazado 12
      var autor = interaction.customId.slice(12)

      // Establece un nuevo embed
      var embed = new Discord.MessageEmbed()
        .setDescription("El error que ha usted reportado se ha solucionado.\nMuchas gracias por su ayuda.")
        .setFooter(`Mensaje enviado por ${interaction.user.username}#${interaction.user.discriminator}`)
        .setColor(0x57f287)

      // Envía el nuevo mensaje al autor del reporte de error
      client.users.resolve(autor).send({embeds:[embed]}).catch(()=>{return})

      // Establece el embed
      var embed = new Discord.MessageEmbed()
        .setDescription("Mensaje enviado")
        .setColor(0x5865f2)

      // Responde a la acción con el embed que se ha especificado
      await interaction.followUp({embeds: [embed], ephemeral: true})
    } catch (e) {
      // Envía un mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}