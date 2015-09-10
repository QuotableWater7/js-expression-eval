# xpression
A tool to evaluate mathematical expressions

This program takes as input a mathematical expression inside a string and returns the result.  It does so by converting the expression to Reverse Polish Notation (postfix) using the Shunting-yard algorithm.

Basic Usage:
node ./rpn_calculator.js '1 + 5 * (8-4)^2'

Todo:
Allow string to contain variables, and the method to accept variable mapping as the second argument.
