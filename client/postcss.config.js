/* eslint-disable import/no-extraneous-dependencies */
module.exports = ({ _file, _options, env }) => ({
  plugins: {
    cssnano: env === 'production',
  },
});
