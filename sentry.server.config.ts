import * as Sentry from '@sentry/nextjs';
import getRuntimeEnv from 'utils/env';

const SENTRY_DSN = getRuntimeEnv('SENTRY_DSN');

Sentry.init({
  dsn: SENTRY_DSN,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  enabled: process.env.NODE_ENV !== 'development',
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});