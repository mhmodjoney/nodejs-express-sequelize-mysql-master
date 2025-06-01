module.exports = {
  HOST: "dpg-d0qahlre5dus739ddk0g-a.singapore-postgres.render.com",
  USER: "menu_db_2rx9_user",
  PASSWORD: "tGOAVifpn1hBTEwWxR4WpLYKLRbTyif8",
  DB: "menu_db_2rx9",
  dialect: "postgres", // Make sure the dialect is 'postgres'
  port: 5432, // Add the port number
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};