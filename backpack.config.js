module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ["./src/main.ts"];

    config.resolve = {
      extensions: [".ts", ".js", ".json"]
    };

    config.module.rules[0].test = /\.(ts|js)x?$/;

    return config;
  }
};
