var input = require('./input').input.map((coord, id) => ({ x: coord[0], y: coord[1], id: String.fromCharCode(id + 97) }));

var points = input.reduce((accum, coord) => { accum[coord.x + ',' + coord.y] = coord.id; return accum; }, {});

var getDistance = (coord1, coord2) => Math.abs(coord1.x - coord2.x) + Math.abs(coord1.y - coord2.y);
var getOrdered = (currentCoordinate) => {
    return input
        .filter(coordinate => points[currentCoordinate.x + ',' + currentCoordinate.y] !== coordinate.id)
        .map(coordinate => {
            return { ...coordinate, distance: getDistance(coordinate, currentCoordinate) }
        })
        .sort((a, b) => {
            return a.distance - b.distance;
        });
};

var infinite = {};
var areas = {};
var max = 400;
var incrementClosest = (coord) => {
    var ordered = getOrdered(coord)  
    
    var coordIsAPoint = points[coord.x + ',' + coord.y];
    if (coordIsAPoint){
        areas[coord.x + ',' + coord.y] = (areas[coord.x + ',' + coord.y] || 0) + 1; 
        if (coord.x === 0 || coord.x === max || coord.y === 0 || coord.y === max){
            infinite[coord.x + ',' + coord.y] = true;
        }
        return coordIsAPoint;
    }

    if (ordered[0].distance !== ordered[1].distance){
        areas[ordered[0].x + ',' + ordered[0].y] = (areas[ordered[0].x + ',' + ordered[0].y] || 0) + 1; 
        if (coord.x === 0 || coord.x === max || coord.y === 0 || coord.y === max){
            infinite[ordered[0].x + ',' + ordered[0].y] = true;
        }
        return ordered[0].id;
    } else {
        return '.';   
    }
}

for (var y = 0; y <= max; y++){
    var row = '';
    for (var x = 0; x <= max; x++){
        var id = incrementClosest({ x, y })
        row += points[x + ',' + y] === id ? id.toUpperCase() : id;
    }
    console.log(row);
}

console.log(JSON.stringify(areas));
var maxAreaKey = Object.keys(areas)
    .filter(key => !infinite[key])
    .sort((a,b) => {
        return areas[b] - areas[a];
    })[0]

console.log('max area point is ' + maxAreaKey + ' id: ' + points[maxAreaKey] + ' with an area of ' + areas[maxAreaKey]);