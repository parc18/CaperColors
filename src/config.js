const environment = {
  development: {
    isProduction: false,
    assetsPath: `http://${process.env.HOST || 'localhost'}:${+process.env.PORT + 1 || 3001}/dist/`
  },
  production: {
    isProduction: true,
    assetsPath: '/dist/'
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT || '9999',
    app: {
      title: '',
      description: 'Event Organizing Company',
      head: {
        titleTemplate: 'KhelAcademy: %s',
        meta: [
          { name: 'description', content: 'Khelacademy is an Event Organizing Company whose expertise lies in sports' },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: 'KhelAcademy' },
          { property: 'og:image', content: 'http://res.cloudinary.com/parc-india/image/upload/c_scale,w_29/v1528536871/mjbfldjaluptlybuzetr.png' },
          { property: 'og:locale', content: 'as_IN' },
          { property: 'og:title', content: 'Khelacademy' },
          { property: 'og:description', content: 'Event Organizing Company' },
          { property: 'og:card', content: 'summary' },
          { property: 'og:site', content: '@premi' },
          { property: 'og:creator', content: '@premi' },
          { property: 'og:image:width', content: '200' },
          { property: 'og:image:height', content: '200' },
          { property: 'og:keywords', content: 'badminton, table tennis, football, basketball, cricket, tournament, booking, event booking, sports booking, game booking, timepass' }
        ]
      }
    }
  },
  environment
);
