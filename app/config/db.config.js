module.exports = {
  URL: "postgresql://mhmodmore7mhmod:npg_8CFgzOm1HpTI@ep-red-recipe-548838-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};