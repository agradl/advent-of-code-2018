var input = require('./input').input;

var visited = { 0: true };
var accum = 0;
var index = 0;
while(true){
    accum+= input[index];
    if (visited[accum]){
        console.log('answer is ' + accum);
        return;
    }
    visited[accum] = true;
    index++;
    if (index >= input.length){
        index = 0;
        console.log('repeating loop accum is ' + accum);
    }
}