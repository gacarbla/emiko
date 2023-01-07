const Discord = require("discord.js")
const megadb = require('megadb')
const wait = require('util').promisify(setTimeout);
const usuarios_db = new megadb.crearDB('usuarios')
const tabla_precios = new megadb.crearDB('productos')

module.exports = {
  run: async (client, interaction) => {
    //try {
      var módulo = await interaction.values[0]
      var precio = await tabla_precios.obtener(`${módulo}`)
      var dinero = await usuarios_db.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)
      if (dinero<precio){
        var embed = new Discord.MessageEmbed()
          .setDescription("No posees el dinero necesario para realizar esta compra")
          .setColor(0xed4245)
        await interaction.reply({embeds: [embed], ephemeral: true}).catch(async()=>{
          await interaction.followUp({embeds: [embed], ephemeral: true}).catch(async()=>{
            return
          })
        })
      } else {
        usuarios_db.restar(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`, precio)
        if(módulo=="sicario") {
          usuarios_db.restar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 10)
          if (Math.floor(Math.random*3)>1) {
            var embed = new Discord.MessageEmbed()
              .setAuthor('Sicario', 'https://liquipedia.net/commons/images/thumb/f/f0/Incognito_Logo_V3_Black_Border.png/600px-Incognito_Logo_V3_Black_Border.png')
              .setDescription("Paso, estoy ya muy ocupado.\nPero gracias por el dinero.")
              .setColor(0x8b0000)
            await interaction.update({embeds: [embed], ephemeral: true, components: []})
          } else {
            try { usuarios_db.restar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, Math.floor(Math.random()*10)) } catch { return }
            var embed = new Discord.MessageEmbed()
              .setAuthor('Sicario', 'https://liquipedia.net/commons/images/thumb/f/f0/Incognito_Logo_V3_Black_Border.png/600px-Incognito_Logo_V3_Black_Border.png')
              .setDescription("He recibido tu mensaje.\nAcepto el trabajo.")
              .setColor(0x8b0000)
            await interaction.update({embeds: [embed], ephemeral: true, components: []})
            await wait(Math.floor(30000+(Math.random()*120000)))
            try { usuarios_db.restar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, Math.floor(Math.random()*10)) } catch { return }
            var embed = new Discord.MessageEmbed()
              .setAuthor('Policía', 'https://th.bing.com/th/id/OIP.Ng1DMmORJjs1k7X6U8B6DwAAAA?pid=ImgDet&rs=1')
              .setDescription(`¡Se ha producido un crímen!\n\nHoy día <t:${Math.floor(Date.now()/1000)}:D> el departamento de policía de \`${interaction.guild.name}\` ha encontrado sobre las <t:${Math.floor(Date.now()/1000)}:t> el cadáver de un ciudadano sin identificar.\nSe sospecha que es obra del famoso sicario.\nSe ruega a la población extreme las precauciones y salgan lo mínimo posible a la calle`)
              .setColor(0x5865f2)
            interaction.channel.send({embeds: [embed]})
            await wait(Math.floor(30000+(Math.random()*120000)))
            try { usuarios_db.restar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, Math.floor(Math.random()*10)) } catch { return }
            usuarios_db.sumar(`${interaction.member.id}.dinero.${interaction.guild.id}.banco`, Math.floor(Math.random()*40000))
            var embed = new Discord.MessageEmbed()
              .setAuthor('Sicario', 'https://liquipedia.net/commons/images/thumb/f/f0/Incognito_Logo_V3_Black_Border.png/600px-Incognito_Logo_V3_Black_Border.png')
              .setDescription("He terminado el trabajo.\nTe he ingresado las ganancias en la cuenta.")
              .setColor(0x8b0000)
            await interaction.followUp({embeds: [embed], ephemeral: true, components: []})
          }
        } else if (módulo.split(/_+/g)[0]=="multixp") {
          var tempo = módulo.split(/_+/g)[1]
          tempo = Math.floor(parseInt(tempo)*86400000)
          if (usuarios_db.has(`${interaction.member.id}.temporizadores.multixp_${interaction.guild.id}`)){
            var validez = await usuarios_db.obtener(`${interaction.member.id}.temporizadores.multixp_${interaction.guild.id}`)
            if (validez<Date.now()){
              usuarios_db.establecer(`${interaction.member.id}.temporizadores.multixp_${interaction.guild.id}`, Math.floor(tempo+Date.now()))
            } else {
              usuarios_db.sumar(`${interaction.member.id}.temporizadores.multixp_${interaction.guild.id}`, tempo)
            }
          } else {
            usuarios_db.establecer(`${interaction.member.id}.temporizadores.multixp_${interaction.guild.id}`, Math.floor(tempo+Date.now()))
          }
          var validez = await usuarios_db.obtener(`${interaction.member.id}.temporizadores.multixp_${interaction.guild.id}`)
          var embed = new Discord.MessageEmbed()
            .setDescription(`Dispones de un multiplicador de **\`xp\`** hasta que se termine <t:${Math.floor(validez/1000)}:R>`)
            .setColor(0x5865f2)
          await interaction.update({embeds: [embed], ephemeral: true, components: []})
        } else if (módulo.split(/_+/g)[0]=="guardaespaldas") {
          var tempo = módulo.split(/_+/g)[1]
          tempo = Math.floor(parseInt(tempo)*86400000)
          if (usuarios_db.has(`${interaction.member.id}.temporizadores.guardaespaldas_${interaction.guild.id}`)){
            var validez = await usuarios_db.obtener(`${interaction.member.id}.temporizadores.guardaespaldas_${interaction.guild.id}`)
            if (validez<Date.now()){
              usuarios_db.establecer(`${interaction.member.id}.temporizadores.guardaespaldas_${interaction.guild.id}`, Math.floor(tempo+Date.now()))
            } else {
              usuarios_db.sumar(`${interaction.member.id}.temporizadores.guardaespaldas_${interaction.guild.id}`, tempo)
            }
          } else {
            usuarios_db.establecer(`${interaction.member.id}.temporizadores.guardaespaldas_${interaction.guild.id}`, Math.floor(tempo+Date.now()))
          }
          var validez = await usuarios_db.obtener(`${interaction.member.id}.temporizadores.guardaespaldas_${interaction.guild.id}`)
          var embed = new Discord.MessageEmbed()
            .setDescription(`Dispones de un servicio de seguridad privada hasta finalice su contrato <t:${Math.floor(validez/1000)}:R>`)
            .setColor(0x5865f2)
          await interaction.update({embeds: [embed], ephemeral: true, components: []})
        } else {
          usuarios_db.sumar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 0.4)
          if(!usuarios_db.has(`${interaction.member.id}.items.${interaction.guild.id}.${módulo}`)){
            usuarios_db.establecer(`${interaction.member.id}.items.${interaction.guild.id}.${módulo}`, 0)
          }
          usuarios_db.sumar(`${interaction.member.id}.items.${interaction.guild.id}.${módulo}`, 1)
          var msg = interaction.message.content
          if (msg){
            await interaction.update({content: msg+", `"+módulo.toUpperCase()+"`"})
          } else {
            await interaction.update({content: "__**Artículos comprados:**__\n\n`"+módulo.toUpperCase()+"`"})
          }
        }
      }
    //} catch (e) {
    //  require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    //}
  }
}