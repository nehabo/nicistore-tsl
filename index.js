/**
 * Automatically hook babel into all node requires.
 */
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: [
        'transform-runtime',
        'transform-async-to-generator',
        'transform-class-properties',
        'transform-decorators',
      ],
});

/**
 * Intl APIs (ECMA-402) Polyfill.
 */
require('./src/utils/intlServerPolyfill');

/**
 * Start application server.
 */
require('./src/server');

/**
 * In development, also start Webpack dev server.
 */
if (process.env.NODE_ENV === 'development') {
    require('./webpack/server');
}
