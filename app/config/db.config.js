module.exports = {
  URL: "postgresql://postgres:ilQTefGiJbDOuLRQhiNgAJygMRiggUWk@mainline.proxy.rlwy.net:39566/railway",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
