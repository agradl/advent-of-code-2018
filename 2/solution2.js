var input = require('./input').input;

var twoCounts = 0;
var threeCounts = 0;

function getCommonCharacters(str1, str2){
    var missCount = 0;
    var missedIndex = -1;
    for(var i = 0; i < str1.length; i++){
        if (str1[i] !== str2[i]){
            missCount++;
            missedIndex = i;
        }
        if(missCount > 1){
            return false;
        }
    }
    return str1.substr(0, missedIndex) + str1.substr(missedIndex + 1, str1.length);
}


for (var x = 0; x < input.length; x++){
    for(var y = 0; y < input.length; y++){
        if (y === x){
            continue;
        }
        var commonCharacters = getCommonCharacters(input[x], input[y]);
            
        if (commonCharacters){
            console.log('answer is ' + commonCharacters);
        }
    }
}

