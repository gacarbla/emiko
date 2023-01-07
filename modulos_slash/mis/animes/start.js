const Discord = require("discord.js")
const megadb = require("megadb")
const db = new megadb.crearDB("base")
const memo = new megadb.crearDB("lista")

module.exports = {
  run: async (client, interaction) => {
    try {
      let animes = []
      if (db.has(`registro.${interaction.member.id}.animes`)){
        var anim = await db.obtener(`registro.${interaction.member.id}.animes`)
        var anima = anim.sort()
        var i = 0
        for (i=0;i<anima.length;i++){
          if (i<60) {
            animes.push(`${Math.floor(i+1)}. \`${anima[i]}\``)
          } else {
            animes.push(`\n\n**NO SE PUEDEN CARGAR MÁS ANIMES**\nEstamos trabajando para mejorar esto`)
            break
          }
        }
      }
      var embed
      if (animes.length<1){
        embed = new Discord.MessageEmbed()
          .setDescription("Parece ser que no has añadido ningún anime a tu lista")
          .setColor(0x5865f2)
      } else {
        embed = new Discord.MessageEmbed()
          .setTitle("TU LISTA DE ANIMES")
          .setDescription(`Animes que has seleccionado de la lista ordenados por orden alfabético:\n${animes.join("\n")}`)
          .setColor(0x5865f2)
      }
      await interaction.reply({embeds: [embed], ephemeral: true})
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}