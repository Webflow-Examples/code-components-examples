// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = {
  resolve: {
      alias: {
          "@": path.resolve(process.cwd()), // Maps @ to the v4 app directory
      },
  },
};

