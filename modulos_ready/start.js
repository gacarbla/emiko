const wait = require('util').promisify(setTimeout);
const config = require('../ajustes.json')
var version = config.version;

module.exports = {
  run: async (client, process, data) => {
    try {
      try {
        var nombre = `\n\n\n\n\n\n\n\n\nIniciado como: ${data.user.username}#${data.user.discriminator}`
        var nombreusuario = `\nUsername: ${data.user.username}`
        var discriminador = `\nDiscriminator: ${data.user.discriminator}`
        var ram = `\nRAM media: ${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)} MB`
        var separador = `\n----------------------------------------------------\n`
        var dia = `${client.readyAt.getUTCDate()}/${Math.floor((client.readyAt.getMonth())+1)}/${Math.floor(client.readyAt.getYear()+1900)}`
        var encendido = `Encendido: ${dia} --- ${client.readyAt.getHours()}:${client.readyAt.getMinutes()}:${client.readyAt.getMilliseconds()}`
        console.log(`${nombre}${nombreusuario}${discriminador}\nID: ${data.user.id}${ram}${separador}Sistema iniciado\nVersión: ${version}\n${encendido}\nCreador: gacarbla#9399${separador}`)
      } catch { return }
    } catch (e) { 
      async (e) => {
        await wait(5000);
        console.log(`Error en el archivo de arranque\n\n${e}`)
        this.run(client, process) 
      }
    }
  }
}