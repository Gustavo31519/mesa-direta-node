function cronDate(dataISO) {
  const data = new Date(dataISO);
  const ano = data.getFullYear();
  const mes = data.getMonth() + 1; // Os meses em JavaScript são de 0 a 11
  const dia = data.getDate();
  const hora = data.getHours();
  const minuto = data.getMinutes();

  return `${minuto} ${hora} ${dia} ${mes} *`;
}

module.exports = cronDate

