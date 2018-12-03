var input = require('./input').input;

console.log('result is ' + input.reduce(function(accum, v) { return accum + v }, 0));