const Discord = require("discord.js")
const megadb = require("megadb")
const db = new megadb.crearDB("base")
const memo = new megadb.crearDB("lista")

module.exports = {
  run: async (client, interaction) => {
    try {
      let permiso = interaction.member.permissions.has("ADMINISTRATOR")
      if (permiso){
        const name = interaction.options.getString('nombre').toUpperCase()
        var categories = interaction.options.getString('categorías')
        const sinopsis = interaction.options.getString('sinopsis')
        var url = interaction.options.getString('foto-url')
        var url_array = []
        var categories_array = []
        if (url) {url_array = url.split(/ +/g)}
        if (categories) {
          categories_array = categories.toUpperCase().split(/,+/g)
          var i = 0
          for (i=0;i<categories_array.length;i++) {
            if (categories_array[i].startsWith(" ")){
              categories_array[i] = categories_array[i].slice(1)
              i--
            }
          }
        }
        if (!url||((url.startsWith("https://")||url.startsWith("http://"))&&!url_array[1])){
          var embed = new Discord.MessageEmbed()
            .setTitle(`${name.toUpperCase()}`)
            .setDescription(`${categories_array.length>0?`__Categorías:__\n\`${categories_array.join("` \| `")}\`\n\n`:""}${sinopsis?`__sinopsis:__\n${sinopsis}`:""}`)
            .setImage(url)
            .setColor(0x5865f2)
          await interaction.reply({embeds: [embed], ephemeral: true})
          if(name.charAt(0)=="ñ"||name.charAt(0)=="Ñ") {name.charAt(0) = "N"}
          if (!db.has(`animes.lista.letra.${name.charAt(0)}`)){
            db.establecer(`animes.lista.letra.${name.charAt(0)}`, [])
          }
          var lista = await db.obtener(`animes.lista.letra.${name.charAt(0)}`)
          if (!lista.includes(`${name.toUpperCase()}`)) {
            db.push(`animes.lista.letra.${name.charAt(0)}`, name.toUpperCase())
          }
          if (url) { db.establecer(`animes.info.${name.toUpperCase()}.portada`, url) }
          if (categories) { db.establecer(`animes.info.${name.toUpperCase()}.categories`, categories_array) }
          if (sinopsis) { db.establecer(`animes.info.${name.toUpperCase()}.sinopsis`, sinopsis) }
        } else {
          var embed = new Discord.MessageEmbed()
            .setDescription("La url de la imágen especificada no es válida.")
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true})
        }
      } else {
        var embed = new Discord.MessageEmbed()
          .setDescription("No posees los permisos necesarios para usar este comando.")
          .setColor(0xed4245)
        await interaction.reply({embeds: [embed], ephemeral: true})
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}