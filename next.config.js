if (process.env.NODE_END === "production") {
  module.exports = {
    reactStrictMode: true,
    compiler: {
      reactRemoveProperties: { properties: ["^data-testid$"] }
    }
  };
} else {
  module.exports = {
    reactStrictMode: true
  };
}
