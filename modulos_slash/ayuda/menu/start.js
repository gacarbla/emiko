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
							label: 'babse',
							value: 'base',
						},
					])
					.setDisabled(true),
			);
    var texto = [
			"CUADRO DE AYUDA",
			"",
			"Lamentablemente aún estamos trabajando en esto con lo que el uso de este comando no está permitido"
		]
    var embed = new Discord.MessageEmbed()
      .setDescription(texto.join("\n"))
      .setColor(0xfee75c)
    await interaction.reply({embeds: [embed], components:[lista], ephemeral: true})
  }
}