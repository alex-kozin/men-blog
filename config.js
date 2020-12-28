var config = {}

config.dbname = "blogdb"
config.port = 4000
config.connection_string = `mongodb://localhost/${config.dbname}`
config.session_secret = "top secret"


module.exports = config;