module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ["./src/main.ts"];

    config.resolve = {
      extensions: [".ts", ".js", ".json"]
    };

    return config;
  }
};
