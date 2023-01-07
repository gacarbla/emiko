// Consta todo lo necesario: Discord
const Discord = require("discord.js")

// Inicia el módulo
module.exports = {

  // Inicia "run"
  run: async (client, interaction) => {
    
    // Inicia el try
    try {

      // Actualiza el mensaje para eliminarle los componentes
      await interaction.update({ components: [] });

      // Establece que el ID del autor es la ID del botón desplazada 4 posiciones
      var autor = interaction.customId.slice(4);

      // Establece un nuevo mensaje embedado
      var embed = new Discord.MessageEmbed()
        .setDescription("El error que ha usted reportado en realidad no se trata de un error.\nPóngase en contacto con el desarollador para más información.")
        .setFooter(`Mensaje enviado por ${interaction.user.username}#${interaction.user.discriminator}`)
        .setColor(0xed4245);

      // Envía al autor del report del error el embed
      client.users.resolve(autor).send({embeds:[embed]}).catch(()=>{return})

      // Establece un nuevo mensaje embedado
      var embed = new Discord.MessageEmbed()
        .setDescription("Mensaje enviado")
        .setColor(0x5865f2);
      
      // Responde a la interacción con el embed
      await interaction.followUp({embeds: [embed], ephemeral: true});
    } catch (e) {
      // Envía un mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}