const Discord = require("discord.js")
const megadb = require("megadb")
const db = new megadb.crearDB("base")
const memo = new megadb.crearDB("lista")

module.exports = {
  run: async (client, interaction) => {
    const buttonname = interaction.customId.trim().split(/_+/g);
    var subbutton = buttonname[2]
    var num = await memo.obtener(`${interaction.member.id}.num`)
    var letra = await memo.obtener(`${interaction.member.id}.pag`)
    var animes = await db.obtener(`animes.lista.letra.${String.fromCharCode(letra)}`)
    var i = 0
    for(i=0;i<100;i++){
      if (db.has(`animes.lista.letra.${String.fromCharCode(letra)}`)){
        if (animes.length<1){
          memo.sumar(`${interaction.member.id}.pag`, subbutton)
          letra = await memo.obtener(`${interaction.member.id}.pag`)
          animes = await db.obtener(`animes.lista.letra.${String.fromCharCode(letra)}`)
        } else {
          break;
        }
      } else {
        memo.sumar(`${interaction.member.id}.pag`, subbutton)
        letra = await memo.obtener(`${interaction.member.id}.pag`)
        animes = await db.obtener(`animes.lista.letra.${String.fromCharCode(letra)}`)
      }
    }
    if(animes.length>1){
      var animes = animes.sort()
    }
    try {
      var boton
      if (memo.has(`${interaction.member.id}.select`)){
        var estado = await memo.obtener(`${interaction.member.id}.seleccionado`)
        if (estado=="si") {
          boton = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('anime_olvidar')
                .setLabel('Olvidar')
                .setDisabled(false)
                .setStyle('DANGER'),
              new Discord.MessageButton()
                .setCustomId('anime_letra_-1')
                .setLabel('<')
                .setDisabled(letra>"A".charCodeAt()?false:true)
                .setStyle('PRIMARY'),
              new Discord.MessageButton()
                .setCustomId('anime_letra_1')
                .setLabel('>')
                .setDisabled(letra<"Z".charCodeAt()?false:true)
                .setStyle('PRIMARY'),
            )
        } else {
          boton = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
                .setCustomId('anime_añadir')
                .setLabel('Añadir')
                .setDisabled(false)
                .setStyle('SUCCESS'),
              new Discord.MessageButton()
                .setCustomId('anime_letra_-1')
                .setLabel('<')
                .setDisabled(letra>"A".charCodeAt()?false:true)
                .setStyle('PRIMARY'),
              new Discord.MessageButton()
                .setCustomId('anime_letra_1')
                .setLabel('>')
                .setDisabled(letra<"Z".charCodeAt()?false:true)
                .setStyle('PRIMARY'),
            )
        }
      } else {
        boton = new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageButton()
              .setCustomId('anime_nada')
              .setLabel(' ')
              .setDisabled(true)
              .setStyle('SECONDARY'),
            new Discord.MessageButton()
              .setCustomId('anime_letra_-1')
              .setLabel('<')
              .setDisabled(letra>"A".charCodeAt()?false:true)
              .setStyle('PRIMARY'),
            new Discord.MessageButton()
              .setCustomId('anime_letra_1')
              .setLabel('>')
              .setDisabled(letra<"Z".charCodeAt()?false:true)
              .setStyle('PRIMARY'),
          )
      }
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
      var lista
      if (lista_array.length<1){
        lista = new Discord.MessageActionRow()
			    .addComponents(
				    new Discord.MessageSelectMenu()
					    .setCustomId('anime')
					    .setPlaceholder(`Animes por ${String.fromCharCode(letra)}`)
					    .addOptions({label: "a", value: "a"})
					    .setDisabled(true),
			    );
      } else {
        lista = new Discord.MessageActionRow()
			    .addComponents(
				    new Discord.MessageSelectMenu()
					    .setCustomId('anime')
					    .setPlaceholder(`Animes por ${String.fromCharCode(letra)}`)
					    .addOptions(lista_array)
					    .setDisabled(false),
			    );
      }
      await interaction.update({components: [lista, boton]})
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}