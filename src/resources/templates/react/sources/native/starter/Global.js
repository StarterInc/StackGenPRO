'use strict';

// fix 'self.fetch' issue: https://github.com/facebook/react-native/issues/9599
if(typeof global.self === "undefined")
{
    global.self = global;
}

  module.exports = {
    JSESSIONID : -1,
    STORE_KEY: 'TODO',
    MAJOR_VERSION : '',
    MINOR_VERSION : '',
    API_VERSION : '',
    API_HOST: 'http://:/',
    
    COLOR: {
      ORANGE: '#FF9900',
      DARKBLUE: '#0F3274',
      LIGHTBLUE: '#6EA8DA',
      DARKGRAY: '#999',
  },
};
