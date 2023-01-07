const Discord = require("discord.js");
const megadb = require("megadb");
const E = new megadb.crearDB("errores");

module.exports = {
  interact: async (client, msg, error, notificar, e, respuesta ,texto) => {
    
    // Título
    let titulo = "";
    try {
      titulo = await E.obtener(`${error}.title`)
    } catch {
      return
    }

    // Descripción
    let descripción = "";
    try {
      descripción = await E.obtener(`${error}.description`)
    } catch {
      return
    }

    // Embed que devolverá al usuario
    var embed = new Discord.MessageEmbed()
      .setTitle(`Error ${error}`)
      .setDescription(`${titulo.toUpperCase()}\n\n__Descripción:__\n${texto?texto:descripción}`)
      .setColor(0xed4245)
    
    // Tipo de respuesta que se debe emplear
    let tipo = "";
    if (msg.isCommand()) { tipo = 1 }
    else if (msg.isButton()) { tipo = 2 }
    else if (msg.isSelectMenu()) { tipo = 3 }
    else {tipo = 0}

    //
    if (tipo>0){

      // Respuesta reply
      if (respuesta=="reply"){

        // Intenta enviar de todas las formas posibles y sea como sea. Si no puede return
        await msg.reply({embeds: [embed], ephemeral: true}).catch( async()=>{
          await msg.followUp({embeds: [embed], ephemeral: true}).catch( async()=>{
            embed = embed.setFooter("Este mensaje se autodestruirá en 30 segundos")
            msg.channel.send({content: `<@!${msg.member.id}>`, embeds: [embed]}).then(m=>{
              try {
                setTimeout(() => m.delete(), 30000).catch((e)=>{
                  return console.log(e)
                })
              } catch {
                return 
              }
            }).catch(()=>{
              return;
            })
          })
        })

      // Respuesta por texto normal
      } else if (respuesta=="text"){

        // Añadimos al embed un pié
        var embed = embed.setFooter("Este mensaje se autodestruirá en 30 segundos")

        // Envía el mensaje y en 30 segundos lo borra si es que no ha sido borrado ya
        msg.channel.send({reply: { messageReference: msg.id}, embeds: [embed]}).then(m=>{
          try {
            setTimeout(() => m.delete(), 30000).catch((e)=>{
              return console.log(e)
            })
          } catch {
            return;
          }
        })

      // Si no es ninguna de las anteriores opciones responde con un pley simple
      } else {
        await msg.reply({embeds: [embed], ephemeral: true}).catch( async()=>{
          await msg.followUp({embeds: [embed], ephemeral: true}).catch( async()=>{
            var embed = embed.setFooter("Este mensaje se autodestruirá en 30 segundos")
            msg.channel.send({content: `<@!${msg.member.id}>`, embeds: [embed]}).then(m=>{
              try {setTimeout(() => m.delete(), 30000).catch((e)=>{
                return console.log(e)}
              )} catch {
                return;
              }
            }).catch(()=>{
              return;
            })
          })
        })
      }

    //
    } else if (tipo==0) {

      // Respuesta reply
      if (respuesta=="reply") {

        // Añadimos al embed un pié
        var embed = embed.setFooter("Este mensaje se autodestruirá en 30 segundos")

        // Enviamos el mensaje respondiendo al mensaje enviado por el usuario y en 30 segundos lo elimina
        msg.channel.send({reply: { messageReference: msg.id}, embeds: [embed]}).then(m=>{
          try {
            setTimeout(() => m.delete(), 30000).catch((e)=>{
              return console.log(e)
            })
          } catch {
            return;
          }
        }).catch(()=>{
          return;
        })

      // Repsuesta por texto
      } else if (respuesta=="text") {

        // Añadimos al embed un pié
        var embed = embed.setFooter("Este mensaje se autodestruirá en 30 segundos")

        // Envía el mensaje mencionando el usuario y a los 30 segundos lo borra
        msg.channel.send({content: `<@!${msg.author.id}>`, embeds: [embed]}).then(m=>{
          try {
            setTimeout(() => m.delete(), 30000).catch((e)=>{
              return console.log(e)
            })
          } catch {
            return;
          }
        }).catch(()=>{
          return;
        })

      // Si no es ninguna de las anteriores formas ya especificadas usa un reply simple
      } else {
        var embed = embed.setFooter("Este mensaje se autodestruirá en 30 segundos")
        msg.channel.send({reply: { messageReference: msg.id}, embeds: [embed]}).then(m=>{
          try {
            setTimeout(() => m.delete(), 30000).catch((e)=>{
              return console.log(e)
            })
          } catch {
            return;
          }
        }).catch(()=>{
            return;
        })
      }
    }

    // Si se ha declarado que se debe notificar y se ha declarado el error
    if ( ( notificar == "si" || notificar == "true" || notificar == true || notificar ) && e ) {
      let error_msg = ""
      let usuario = ""
      let servidor = ""
      if (tipo==1) {
        try {
          if (msg.options.getSubcommand()) {
            try {
              error_msg = `COMMAND: ${msg.commandName} ${msg.options.getSubcommand()}`
            } catch {
              error_msg='`ERROR AL OBTENER EL SLASH COMMAND`'
            }
          }
        } catch {
          error_msg='`ERROR AL OBTENER EL SLASH COMMAND`'
        }
        usuario = `<@!${msg.member.id}>\n${msg.user.username}#${msg.user.discriminator}\n${msg.member.id}`
        servidor = `${msg.guild.name}\n${msg.guild.id}`
      } else if (tipo==2) {
        try {
          if(msg.customId) {
            try {
              error_msg = `ID (BTN): ${msg.customId}`
            } catch {
              error_msg = '`ERROR AL OBTENER EL BOTÓN`'
            }
          }
        } catch {
          error_msg = '`ERROR AL OBTENER EL BOTÓN`'
        }
        usuario = `<@!${msg.member.id}>\n${msg.user.username}#${msg.user.discriminator}\n${msg.member.id}`
        servidor = `${msg.guild.name}\n${msg.guild.id}`
      } else if (tipo==3) {
        try {
          if (msg.customId) {
            try {
              error_msg = `ID (SM): ${msg.customId}`
            } catch {
              error_msg = '`ERROR AL OBTENER EL MENÚ`'
            }
          }
        } catch {
          error_msg = '`ERROR AL OBTENER EL MENÚ`'
        }
        usuario = `<@!${msg.member.id}>\n${msg.user.username}#${msg.user.discriminator}\n${msg.member.id}`
        servidor = `${msg.guild.name}\n${msg.guild.id}`
      } else if (tipo==0) {
        try {
          if (msg.content) {
            try {
              error_msg = `ID (MSG): ${msg.content}`
            } catch {
              error_msg = '`ERROR AL OBTENER EL MENSAJE`'
            }
          }
        } catch {
          error_msg = '`ERROR AL OBTENER EL MENSAJE`'
        }
        usuario = `<@!${msg.author.id}>\n${msg.author.username}#${msg.author.discriminator}\n${msg.author.id}`
        servidor = `${msg.guild.name}\n${msg.guild.id}`
      } try {
        var embed = new Discord.MessageEmbed().setTitle(`ERROR AUTO-REPORTADO`).addField(`Usuario:`, `${usuario}`, true).addField('Servidor:', `${servidor}`, true).addField(`Error reportado:`, `\`${error_msg}\`\n\`\`\`\n${e?`Error ${e}`:error}\n\`\`\``).setColor(0xed4245)
        client.channels.resolve(`908444648371028040`).send({content: `<@!643575943289634836>`, embeds: [embed]}).catch((e)=>{console.log(e)})
      } catch {
        return;
      }
    }
  }
}