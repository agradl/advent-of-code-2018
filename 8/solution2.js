var input = require('./input').input;
console.log(input);
var index = 65;
function nextNodeLetter(){
    var letter = String.fromCharCode(index);
    index++;
    return letter;
}
function process(array, reportSum){
    var letter = nextNodeLetter();
    var children = getFirst(array, 'children', letter);
    var metaEntries = getFirst(array, 'metaEntries', letter);
    var childSums = {};
    var sum = 0;
    for(var i =0; i < children; i ++){
        process(array, (reportedSum) => childSums[i+1] = reportedSum);
    }
    console.log(`${letter} childSums ${JSON.stringify(childSums)}`)
    for (var i = 0; i < metaEntries; i++){
        var meta = getFirst(array, 'meta', letter);
        if (children === 0){
            sum += meta;
        } else {
            sum += (childSums[meta] || 0);
        }
    }
    console.log(`${letter} sum is ${sum}`);
    reportSum(sum);
}
var position = 0
function getFirst(array, action, letter){
    var num = Number.parseInt(array.shift(), 10);
    console.log(`${position} ${letter} ${action} ${num}`);
    position++;
    return num;
}
var totalSum
process(input, (reportedSum) => totalSum = reportedSum);

console.log(totalSum);