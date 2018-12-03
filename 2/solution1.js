var input = require('./input').input;

var twoCounts = 0;
var threeCounts = 0;

input.forEach(function(val){
    var characters = val.split('');
    var counts = {};
    characters.reduce(function(accum, val){
        counts[val] = (counts[val] || 0) + 1;
    }, characters);

    var incrementTwo = false, incrementThree = false;
    Object.keys(counts).forEach(function(char){
        incrementTwo = counts[char] === 2 || incrementTwo;    
        incrementThree = counts[char] === 3 || incrementThree;
    });
    if (incrementTwo){
        twoCounts++;
    }
    if (incrementThree){
        threeCounts++;
    }
});

console.log('two counts is ' + twoCounts);
console.log('three counts is ' + threeCounts);
console.log('checksum is ' + twoCounts * threeCounts);