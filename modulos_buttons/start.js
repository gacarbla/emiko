const Discord = require("discord.js")

module.exports = {
  run: async (client, interaction) => {
    
    // Inicia el "try"
    try {

      // Establece que el nombre del botón es su ID en un array dividido por barras bajas
      const buttonname = interaction.customId.trim().split(/_+/g);

      // Inicia el archivo que se encuentre dentro de la carpeta que posea el nombre del botón
      require(`./${buttonname[0]}/start`).run(client, interaction)
    } catch (e) {
      // Envía un mensaje de error
      require("../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}