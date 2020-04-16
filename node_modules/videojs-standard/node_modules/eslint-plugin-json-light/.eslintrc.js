module.exports = {
  "extends": "airbnb-base",
  "env": {
    "node": true,
    "mocha": true
  },
  "plugins": [
    "mocha"
  ],
  "rules": {
    "mocha/no-exclusive-tests": "error",
    "consistent-return": "off",
  }
};
