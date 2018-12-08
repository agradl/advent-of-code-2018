var input = require('./input').input;
console.log(input);
var sum = 0;
function process(array){
    var children = getFirst(array, 'children');
    var metaEntries = getFirst(array, 'metaEntries');
    for(var i =0; i < children; i ++){
        process(array);
    }
    for (var i = 0; i < metaEntries; i++){
        var meta = getFirst(array, 'meta');
        sum += meta;
    }
}
var position = 0
function getFirst(array, action){
    var num = Number.parseInt(array.shift(), 10);
    console.log(`${position} ${action} ${num}`);
    position++;
    return num;
}

process(input);

console.log(sum);