var env = process.env.app
var config = {
  "dev": {
    "mongo": {
      "uri": "mongodb://127.0.0.1:27017/",
      "dbName": "dev_readanalytics",
      "options": {
        useNewUrlParser: true
      }
    },
    "secrets": {
      "session": 'dev-readanlytics'
    }
  },
  "prod": {
    "mongo": {
      "uri": "mongodb://127.0.0.1:27017/",
      "dbName": "readanalytics",
      "options": {
        useNewUrlParser: true
      }
    },
    "secrets": {
      "session": 'readanlytics'
    }

  }

}

module.exports = env ? config[env] : config['dev']
