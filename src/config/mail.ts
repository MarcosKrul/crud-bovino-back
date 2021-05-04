require("dotenv/config");

export default {
    port: process.env.MAIL_PORT,
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_EMAIL,
    password: process.env.MAIL_PASSWORD
};