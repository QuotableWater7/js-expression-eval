var _ = require('underscore');
var Token = require('./rpn_token');

var TOKENIZER_REGEX = /(?:\d+|[^\s])/g;

function Transpiler(expression) {
  this.expression = expression;
  this.tokens = [];
  this.stack = [];
  this.output = [];

  this.initializeTokens();
}

_.extend(Transpiler.prototype, {

  initializeTokens: function () {
    var match = TOKENIZER_REGEX.exec(this.expression);

    while (match !== null) {
      this.tokens.push(new Token(match[0]));
      match = TOKENIZER_REGEX.exec(this.expression);
    }
  },

  generateTokens: function () {
    var self = this;

    _.each(this.tokens, function (token) {
      switch (true) {
      case token.isNumber():
        self.output.push(token);
        break;
      case token.isOperator():
        while (self.stack.length && self.lastOnStackIsOperator()) {
          if (self.shouldPopExistingToken(token)) {
            self.output.push(self.stack.pop());
          } else {
            break;
          }
        }
        self.stack.push(token);
        break;
      case token.isLeftParen():
        self.stack.push(token);
        break;
      case token.isRightParen():
        while (!self.lastOnStack().isLeftParen()) {
          self.output.push(self.stack.pop());
        }
        self.stack.pop();
        break;
      }
    });

    this.popRemainingOperatorsToOutput();

    return self.output;
  },

  lastOnStack: function () {
    return _.last(this.stack);
  },

  lastOnStackIsOperator: function () {
    this.lastOnStack().isOperator();
  },

  shouldPopExistingToken: function (token) {
    return
      token.isLeftAssociative() &&
      token.isLessOrEqualPrecedence(this.lastOnStack()) ||
      token.isRightAssocative() &&
      token.isLesserPrecedence(this.lastOnStack());
  },

  popRemainingOperatorsToOutput: function () {
    while (this.stack.length) {
      this.output.push(this.stack.pop());
    }
  }

});

function convertToRPN(expression) {
  var transpiler = new Transpiler(expression);
  return transpiler.generateTokens();
}

module.exports = { convertToRPN: convertToRPN };
