var input = require('./input').input;

function react(char1, char2){
    return char1 !== char2 && char1.toLowerCase() === char2.toLowerCase();
}
var charArray = input.split('');
var i = 0;

while(i + 1 < charArray.length){
    if (react(charArray[i], charArray[i+1])){
        charArray.splice(i, 2);
        i = Math.max(i - 1, 0);
    } else {
        i++;
    }
}



console.log(charArray.length);