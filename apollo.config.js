const path = require('path');

module.exports = {
  client: {
    includes: [path.join(__dirname, '/src/queries/**/*.ts')],
  },
};
