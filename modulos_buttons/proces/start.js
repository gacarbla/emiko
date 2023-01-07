const Discord = require("discord.js")

module.exports = {
  run: async (client, interaction) => {
    try {

      // Establece la ID del autor como la ID del botón desplazada 7 posiciones
      var autor = interaction.customId.slice(7);

      // Establece los botones
      var componente = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId(`solucionado_${autor}`)
          .setLabel('Solucionado')
          .setStyle('SUCCESS'),
        new Discord.MessageButton()
          .setCustomId(`noe_${autor}`)
          .setLabel('No es un error')
          .setStyle('DANGER'),
      );

      // Actualiza la respuesta para que tenga los botones anteriormente establecidos
      await interaction.update({ components: [componente] });

      // Establece un mensaje embedado
      var embed = new Discord.MessageEmbed()
        .setDescription("El error que ha usted reportado se está procesando.\nMuchas gracias por su ayuda.")
        .setFooter(`Mensaje enviado por ${interaction.user.username}#${interaction.user.discriminator}`)
        .setColor(0x5865f2);

      // ENvía al autor del reporte de error el embed
      client.users.resolve(autor).send({embeds:[embed]}).catch(()=>{return})

      // Establece un nuevo embed
      var embed = new Discord.MessageEmbed()
        .setDescription("Mensaje enviado")
        .setColor(0x5865f2);
      
      // Responde a la interacción con el embed
      await interaction.followUp({embeds: [embed], ephemeral: true})
      
    } catch (e) {
      // Envía un mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}