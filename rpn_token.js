var _ = require('underscore');

module.exports = function (char) {
  return {
    isLesserPrecedence: function (token) {
      return this.precedence() < token.precedence();
    },

    isLessOrEqualPrecedence: function (token) {
      return this.isLesserPrecedence(token) || this.isEqualPrecedence(token);
    },

    isEqualPrecedence: function (token) {
      return this.precedence() === token.precedence();
    },

    isGreaterPrecedence: function (token) {
      return this.precedence() > token.precedence();
    },

    precedence: function () {
      if (_.contains(['+', '-'], char)) {
        return 2;
      } else if (_.contains(['*', '/'], char)) {
        return 3;
      } else if (char === '^') {
        return 4;
      }
    },

    value: function () {
      return char;
    },

    isOperator: function () {
      return _.contains(['+', '-', '*', '/', '^'], char);
    },

    isNumber: function () {
      return char >= '0' && char <= '9';
    },

    isLeftParen: function () {
      return char === '(';
    },

    isRightParen: function () {
      return char === ')';
    },

    isLeftAssociative: function () {
      return char !== '^';
    },

    isRightAssocative: function () {
      return char === '^';
    }
  };
};
