const Discord = require("discord.js")

module.exports = {
  run: async (client, interaction) => {
    try {
      var módulo = await interaction.values[0]
      require(`./${módulo}/start`).run(client, interaction)
    } catch (e) {
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}