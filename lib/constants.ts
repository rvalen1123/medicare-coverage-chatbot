import { generateDummyPassword } from './db/utils';

export const isProductionEnvironment = process.env.NODE_ENV === 'production';
export const isDevelopmentEnvironment = process.env.NODE_ENV === 'development';
export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT,
);

export const guestRegex = /^guest-\d+$/;

export const DUMMY_PASSWORD = generateDummyPassword();

// Database connection
export const DATABASE_URL = process.env.MONGO_URI || process.env.DATABASE_URL || '';

// Medicare-specific settings
export const MEDICARE_TITLE = process.env.NEXT_PUBLIC_TITLE || 'Medicare Coverage Assistant';
export const DEFAULT_SYSTEM_PROMPT = process.env.DEFAULT_SYSTEM_PROMPT || 'You are a Medicare Coverage Assistant';

// Guest access
export const ALLOW_GUEST_ACCESS = process.env.NEXT_PUBLIC_GUEST_KEY === 'true';
