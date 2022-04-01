// .env file variables
require("dotenv").config();
let db_user = process.env.DB_USER;
let db_pass = process.env.DB_PASS;
let key = process.env.SECRET_KEY;

// Export db connection URL and secret key
module.exports = {
    db_URL: `mongodb+srv://${db_user}:${db_pass}@shiftr.wvvsa.mongodb.net/Shiftr?retryWrites=true&w=majority`,
    secret_key: key
}