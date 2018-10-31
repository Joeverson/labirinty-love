module.exports = {
  "extends": "standard",
  "globals": {
    "no-undef": false,
    "_": false,
    "PIXI": false    
  },
  "rules": {
    "new-cap": [false, {
      "properties": false
    }] 
  }
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
};
