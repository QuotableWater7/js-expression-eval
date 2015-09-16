var _ = require('underscore');
var Token = require('./rpn_token');
var RPNTranspiler = require('./rpn_transpiler');

function expressionRunner(operator, arg1, arg2) {
  switch (operator) {
  case '+':
    return arg1 + arg2;
  case '-':
    return arg1 - arg2;
  case '^':
    return Math.pow(arg1, arg2);
  case '*':
    return arg1 * arg2;
  case '/':
    return arg1 / arg2;
  }
}

function calculate(rpn_expression) {
  var stack = [];

  _.each(rpn_expression, function (token) {
    switch (true) {
    case token.isNumber():
      stack.push(token);
      break;
    default:
      var arg2 = stack.pop();
      var arg1 = stack.pop();
      var result = expressionRunner(token.value(), arg1.value(), arg2.value());

      stack.push(new Token(result));
      break;
    }
  });

  return stack.pop().value();
}

var expression = process.argv[2];
var rpn_expression = RPNTranspiler(expression);
console.log(calculate(rpn_expression));
