module.exports = {
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: { properties: ['^data-testid$'] },
  }
};
