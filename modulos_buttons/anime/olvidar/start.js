const Discord = require("discord.js")
const megadb = require("megadb")
const db = new megadb.crearDB("base")
const memo = new megadb.crearDB("lista")

module.exports = {
  run: async(client, interaction) => {
    if (!db.has(`registro.${interaction.member.id}.animes`)){
      db.establecer(`registro.${interaction.member.id}.animes`, [])
    }
    var anime = await memo.obtener(`${interaction.member.id}.select`)
    db.extract(`registro.${interaction.member.id}.animes`, anime)
    memo.establecer(`${interaction.member.id}.seleccionado`, "no")
  }
}