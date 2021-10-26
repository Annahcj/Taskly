require('dotenv').config();

dbPassword = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.lodca.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;

module.exports = { mongoURI: dbPassword }