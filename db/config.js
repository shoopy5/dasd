module.exports = {
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  port: process.env.PORT,
  portdb: process.env.DATABASE_PORT,
};
