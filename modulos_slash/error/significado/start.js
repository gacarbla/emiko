const Discord = require('discord.js');
const megadb = require("megadb");
const E = new megadb.crearDB("errores");

module.exports = {
  run: async (client, interaction) => {
    try {

      // Establece el número de error que se intenta obtener
      const erro = interaction.options.getInteger('código');
      
      // Lo convierte a texto
      let error = erro.toString();
      
      // Si el error establecido es menor que 10, añade un "0" delante
      if (erro<10) { error = `0${erro}`; }

      // Si el error es menor que 0 envía error 24
      if (erro<0){
        require("../../../modulos_error/start").interact(client, interaction, "24", "no",  "", "reply");

      // Si el error es mayor que 999 envía error 23
      } else if (erro>999){
        require("../../../modulos_error/start").interact(client, interaction, "23", "no",  "", "reply");

      // Si la base de datos de errores no posee el error indicado envía error 33
      } else if (!E.has(`${error}`)) {
        require("../../../modulos_error/start").interact(client, interaction, "33", "no",  "", "reply", `Este código de error no existe.\nPor el momento no tenemos ningún error asociado al código ${erro}`);
      
      // Si cumple todos los requisitos
      } else {

        // Establece el título del error
        var error_title = await E.obtener(`${error}.title`);

        // Establece la descripción del error
        var error_description = await E.obtener(`${error}.description`);

        // Establece un nuevo embed
        var embed = new Discord.MessageEmbed()
          .setDescription(`**Error ${error}:**\n\n**Título:**\n${error_title}\n\n**Descripción:**\n${error_description}`)
          .setColor(0x5865f2);

        // Intenta enviar el embed, pero si no puede envía error 05
        await interaction.reply({embeds: [embed], ephemeral: true }).catch((e)=>{
          require("../../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
        });
      }
    } catch (e) {

      // Envía un mensaje de eror
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    
    }
  }
}