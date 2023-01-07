const Discord = require('discord.js')

module.exports = {
  run: async (client, message) => {
    if(!message.guild){return}
    else if(!message.content){return}
    else if(message.author.bot){return}
    else {
      if (!client.application?.owner) await client.application?.fetch();
      if (message.channel.id === '908445010163298355' && message.author.id === "643575943289634836") {
        const data = [
        { // Bot
          name: 'bot',
          description: 'Todos los comandos referentes al bot',
          options: [
            { // Ping
              name: 'ping',
              description: 'Muestra el ping de la API de Discord',
              type: 'SUB_COMMAND'
            },
            { // Versión
              name: 'versión',
              description: `Muestra la versión de ${client.user.username}`,
              type: 'SUB_COMMAND'
            },
            { // Info
              name: 'info',
              description: 'Muestra la información del bot',
              type: 'SUB_COMMAND'
            },
          ]
        },
        { // Error
          name: 'error',
          description: `¿Algún error? Este es tu comando`,
          options: [
            { // Significado
              name: 'significado',
              description: `Averigue lo que significa esos códigos de error que ${client.user.user} te dice a veces`,
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'código',
                  description: `Inserte el código de error (Min. 1, Máx. 999)`,
                  type: 'INTEGER',
                  min_value: 0,
                  max_value: 999,
                  required: true
                }
              ]
            },
            { // Reportar
              name: 'reportar',
              description: 'Reporta un error que hayas visto',
              type: 'SUB_COMMAND',
              options: [
                {
                  name: 'descripción',
                  description: 'Describe el error',
                  type: 'STRING',
                  required: true
                }
              ]
            }
          ]
        },
        { // Ayuda
          name: 'ayuda',
          description: '¿Necesitas una lista completa de los comandos?',
          options: [
            {
              name: 'módulo',
              description: 'Si quieres, obtén los comandos de un módulo específico',
              required: false,
              type: 'STRING',
              choices: [
                {
                  name: 'Errores y fallos [/error]',
                  value: 'error'
                },
                {
                  name: 'Información y detalles del bot [/bot]',
                  value: 'bot'
                },
              ]
            }
          ]
        },
        { // Mis animes
          name: "mis",
          description: "a",
          options: [
            {
              name: "animes",
              description: "Obtén una lista de los animes que has visto",
              type: "SUB_COMMAND"
            }
          ]
        },
        { // Nuevo anime
          name: "nuevo",
          description: "a",
          options: [
            {
              name: "anime",
              description: "PERMISOS NECESARIOS: ADMINISTRADOR",
              type: "SUB_COMMAND",
              options: [
                {
                  name: "nombre",
                  description: "Nombre del anime",
                  type: "STRING",
                  required: true
                },
                {
                  name: "categorías",
                  description: "Categorías separadas por comas",
                  type: "STRING",
                  required: true
                },
                {
                  name: "sinopsis",
                  description: "Resúmen lo más breve posible del anime",
                  type: "STRING",
                  required: true
                },
                {
                  name: "foto-url",
                  description: "Portada del anime para mostrar.",
                  type: "STRING",
                  required: false
                }
              ]
            }
          ]
        },
        { // Eliminar anime
          name: "eliminar",
          description: "a",
          options: [
            {
              name: "anime",
              description: "PERMISOS NECESARIOS: Administrador",
              type: "SUB_COMMAND",
              options: [
                {
                  name: "nombre",
                  description: "Nombre del animea eliminar",
                  type: "STRING",
                  required: true
                }
              ]
            },
          ]
        },
        { // Lista animes
          name: "lista",
          description: "a",
          options: [
            {
              name: "animes",
              description: "Obtén la lista de los animes que puedes escoger",
              type: "SUB_COMMAND",
            }
          ]
        },
        ]
          try {
            try {
              var command = await client.application?.commands.set(data);
              console.log(command)
            } catch (e) { console.log("Comandos generales: "+e) }
            message.delete()
            var embed = new Discord.MessageEmbed()
              .setDescription('Los slash commands han sido recargados')
              .setTimestamp()
              .setColor(0x5865f2)
            message.channel.send({embeds: [embed]})
          } catch (e){
            require("./modulos_error/start").interact(client, message, "109", "no",  e, "reply")
          }
        } else if (message.channel.id === '908445010163298355') {
        message.delete()
        var embed = new Discord.MessageEmbed()
          .setDescription(`**Error 41**\nSólo el duño del bot puede usar este canal.`)
          .setFooter('Para ver la definición concreta del error, use el comando /error')
          .setColor(0xed4245)
        message.channel.send({embeds: [embed]}).then(m=>{
          try{ setTimeout(()=>{m.delete(), 5000}) } catch { return }
        })
      }
    }
  }
}