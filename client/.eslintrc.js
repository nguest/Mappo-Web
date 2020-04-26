module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "jasmine": true
  },
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parser": "babel-eslint",

  "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react",
  ],
  "rules": {
      "react/jsx-filename-extension": "off",
      "react/require-default": "off",
      "react/forbid-prop-types": "off",
      "object-curly-newline": "off",
      "react/jsx-boolean-value": "off",
      "react/state-in-constructor": "off",
      "react/destructuring-assignment": "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-fragments": "off",
      "no-restricted-globals": "off",
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "React"
        }
      ],
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "jsx-a11y/click-events-have-key-events": "off",
  },
};
