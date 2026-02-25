module.exports = {
  clientId: "1388993002009268425",
  guildId: "1322289638731157516",

  // 👥 Testers
  testerRoleIds: [
    "1322296006808834098", // Tester General
    "1389094797813354526", // Tester Vanilla
    "1322289638760644653", // Tester Boxpvp
    "1327078146687893616", // Tester Tridentebox
  ],

  // 📩 Canales principales
  commandsChannelId: "1389352450695106703", // 💳┃ᴄᴏᴍᴀɴᴅᴏꜱ
  testingChannelId: "1388997116365373450", // 🎫┃ᴛɪᴄᴋᴇᴛꜱ
  transcriptionChannelId: "1389354679208644788", // 📰┃ᴛʀᴀɴꜱᴄʀɪᴘᴄɪᴏɴ
  resultsChannelId: "1389358024027803648", // 🏆┃ʀᴇꜱᴜʟᴛꜱ
  moderationLogChannelId: "1329570590843207712", // 📑 Logs moderación
  suggestionChannelId: "1475635157045215242", // 💡 sugerencias

  // 🧪 Sistema de test
  testCategory: "Autenticidad",
  testCategoryId: "1322289638773096594",
  maxQueueSize: 5,
  autoRemoveMinutes: 5,

  // 👤 Manager del servidor
  guildManagerId: "808346067317162015",

  // 🖼️ Imagen cuando no hay testers
  noTesterImage:
    "https://i.pinimg.com/originals/92/a9/e2/92a9e2adc479797f8c939844a397b936.gif",

  // ⬆️⬇️ Sistema PROMOTE / DEMOTE
  // Orden jerárquico REAL (de menor a mayor)
  promoteOrder: [
    "1322289638760644648", // 👤 Presage
    "1322289638760644654", // Mod
    "1322289638760644655", // Co-lider
    "1322289638760644656", // Lider
    "1322289638760644657", // Co-owner
    "1466180841947271209", // Regulator
    "1466180783696773300", // Admin
    "1322289638773096591", // Owner
  ],

  // Roles que se quitan antes de promover o degradar
  promoteReplaceRoleIds: [
    "1322289638760644648", // 👤 Presage
    "1322289638760644654", // Mod
    "1322289638760644655", // Co-lider
    "1322289638760644656", // Lider
    "1322289638760644657", // Co-owner
    "1466180841947271209", // Regulator
    "1466180783696773300", // Admin
    "1322289638773096591", // Owner
  ],
};
