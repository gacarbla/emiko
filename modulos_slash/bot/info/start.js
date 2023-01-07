const Discord = require('discord.js')
const package = require('../../../package.json')
var discordjs = package.dependencies['discord.js']
var megadb = package.dependencies.megadb
var moment = package.dependencies.moment
var request = package.dependencies.request
var mal_scraper = package.dependencies['mal-scraper']

// Función que obtendrá los datos de la memoria
const OS = require('os')
const maxMemory = OS.totalmem();
function getMemoryUsage() {
  const free = OS.freemem();
  return {
    max: memory(maxMemory),
    used: memory(free),
    free: memory(maxMemory - free),
    usedByProcess: memory(process.memoryUsage().rss)
  }
}

// Función que transformará los bytes a gigas o megas para ajustarse
function memory(bytes = 0) {
  const gigaBytes = bytes / 1024 ** 3;
  if(gigaBytes > 1) {
    return `${gigaBytes.toFixed(1)} GB`;
  }
  const megaBytes = bytes / 1024 ** 2;
  if(megaBytes < 10) return `${megaBytes.toFixed(2)} MB`;  
  if(megaBytes < 100) return `${megaBytes.toFixed(1)} MB`; 
    return `${Math.floor(megaBytes)} MB`;
}

module.exports = {
  run: async (client, interaction) => {
    try {

      // Establece el almacenamiento consumido
      let memoria = getMemoryUsage();

      // Establece un nuevo embed
      var embed = new Discord.MessageEmbed()
        .setTitle(`INFORMACIÓN DE ${client.user.username.toUpperCase()}`)
        .addField('Nombre:', `${client.user.username}`, true)
        .addField('ID:', `${client.user.id}`, true)
        .addField('En el servidor:', `<@!${client.user.id}>`, true)
        .addField("Dueño:", `*Este servidor*`, true)
        .addField('RAM:', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
        .addField('Programado en:', `JavaScript`, true)
        .addField('NPMs:', `Discord.js (${discordjs.slice(1)})\nMegaDB (${megadb.slice(1)})\nMoment (${moment.slice(1)})\nRequest (${request.slice(1)})\nMal-Scraper (${mal_scraper.slice(1)})`)
        .setColor(0x5865f2)

      // Intenta enviar el embed y si no es capaz envía error 05
      await interaction.reply({ embeds: [embed], ephemeral: true }).catch((e)=>{
        require("../../../modulos_error/start").interact(client, interaction, "05", "si",  e, "reply");
      })
    } catch (e) {

      // Envía un mensaje de error
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");

    }
  }
}