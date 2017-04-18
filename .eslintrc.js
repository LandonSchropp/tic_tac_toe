module.exports = {
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
    mocha: true,
    node: true,
    es6: true
  },
  globals: {
    Phaser: true
  }
};
