var input = require('./input').input;

function react(char1, char2){
    return char1 !== char2 && char1.toLowerCase() === char2.toLowerCase();
}
var charArray = input.split('');

function reactArray(array){
    var i = 0;
    while(i + 1 < array.length){
        if (react(array[i], array[i+1])){
            array.splice(i, 2);
            i = Math.max(i - 1, 0);
        } else {
            i++;
        }
    }
    return array.length
}


var min = { letter:'', count:charArray.length };
for (var charCode = 97; charCode < 97 + 26; charCode++){
    var char = String.fromCharCode(charCode);
    var filteredArray = charArray.filter(c => c.toLowerCase() !== char);
    var count = reactArray(filteredArray);
    if (count < min.count){
        min.letter = char;
        min.count = count;
    }
}

console.log(min);