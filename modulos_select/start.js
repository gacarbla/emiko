const Discord = require("discord.js")

module.exports = {
  run: async (client, interaction) => {
    try {
      const listname = interaction.customId.trim().split(/_+/g);
      require(`./${listname[0]}/start`).run(client, interaction)
    } catch (e) {
      require("../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}