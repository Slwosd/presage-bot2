const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sugerencia')
    .setDescription('Enviar una sugerencia')
    .addStringOption(option =>
      option
        .setName('texto')
        .setDescription('Escribe tu sugerencia')
        .setRequired(true)
    ),

  async execute(interaction) {
    const texto = interaction.options.getString('texto');

    const canalSugerencias = interaction.guild.channels.cache.get(
      config.suggestionChannelId
    );

    if (!canalSugerencias) {
      return interaction.reply({
        content: '❌ No se encontró el canal de sugerencias.',
        ephemeral: true
      });
    }

    const emojiTitulo = '<a:florazul:1474163532508434453>';
    const emojiNo = '<:nein73:1476031269107400805>';
    const emojiSi = '<:green_check:1476031228032323837>';

    const embed = new EmbedBuilder()
      .setTitle(`${emojiTitulo} NUEVA SUGERENCIA ${emojiTitulo}`)
      .setColor(0xc77dff) // 💜 violeta claro
      .setThumbnail(
        interaction.user.displayAvatarURL({ dynamic: true, size: 512 })
      )
      .addFields(
        {
          name: 'User',
          value: `${interaction.user}`,
          inline: false
        },
        {
          name: 'Sugerencia',
          value: texto,
          inline: false
        }
      )
      .setFooter({
        text: 'Reacciona para votar '
      })
      .setTimestamp();

    const mensaje = await canalSugerencias.send({ embeds: [embed] });

    // 🔁 Reacciones automáticas
    await mensaje.react(emojiSi);
    await mensaje.react(emojiNo);

    await interaction.reply({
      content: '✅ Tu sugerencia fue enviada correctamente.',
      ephemeral: true
    });
  }
};
