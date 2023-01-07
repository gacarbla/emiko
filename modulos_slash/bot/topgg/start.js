const Discord = require('discord.js')

module.exports = {
    run: async (client, interaction) => {
      try {

        // Establecemos un botón con link a la página de topgg del bot
        const row = new Discord.MessageActionRow()
	  		  .addComponents(
		  		  new Discord.MessageButton()
              .setURL("https://top.gg/bot/851215512427823104/")
				  	  .setLabel('Ir a topgg')
					    .setStyle('LINK'),
			    );

        // Establecemos un nuevo embed
        var embed = new Discord.MessageEmbed()
          .setTitle('DORI ESTÁ EN TOP.GG')
          .setURL('https://top.gg/bot/851215512427823104/')
          .setDescription("Dori se encuentra actualmente en la\nlista de bots de [topgg](https://top.gg/), dónde podrás\ninvitarle a tu servidor o votar por él para\nayudarnos.")
          .setThumbnail(client.user.avatarURL())
          .setColor(0x5865f2)

        // Intenta enviar el embed y si no puede envía error 05
        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).catch((e)=>{
          require("../../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
        })
      } catch (e) {
        // Envía un mensaje de error
        require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
      }
    }
}