const Discord = require("discord.js")

module.exports = {
  run: async (client, interaction) => {
    
    // Inicia el "try"
    try {

      // Establece que el nombre del botón es su ID en un array dividido por barras bajas
      const buttonname = interaction.customId.trim().split(/_+/g);
      var subbutton = buttonname[1]
      require(`./${subbutton}/start`).run(client, interaction)
        require(`./refresh348e0/start`).run(client, interaction)
    } catch (e) {
      // Envía un mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}