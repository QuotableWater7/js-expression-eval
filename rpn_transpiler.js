var _ = require('underscore');
var Token = require('./rpn_token');

function calculate(expression) {
  var tokens = [];
  var output = '';
  var value;

  expression = stripWhitespace(expression);

  function lastToken() {
    return tokens[tokens.length - 1];
  }

  function shouldPopExistingToken(token) {
    return
      token.isLeftAssociative() && token.isLessOrEqualPrecedence(lastToken()) ||
      token.isRightAssocative() && token.isLesserPrecedence(lastToken());
  }

  function processChar(char) {
    var token = new Token(char);

    switch (true) {
    case token.isNumber():
      output += char;
      break;
    case token.isOperator():
      var token = new Token(char);
      while (tokens.length && lastToken().isOperator()) {
        if (shouldPopExistingToken(token)) {
          output += tokens.pop().value();
        } else {
          break;
        }
      }
      tokens.push(token);
      break;
    case token.isLeftParen():
      tokens.push(token);
      break;
    case token.isRightParen():
      while (!lastToken().isLeftParen()) {
        output += tokens.pop().value();
      }
      tokens.pop();
      break;
    }
  }

  function processRemainingOperators() {
    while (tokens.length) { output += tokens.pop().value(); }
  }

  _.each(expression, processChar);
  processRemainingOperators();

  return output;
}


function stripWhitespace(string) {
  return string.replace(/\s/g, '');
}

module.exports = { transpile: calculate };
