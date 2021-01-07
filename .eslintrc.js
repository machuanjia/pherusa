module.exports = {
  extends: ['react-app', require.resolve('@umijs/fabric/dist/eslint')],

  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },

  rules: {
    // your rules
    'new-cap': ['error', { newIsCap: false }],
    'no-underscore-dangle': ['error', { allow: ['_id','_viewport'] }],
    'no-console': 0,
    'no-underscore-dangle':0
  },
};
