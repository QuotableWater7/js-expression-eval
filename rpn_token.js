var _ = require('underscore');

module.exports = function (string) {
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
      if (_.contains(['+', '-'], string)) {
        return 2;
      } else if (_.contains(['*', '/'], string)) {
        return 3;
      } else if (string === '^') {
        return 4;
      }
    },

    value: function () {
      if (this.isNumber()) {
        return parseFloat(string);
      }

      return string;
    },

    isOperator: function () {
      return _.contains(['+', '-', '*', '/', '^'], string);
    },

    isNumber: function () {
      return _.isFinite(string);
    },

    isLeftParen: function () {
      return string === '(';
    },

    isRightParen: function () {
      return string === ')';
    },

    isLeftAssociative: function () {
      return string !== '^';
    },

    isRightAssocative: function () {
      return string === '^';
    }
  };
};
