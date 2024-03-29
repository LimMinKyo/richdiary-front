import { withSentryConfig } from '@sentry/nextjs';
import webpack from 'webpack';
import getWithBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-daisyui'],
  reactStrictMode: true,
  swcMinify: true,
  // generateEtags: false,
  // generateBuildId: () => new Date().getTime().toString(),
  sentry: {
    hideSourceMaps: true,
  },
  compress: true,
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production';

    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
    ];

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval-source-map',
      plugins,
    };
  },
};

/** @type {import('@sentry/nextjs').SentryWebpackPluginOptions} */
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const withBundleAnalyzer = getWithBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(
  withSentryConfig(nextConfig, sentryWebpackPluginOptions),
);
