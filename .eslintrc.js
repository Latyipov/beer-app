module.exports = {
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:react/jsx-runtime',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'no-console': 'error',
  },

  globals: {
    firebaseApp: 'readonly',
    REACT_APP_FIREBASE_API_KEY: 'readonly',
    REACT_APP_FIREBASE_AUTH_DOMAIN: 'readonly',
    REACT_APP_FIREBASE_DATABASE_URL: 'readonly',
    REACT_APP_FIREBASE_PROJECT_ID: 'readonly',
    REACT_APP_FIREBASE_STORAGE_BUCKET: 'readonly',
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: 'readonly',
    REACT_APP_FIREBASE_APP_ID: 'readonly',
    REACT_APP_FIREBASE_MEASUREMENT_ID: 'readonly',
  },
};
