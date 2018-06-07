 module.exports = {
  apps : [
      {
        name: "react-redux-universal-hot-example",
        script: "./bin/server.js",
        watch: true,
        env: {
            "PORT": 3000,//you can choose
            "NODE_ENV": "development"
        },
        env_production: {
            "PORT": 8080,//you can choose
            "NODE_ENV": "production",
        }
      },
      {
        name: "react-redux-universal-hot-example",
        script: "./bin/api.js",
        watch: true,
        env: {
            "PORT": 3030,//you can choose
            "NODE_ENV": "development"
        },
        env_production: {
            "PORT": 3030,//you can choose
            "NODE_ENV": "production",
        }
      }
  ]
}