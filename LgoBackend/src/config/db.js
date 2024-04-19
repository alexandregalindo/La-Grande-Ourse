const { Sequelize } = require('sequelize');
const crypto = require('crypto');

const sequelize = new Sequelize('instit43_GrandeOurse_DB_test', 'instit43_GOurse_DB_adm', 'LGO@ig23', {
  host: '23.235.197.135',
  dialect: 'mysql',
  logging: console.log,
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) {
      if (field.type === 'DATETIME') {
        return field.string()
      }
      return next()
    },
  },
  timezone: '-04:00'
});

sequelize.authenticate()
  .then(() => console.log('Conexão com o MySQL estabelecida com sucesso.'))
  .catch(err => console.error('Não foi possível conectar ao MySQL:', err));

module.exports = sequelize;
