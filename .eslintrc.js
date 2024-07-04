module.exports = {
    "extends": ["eslint:recommended", "prettier"],
    "ignorePatterns": ["webpack.config.js"],
    "rules": {
        // enable additional rules
        //"quotes": ["error", "double"],

        // override configuration set by extending "eslint:recommended"
        "no-empty": "warn",
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
         "for-direction": "off",
    }
}