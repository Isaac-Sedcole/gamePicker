const environments = {
    development: 'http://localhost:3000/api',
    test: 'http://localhost:3333/api',
    production: 'https://gamepickerchooser.herokuapp.com/api',
    integration: '',
    deployment: '',
    build: ''
  }
  
  const env = process.env.NODE_ENV || 'development'
  
  export const baseApiUrl = environments[env]