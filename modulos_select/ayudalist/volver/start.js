const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    const lista = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId('ayudalist')
					.setPlaceholder('Categoría')
					.addOptions([
						{
							label: '/bot',
							value: 'bot',
						},
						{
							label: '/código',
							value: 'codigo',
						},
						{
							label: '/econ',
							value: 'econ',
						},
						{
							label: '/error',
							value: 'error',
						},
						{
							label: '/gif',
							value: 'gif',
						},
						{
							label: '/miscelánico',
							value: 'miscelanico',
						},
						{
							label: '/server',
							value: 'server',
						},
						{
							label: '/staff',
							value: 'staff',
						},
            {
							label: '/usuario',
							value: 'usuario',
						},
					]),
			);
    var emoji = ""
    var titulo = "**CUADRO DE AYUDA**"
    var desc = "`9` categorías y más de `70` comandos disponibles"
    var bot = "`/bot` **::** Información y estado del bot"
    var codigo = "`/código` **::** Ejemplos y librerías de código"
    var econ = "`/econ` **::** Economía del servidor"
    var error = "`/error` **::** Descripción y reporte de errores"
    var gif = "`/gif` **::** Acciones y reacciones con gifs"
    var miscelanico = "`/miscelánico` **::** Miscelánico"
    var server = "`/server` **::** Ajustes e información del servidor"
    var staff = "`/staff` **::** Comandos de **staff**"
    var usuario = "`/usuario` **::** Comandos de usuarios"
    var embed = new Discord.MessageEmbed()
      .setDescription(emoji+titulo+'\n'+desc+'\n\n**» Categorías**\n'+bot+'\n'+codigo+'\n'+econ+'\n'+error+'\n'+gif+'\n'+miscelanico+'\n'+server+'\n'+staff+'\n'+usuario)
      .setColor(0xfee75c)
    await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
  }
}