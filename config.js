// Untuk menyimpan config database
const env = process.env;

const config = {
    db: { /* don't expose password or any sensitive info, done only for demo */
      host: env.DB_HOST || '116.254.117.132',
      user: env.DB_USER || 'bedguys',
      password: env.DB_PASSWORD || 'Janglidalam29J',
      database: env.DB_NAME || 'gmedia_bedbos',
      port: env.DB_PORT || '3397',
    },
    listPerPage: env.LIST_PER_PAGE || 10,
  };
  
  module.exports = config;