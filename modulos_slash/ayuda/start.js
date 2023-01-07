const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    try {
      var módulo = interaction.options.getString('módulo');
      if(!módulo){
        try {
          require("./menu/start").run(client, interaction)
        } catch (e) {
      
          // Enviar mensaje de error
          require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
        
        };
      } else {
        try {
          require(`./${módulo}/start`).run(client, interaction)
        } catch (e) {
      
          // Enviar mensaje de error
          require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
        
        };
      }
    } catch (e) {
      
      // Enviar mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    
    };
  }
}