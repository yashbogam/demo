module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    // Disable warnings for unused variables and imports
    '@typescript-eslint/no-unused-vars': 'warn',
    // Allow empty interfaces
    '@typescript-eslint/no-empty-object-type': 'off',
    // Allow any types in some cases
    '@typescript-eslint/no-explicit-any': 'warn',
    // More lenient on React hooks rules
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    // Allow missing display names
    'react/display-name': 'off',
    // Allow HTML links in some cases
    '@next/next/no-html-link-for-pages': 'warn',
  },
}; 