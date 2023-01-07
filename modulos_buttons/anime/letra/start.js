const Discord = require("discord.js")
const megadb = require("megadb")
const db = new megadb.crearDB("base")
const memo = new megadb.crearDB("lista")

module.exports = {
  run: async(client, interaction) => {
    const buttonname = interaction.customId.trim().split(/_+/g);
    var subbutton = buttonname[2]
    memo.sumar(`${interaction.member.id}.pag`, subbutton)
    memo.establecer(`${interaction.member.id}.num`, -1)
  }
}