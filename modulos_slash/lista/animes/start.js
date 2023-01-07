const Discord = require("discord.js")
const megadb = require("megadb")
const db = new megadb.crearDB("base")
const memo = new megadb.crearDB("lista")

module.exports = {
  run: async (client, interaction) => {
    var animes = []
    var num = 0
    if (memo.tiene(interaction.member.id)){
      memo.eliminar(interaction.member.id)
    }
    var animes = await db.obtener(`animes.lista.letra.A`)
    if(animes.length>1){
      var animes = animes.sort()
    }
    memo.establecer(interaction.member.id, {pag: `${"A".charCodeAt()}`, num: -1})
    try {
      const boton = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('anime_nada')
            .setLabel(' ')
            .setDisabled(true)
            .setStyle('SECONDARY'),
          new Discord.MessageButton()
            .setCustomId('anime_letra_-1')
            .setLabel('<')
            .setDisabled(true)
            .setStyle('PRIMARY'),
          new Discord.MessageButton()
            .setCustomId('anime_letra_1')
            .setLabel('>')
            .setDisabled(false)
            .setStyle('PRIMARY'),
        )
      var num = await memo.obtener(`${interaction.member.id}.num`)
      var i = 0
      var animes_db = []
      if (db.has(`registro.${interaction.member.id}.animes`)){
        animes_db = await db.obtener(`registro.${interaction.member.id}.animes`)
      }
      lista_array = []
      for (i=0;i<animes.length;i++){
        if (i==num) {
        } else {
          if (animes_db.includes(animes[i])){
            lista_array.push({label: animes[i],value: `${i}`, description: "En tu lista"})
          } else {
            lista_array.push({label: animes[i],value: `${i}`})
          }
        }
      }
      const lista = new Discord.MessageActionRow()
			  .addComponents(
				  new Discord.MessageSelectMenu()
					  .setCustomId('anime')
					  .setPlaceholder('Animes por A')
					  .addOptions(lista_array)
					  .setDisabled(false),
			  );
      await interaction.reply({embeds: [], content: "** **", ephemeral: true, components: [lista, boton]})
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}