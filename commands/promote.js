const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../config');

const RANK_LOG_CHANNEL_ID = '1476021791934779392'; // 🍂・ʀᴀɴᴋ-ᴄʜᴀɴɢᴇꜱ

module.exports = {
  data: new SlashCommandBuilder()
    .setName('promote')
    .setDescription('Promover a un usuario según la jerarquía')
    .addUserOption(option =>
      option
        .setName('usuario')
        .setDescription('Usuario a promover')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('rol')
        .setDescription('Rol superior a asignar')
        .setRequired(true)
        .addChoices(
          { name: 'Presage', value: '1322289638760644648' }, // 👤 Presage
          { name: 'Mod', value: '1322289638760644654' },
          { name: 'Co-lider', value: '1322289638760644655' },
          { name: 'Lider', value: '1322289638760644656' },
          { name: 'Co-owner', value: '1322289638760644657' },
          { name: 'Regulator', value: '1466180841947271209' },
          { name: 'Admin', value: '1466180783696773300' },
          { name: 'Owner', value: '1322289638773096591' }
        )
    ),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: '❌ No tienes permisos.', ephemeral: true });
    }

    const miembro = interaction.options.getMember('usuario');
    const rolId = interaction.options.getString('rol');
    const nuevoRol = interaction.guild.roles.cache.get(rolId);

    if (!miembro || !nuevoRol) {
      return interaction.reply({ content: '❌ Usuario o rol inválido.', ephemeral: true });
    }

    const orden = config.promoteOrder;

    const rolActual = [...orden].reverse().find(id => miembro.roles.cache.has(id));
    if (!rolActual) {
      return interaction.reply({
        content: '❌ El usuario no tiene ningún rol de la jerarquía.',
        ephemeral: true
      });
    }

    if (orden.indexOf(rolId) <= orden.indexOf(rolActual)) {
      return interaction.reply({
        content: '❌ El rol debe ser superior al actual.',
        ephemeral: true
      });
    }

    for (const id of orden) {
      if (miembro.roles.cache.has(id)) {
        await miembro.roles.remove(id).catch(() => {});
      }
    }

    await miembro.roles.add(nuevoRol);

    const emojiPromote = '<a:vssparkly:1335605444181495818>';

    const embed = new EmbedBuilder()
      .setTitle(`${emojiPromote} PROMOTE ${emojiPromote}`)
      .setColor(0x9b59b6) // 💜 morado
      .addFields(
        {
          name: 'Usuario',
          value: `${miembro}`,
          inline: true
        },
        {
          name: 'Rol',
          value: `${nuevoRol}`,
          inline: true
        },
        {
          name: 'Moderador',
          value: `${interaction.user}`,
          inline: false
        }
      )
      .setThumbnail(miembro.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setTimestamp();

    // 📤 Enviar log al canal de rank changes
    const logChannel = interaction.guild.channels.cache.get(RANK_LOG_CHANNEL_ID);
    if (logChannel) {
      await logChannel.send({ embeds: [embed] });
    }

    // ✅ Respuesta del comando
    await interaction.reply({ embeds: [embed] });
  }
};