var _ = require('underscore');
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

  _.each(rpn_expression, function (char) {
    switch (true) {
    case char >= '0' && char <= '9':
      stack.push(parseFloat(char));
      break;
    default:
      var arg2 = stack.pop();
      var arg1 = stack.pop();
      stack.push(expressionRunner(char, arg1, arg2));
      break;
    }
  });

  return stack.pop();
}

var expression = '3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3';
var rpn_expression = RPNTranspiler.transpile(expression);
console.log(calculate(rpn_expression));
