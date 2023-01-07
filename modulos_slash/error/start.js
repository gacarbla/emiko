module.exports = {
    run: async (client, interaction) => {
      try {
        var subcommand = interaction.options.getSubcommand()
        require(`./${subcommand}/start`).run(client, interaction)
      } catch (e) {
        require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
      }
  }
}