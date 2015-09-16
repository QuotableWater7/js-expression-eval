var _ = require('underscore');
var Token = require('./rpn_token');

function convertToRPN(expression) {
  var tokens = [];
  var output = [];
  var current_number = '';
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

    if (!token.isNumber() && output !== '') {
      output.push(new Token(parseFloat(current_number, 10)));
      current_number = '';
    }

    switch (true) {
    case token.isNumber():
      current_number += char;
      break;
    case token.isOperator():
      var token = new Token(char);
      while (tokens.length && lastToken().isOperator()) {
        if (shouldPopExistingToken(token)) {
          output.push(tokens.pop());
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
        output.push(tokens.pop());
      }
      tokens.pop();
      break;
    }
  }

  function processRemainingOperators() {
    while (tokens.length) { output.push(tokens.pop()); }
  }

  _.each(expression, processChar);

  if (current_number !== '') {
    output.push(new Token(parseFloat(current_number, 10)));
  }

  processRemainingOperators();

  return output;
}


function stripWhitespace(string) {
  return string.replace(/\s/g, '');
}

module.exports = { convertToRPN: convertToRPN };
