var lines = require('fs').readFileSync('./input.js', 'utf-8')
    .split('\n')
    .filter(Boolean);


function parse(line, index){
    var result;
    try {
        result = /\[(\d{4}-\d{2}-\d{2}\s\d{2}:(\d{2}))\]\s((Guard\s#([0-9]+))|falls\sasleep|wakes\sup)/i.exec(line);    
    } catch(ex){
        console.log(ex + ' on line #' + (index + 1));
    }
    if (!result){
        console.log('no match on line #' + (index + 1))
        console.log(line);
    }
    
    return {
        date: result[1],
        minutes: Number.parseInt(result[2], 10),
        fallsAsleep: result[3] === 'falls asleep',
        wakesUp: result[3] === 'wakes up',
        guardNumber: result[3].indexOf('Guard') > -1 ? Number.parseInt(result[5], 10) : null
    };
}
var parsedLines = lines.map(parse);
parsedLines.sort(function(a, b){ return a.date.localeCompare(b.date) });

var guardMinutes = {
    //[id]:{ totalMinutes: <number>, histogram: { [minute]: dayCount } }
};

var currentGuard, asleepStartMinutes;
parsedLines.forEach(line => {
    if (line.guardNumber && line.guardNumber !== currentGuard){
        currentGuard = line.guardNumber;
        asleepStartMinutes = null;
    }
    if (line.fallsAsleep){
        asleepStartMinutes = line.minutes;
    }
    if (line.wakesUp){
        guardMinutes[currentGuard] = (guardMinutes[currentGuard] || {totalMinutes:0,histogram:{}});
        guardMinutes[currentGuard].totalMinutes+= (line.minutes - asleepStartMinutes);
        for (var minute = asleepStartMinutes; minute < line.minutes; minute++){
            guardMinutes[currentGuard].histogram[minute] = (guardMinutes[currentGuard].histogram[minute] || 0) + 1;
        }
        asleepStartMinutes = null;
    }
});

function max(histogram, selector){
    var max = { item: null, value: 0 };
    Object.keys(histogram).forEach(key => {
        var val = selector(histogram[key]);
        
        if (val > max.value){
            max.value = val
            max.item = { key: key, value: val };
        }
    });
    return max.item;
}

var maxGuard = max(guardMinutes, (obj) => obj.totalMinutes);

var maxMinute = max(guardMinutes[maxGuard.key].histogram, val => val).key;


console.log('the answer is ' + (Number.parseInt(maxGuard.key,10) * maxMinute));
