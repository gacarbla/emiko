const Discord = require('discord.js'); const config = require('./ajustes.json'); const megadb = require("megadb"); const servidores = new megadb.crearDB("servidores")
const client = new Discord.Client({
  intents: [
  //         GUILDS             //           OTHERS             //
    "GUILDS"                    ,  "DIRECT_MESSAGES"           ,
    "GUILD_MEMBERS"             ,  "DIRECT_MESSAGE_REACTIONS"  ,
    "GUILD_BANS"                ,  "DIRECT_MESSAGE_TYPING"     ,
    "GUILD_EMOJIS_AND_STICKERS" ,
    "GUILD_INTEGRATIONS"        ,
    "GUILD_WEBHOOKS"            ,
    "GUILD_INVITES"             ,
    "GUILD_VOICE_STATES"        ,
    "GUILD_PRESENCES"           ,
    "GUILD_MESSAGES"            ,
    "GUILD_MESSAGE_REACTIONS"   ,
    "GUILD_MESSAGE_TYPING"      ,
  //                            //                              //
  ]
})
try {
  client.on('ready', async (data)=>{ try { require("./modulos_ready/start").run(client, process, data) } catch { return } })
} catch { return }
try {
  client.on('messageCreate', async (message) => {
    if(message.channel.id=="908445010163298355") { require("./comandos").run(client, message) }
  });
} catch { return }
try {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) {return}
    else { try { require("./modulos_slash/start").run(client, interaction)} catch (e) {require("./modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")} }
  });
} catch { return }
try {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;
  	else { try { require("./modulos_buttons/start").run(client, interaction) } catch (e) {require("./modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")} }
  });
} catch { return }
try {
  client.on('interactionCreate', async interaction => {
  	if (!interaction.isSelectMenu()) return;
    else { try { require("./modulos_select/start").run(client, interaction) } catch (e) {require("./modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")} }
  });
} catch { return }
try {
  client.on("ERROR", e => {
  	console.log("\n\n\n");console.log("--------------------------------------------")
    console.log(e);console.log("--------------------------------------------")
  });
} catch { return }
try {
  client.on("GUILD_CREATE", async guild => {
    servidores.establecer(guild.id, {datos: { nombre: guild.name }, mensajes: { hoy: { día: "1/1/2020", numero: 0}}, verify: {}, deshabilitado: { mdl: [], cmd: []}})
  });
} catch { return }
try {
  client.on("threadCreate", async (thread) => { try { if (thread.joinable) await thread.join(); } catch { return } });
} catch { return }
try {
  client.on("threadUpdate", async (thread) => { try { if (thread.joinable) await thread.join(); } catch { return } });
} catch { return }
try { client.login(config.clave) } catch { return }