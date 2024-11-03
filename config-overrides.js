const webpack = require('webpack');

module.exports = function override(config) {
    config.resolve.fallback = {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "util": require.resolve("util/"),
        "zlib": require.resolve("browserify-zlib"),
        "stream": require.resolve("stream-browserify"),
        "url": require.resolve("url/"),
        "assert": require.resolve("assert/"),
        "buffer": require.resolve("buffer/")
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        })
    );
    return config;
};