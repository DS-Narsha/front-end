module.exports = {
  root: true,
  extends: '@react-native-community',
  //여기부터 추가한 코드임
  extends: ['airbnb', 'prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': ['off'],
  },
};
