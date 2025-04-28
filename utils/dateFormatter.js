const { formatInTimeZone } = require('date-fns-tz');

const formatDate = (date) => {
  if (!date) {
    return null; // Ou alguma mensagem
  }
  return formatInTimeZone(
    date,
    'America/Sao_Paulo',
    'dd/MM/yyyy HH:mm:ss'
  );
};

module.exports = { formatDate };