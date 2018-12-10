var input = require('./input').input;

var points = input.map(row => {
    var result = /position=<\s*([^,]+),\s*([^\)]+)> velocity=<\s*([^,]+),\s*([^\)]+)>/.exec(row)
    return { 
        x: Number.parseInt(result[1], 10), 
        y: Number.parseInt(result[2], 10),
        vx: Number.parseInt(result[3], 10),
        vy: Number.parseInt(result[4], 10)
    };
});

function minMaxes(){
    var minX = null, minY = null, maxX = null, maxY = null;
    points.forEach(point => {
        if (minX === null){
            minX = point.x;
            maxX = point.x;
            minY = point.y;
            maxY = point.y;
        } else {
            minX = Math.min(minX, point.x);
            maxX = Math.max(maxX, point.x);
            minY = Math.min(minY, point.y);
            maxY = Math.max(maxY, point.y);
        }
    });
    return { minX, maxX, minY, maxY };
}

function print(){
    var extremes = minMaxes();
    console.log(`${second}----------------------------------------`)
    for (var y = extremes.minY; y <= extremes.maxY; y++){
        var output = '  ';
        for(var x = extremes.minX; x <= extremes.maxX; x++){
            output += points.filter(p => p.x === x && p.y === y).length ? '#' : '.';
        }
        console.log(output);
    }
}

var second = 0;
function advance(){
    var extremes = minMaxes();
    points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;
    });
    second ++;
    if (Math.abs(extremes.minX - extremes.maxX) < 100){
        print();
        return true;
    }
}
while(true){
    advance()
}


