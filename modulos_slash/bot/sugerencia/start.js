const Discord = require('discord.js')
const megadb = require('megadb')
const registro_sugerencias = new megadb.crearDB('sugerencias')

module.exports = {
  run: async (client, interaction) => {
    const sugerencia = interaction.options.getString('texto')
        if(!registro_sugerencias.has(`${interaction.member.id}`)){
            registro_sugerencias.establecer(interaction.member.id, {numero: '1', temporizador: Math.floor(Date.now()+60000), sugerencias: [sugerencia]})
            var embed = new Discord.MessageEmbed()
                .setTitle('SUGERENCIA RECIVIDA')
                .addField('Usuario:', `<@!${interaction.member.id}>\n${interaction.user.username}#${interaction.user.discriminator}\n${interaction.member.id}`, true)
                .addField('Sugerencia:', `\`\`\`\n${sugerencia}\n\`\`\``)
                .setTimestamp()
            client.channels.resolve(`908449203750076447`).send({content: `@everyone`, embeds: [embed]})
            var embed = new Discord.MessageEmbed()
                .setDescription('La sugerencia ha sido enviada con éxito')
                .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true})
        } else {
            var temporizador = await registro_sugerencias.obtener(`${interaction.member.id}.temporizador`)
            if(temporizador<Date.now()){
                registro_sugerencias.sumar(`${interaction.member.id}.numero`, 1)
                registro_sugerencias.push(`${interaction.member.id}.sugerencias`, sugerencia)
                registro_sugerencias.restar(`${interaction.member.id}.temporizador`, temporizador)
                registro_sugerencias.sumar(`${interaction.member.id}.temporizador`, Math.floor(Date.now()+60000))
                var embed = new Discord.MessageEmbed()
                    .setTitle('SUGERENCIA RECIBIDA')
                    .addField('Usuario:', `<@!${interaction.member.id}>\n${interaction.user.username}#${interaction.user.discriminator}\n${interaction.member.id}`, true)
                    .addField('Sugerencia:', `\`\`\`\n${sugerencia}\n\`\`\``)
                    .setTimestamp()
                client.channels.resolve(`908449203750076447`).send({content: `@everyone`, embeds: [embed]})
                var embed = new Discord.MessageEmbed()
                    .setDescription('La sugerencia ha sido enviada con éxito')
                    .setColor(0x5865f2)
                await interaction.reply({embeds: [embed], ephemeral: true})
            } else {
                var embed = new Discord.MessageEmbed()
                    .setDescription('**ERROR**\nCon motivo de evitar spam hemos decidido que sólo se pueda enviar una sugerencia por minuto.\nLamentamos las molestias.')
                    .setColor(0xed4245)
                await interaction.reply({embeds: [embed], ephemeral: true})
            }
        }
  }
}