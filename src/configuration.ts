import { LayoutStyle } from '~/core/layout-style';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';

const configuration = {
  site: {
    name: 'mentan.ai - create any infoproduct in minutes',
    description: 'Unlock a world of possibilities with our innovative product.',
    themeColor: '#ffffff',
    themeColorDark: '#0a0a0a',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL as string,
    siteName: 'mentan.ai',
    twitterHandle: '',
    githubHandle: '',
    language: 'en',
    convertKitFormId: '',
    locale: process.env.DEFAULT_LOCALE,
  },
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  auth: {
    // Enable MFA. You must upgrade to GCP Identity Platform to use it.
    // see: https://cloud.google.com/identity-platform/docs/product-comparison
    enableMultiFactorAuth: false,
    // When enabled, users will be required to verify their email address
    // before being able to access the app
    requireEmailVerification:
      process.env.NEXT_PUBLIC_REQUIRE_EMAIL_VERIFICATION === 'true',
    // NB: Enable the providers below in the Firebase Console
    // in your production project
    providers: {
      emailPassword: true,
      phoneNumber: false,
      emailLink: false,
      oAuth: [GoogleAuthProvider],
    },
  },
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'development',
  emulatorHost: process.env.NEXT_PUBLIC_EMULATOR_HOST,
  emulator: process.env.NEXT_PUBLIC_EMULATOR === 'true',
  production: process.env.NODE_ENV === 'production',
  enableThemeSwitcher: true,
  paths: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    emailLinkSignIn: '/auth/link',
    onboarding: `/onboarding`,
    appHome: '/dashboard',
    products: '/products',
    settings: {
      profile: '/settings/profile',
      authentication: '/settings/profile/authentication',
      email: '/settings/profile/email',
      password: '/settings/profile/password',
    },
    api: {
      checkout: `/api/stripe/checkout`,
      billingPortal: `/api/stripe/portal`,
    },
    searchIndex: `/public/search-index`,
  },
  navigation: {
    style: LayoutStyle.Sidebar,
  },
  appCheckSiteKey: process.env.NEXT_PUBLIC_APPCHECK_KEY,
  email: {
    host: '',
    port: 587,
    user: '',
    password: '',
    senderAddress: 'mentain.ai <arfs.antonio@gmail.com>',
  },
  emailEtherealTestAccount: {
    email: process.env.ETHEREAL_EMAIL,
    password: process.env.ETHEREAL_PASSWORD,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  stripe: {
    products: [
      {
        name: 'Free',
        description:
          'Our basic plan includes access to all basic features of our platform, including 24/7 support and up to 1 project.',
        badge: `Up to 1 user`,
        features: ['Basic Reporting', '1 infoproduct', 'Without Support'],
        plans: [
          {
            name: 'Monthly',
            price: '$0',
            stripePriceId: 'basic-plan-mth',
            trialPeriodDays: 30,
          },
          {
            name: 'Yearly',
            price: '$0',
            stripePriceId: 'basic-plan-yr',
            trialPeriodDays: 30,
          },
        ],
      },
      {
        name: 'Pro',
        badge: `Most Popular`,
        recommended: true,
        description:
          'Upgrade to our Pro plan for access to advanced features like project collaboration, custom branding, and up to 10 projects',
        features: [
          'Advanced Reporting',
          'Unlimited infoproducts',
          'Chat and Whatsapp Support',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$9',
            stripePriceId: 'pro-plan-mth',
            trialPeriodDays: 0,
          },
          {
            name: 'Yearly',
            price: '$89',
            stripePriceId: 'pro-plan-yr',
            trialPeriodDays: 0,
          },
        ],
      },
      {
        name: 'Premium',
        description:
          'Our Premium plan offers the ultimate experience with unlimited projects, priority support, and personalized onboarding. Plus, get exclusive access to new features before anyone else.',
        badge: ``,
        features: [
          'Advanced Reporting',
          'Unlimited infoproducts',
          'Account Manager',
        ],
        plans: [
          {
            name: '',
            price: 'Contact us',
            stripePriceId: '',
            trialPeriodDays: 0,
            label: `Contact us`,
            href: `/contact`,
          },
        ],
      },
    ],
  },
};

export default configuration;
