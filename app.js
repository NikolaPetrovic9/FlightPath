AutocompliteLoad();
loadMap();



var optimalRoute = [];
var route ;
graph = {
    Moscow: {
        Beijing: getDistance("Moscow", "Beijing"),
        Kiev:  getDistance("Moscow", "Kiev"),
        Warsaw:  getDistance("Moscow", "Warsaw"),
        Helsinki: getDistance("Moscow", "Helsinki") //Finland
    },
    Kiev: {
        Istanbul: getDistance("Kiev", "Istanbul"),
        Beijing: getDistance("Kiev", "Beijing"),
        Belgrade: getDistance("Kiev", "Belgrade"),
        Moscow: getDistance("Kiev", "Moscow")
    },
    Helsinki: {
        Stockholm: getDistance("Helsinki", "Stockholm"), //Sweden
        Warsaw: getDistance("Helsinki", "Warsaw"),
        Moscow: getDistance("Helsinki", "Moscow")
    },
    Stockholm: {
        Warsaw: getDistance("Stockholm", "Warsaw"),
        Oslo: getDistance("Stockholm", "Oslo"),
        Helsinki: getDistance("Stockholm", "Helsinki")
    },
    Oslo: {
        Berlin: getDistance("Oslo", "Berlin"),
        London: getDistance("Oslo", "London"),
        Stockholm: getDistance("Oslo", "Stockholm")
    },
    Warsaw: {
        Stockholm: getDistance("Warsaw", "Stockholm"),
        Helsinki: getDistance("Warsaw", "Helsinki"),
        Moscow: getDistance("Warsaw", "Moscow"),
        Belgrade: getDistance("Warsaw", "Belgrade"),
        Torino: getDistance("Warsaw", "Torino"),
        Berlin: getDistance("Warsaw", "Berlin")
    },
    Berlin: {
        Oslo: getDistance("Berlin", "Oslo"), 
        Torino: getDistance("Berlin", "Torino"),
        London: getDistance("Berlin", "London"),
        Lyon: getDistance("Berlin", "Lyon"),
        Warsaw: getDistance("Berlin", "Warsaw")
    },
    Belgrade: {
        Istanbul: getDistance("Belgrade", "Istanbul"),
        Kiev: getDistance("Belgrade", "Kiev"),
        Torino: getDistance("Belgrade", "Torino"),
        Warsaw: getDistance("Belgrade", "Warsaw")
    },
    Torino: {
        Berlin: getDistance("Torino", "Berlin"),
        Warsaw: getDistance("Torino", "Warsaw"),
        Valencia: getDistance("Torino", "Valencia"),
        Belgrade: getDistance("Torino", "Belgrade")
    },
    London: {
        Ottawa: getDistance("London", "Ottawa"),
        Oslo: getDistance("London", "Oslo"),
        Lyon: getDistance("London", "Lyon"),
        Berlin: getDistance("London", "Berlin")
    },
    Lyon: {
        Berlin: getDistance("Lyon", "Berlin"),
        London: getDistance("Lyon", "London"),
        Valencia: getDistance("Lyon", "Valencia")
    },
    Valencia: {
        Ottawa: getDistance("Valencia", "Ottawa"),
        Washington: getDistance("Valencia","Washington"),
        Brasilia: getDistance("Valencia", "Brasilia"),
        Lyon: 820,
        Torino: getDistance("Valencia","Torino")
    },
    Tokyo: {
        Karaganda: getDistance("Tokyo","Karaganda"), //Kazahstan
        Beijing:  getDistance("Tokyo","Beijing"),
        Jakarta: getDistance("Tokyo", "Jakarta")     //Indonesia
    },
    Beijing: {
        Kiev: getDistance("Beijing", "Kiev"),
        Moscow: getDistance("Beijing", "Moscow"),
        Delhi: getDistance("Beijing", "Delhi"),
        Islamabad: getDistance("Beijing", "Islamabad"), //Pakistan
        Tokyo: getDistance("Beijing", "Tokyo"),
        Karaganda: getDistance("Beijing", "Karaganda")
    },
    Karaganda: {
        Tehran: getDistance("Karaganda", "Tehran"), //Iran
        Istanbul: getDistance("Karaganda", "Istanbul"),
        Beijing: getDistance("Karaganda","Beijing"),
        Tokyo: getDistance("Karaganda", "Tokyo")
    },
    Delhi: {
        Beijing: getDistance("Delhi", "Beijing"),
        Jakarta: getDistance("Delhi", "Jakarta"),
        Islamabad: getDistance("Delhi", "Islamabad")
    },
    Islamabad: {
        Tehran: getDistance("Islamabad", "Tehran"),
        Delhi: getDistance("Islamabad", "Delhi")
    },
    Tehran: {
        Islamabad: getDistance("Tehran", "Islamabad"),
        Istanbul: getDistance("Tehran", "Istanbul"),
        Karaganda: getDistance("Tehran", "Karaganda")
    },
    Istanbul: {
        Belgrade: getDistance("Istanbul", "Belgrade"),
        Kiev: getDistance("Istanbul", "Kiev"),
        Tehran: getDistance("Istanbul", "Tehran"),
        Karaganda: getDistance("Istanbul", "Karaganda")
    },
    Jakarta: {
        Delhi: getDistance("Jakarta", "Delhi"),
        Tokyo: getDistance("Jakarta", "Tokyo")
    },
    Ottawa: {
        London: getDistance("Ottawa", "London"),
        Valencia: getDistance("Ottawa", "Valencia"),
        Washington: getDistance("Ottawa", "Washington"),
    },
    Washington: {
        Valencia: getDistance("Washington", "Valencia"),
        MexicoCity: getDistance("Washington", "MexicoCity"),
        Havana: getDistance("Washington", "Havana"),
        Ottawa: getDistance("Washington", "Ottawa")
    },
    MexicoCity: {
        Havana: getDistance("MexicoCity", "Havana"),
        Bogota: getDistance("MexicoCity", "Bogota"), //Columbia
        Washington: getDistance("MexicoCity", "Washington")
    },
    Havana:{
        Bogota: getDistance("Havana", "Bogota"),
        Caracas: getDistance("Havana", "Caracas"), //Venezuela
        Washington: getDistance("Havana", "Washington"),
        MexicoCity: getDistance("Havana", "MexicoCity")
    },
    Bogota: {
        Lima: getDistance("Bogota", "Lima"),  //Peru
        Caracas: getDistance("Bogota", "Caracas"),
        MexicoCity: getDistance("Bogota", "MexicoCity"),
        Havana: getDistance("Bogota", "Havana")
    },
    Caracas: {
        Brasilia: getDistance("Caracas", "Brasilia"),
        Bogota: getDistance("Caracas", "Bogota"),
        Havana: getDistance("Caracas", "Havana")
    },
    Lima: {
        Brasilia: getDistance("Lima", "Brasilia"),
        BuenosAires: getDistance("Lima", "BuenosAires"),
        Bogota: getDistance("Lima", "Bogota")
    },
    Brasilia: {
        Valencia: getDistance("Brasilia", "Valencia"),
        BuenosAires: getDistance("Brasilia", "BuenosAires"),
        Lima: getDistance("Brasilia", "Lima"),
        Caracas: getDistance("Brasilia", "Caracas")
    },
    BuenosAires: {
        Lima: getDistance("BuenosAires", "Lima"),
        Brasilia: getDistance("BuenosAires", "Brasilia")
    }
}

//load arbitrary location on map just to be displayed before any action
function loadMap(){
    var provider = new com.modestmaps.TemplatedLayer('http://tile.openstreetmap.org/{Z}/{X}/{Y}.png');
    var map = new com.modestmaps.Map('map', provider);
    map.setCenterZoom(new MM.Location(37.811530, -122.2666097), 2);
    return map
}
//return distance betwen two airports
function getDistance(location1,location2){
    var i = search(location1)
    var j = search(location2)
    return calcDistance(d[i].Latitude, d[i].Longitude, d[j].Latitude, d[j].Longitude)
}

/*search specific location in DijkstraAirports.js*/
function search(location){
    for (var i = 0; i < d.length; i++) {
        if(d[i].City === location){
            return i;
        } 
    }
}
//Calculate distance betwen two given locations(latitude, longitude)
function calcDistance(lat1, lon1, lat2, lon2){
    var l1 = new MM.Location(lat1, lon1)
    var l2 = new MM.Location(lat2, lon2)
    return MM.Location.distance(l1, l2, 6371)
};
function displayHtml(){
    var string = "";
    var fullDistance = 0;
    for (var i = 0; i < route.length-1; i++) {
        if(i == 4){
            string += "\n"
        }
        string += route[i+1] + "->";
        
        fullDistance += getDistance(route[i],route[i+1])
    }    
    string = string.slice(0, -2)
    document.getElementById('t1').textContent = string;
    document.getElementById('t2').textContent = Math.round(fullDistance) + " km";
    var averageSpeedOfPlane = 1000;
    document.getElementById('t3').textContent = Math.round(fullDistance/averageSpeedOfPlane) + " h";

}
//Dijksta Algoritm
function log(message) {
    const logging = false;
    if (logging) { }
}

const lowestCostNode = (costs, processed) => {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
};

// function that returns the minimum cost and path to reach Finish
const dijkstra = (graph, startNodeName, endNodeName) => {

    // track the lowest cost to reach each node
    let costs = {};
    costs[endNodeName] = "Infinity";
    costs = Object.assign(costs, graph[startNodeName]);

    // track paths
    const parents = {
        endNodeName: null
    };
    for (let child in graph[startNodeName]) {
        parents[child] = startNodeName;
    }

    // track nodes that have already been processed
    const processed = [];

    let node = lowestCostNode(costs, processed);

    while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let n in children) {
            if (String(n) === String(startNodeName)) {
                log("WE DON'T GO BACK TO START");
            } else {
                log("StartNodeName: " + startNodeName);
                log("Evaluating cost to node " + n + " (looking from node " + node + ")");
                log("Last Cost: " + costs[n]);
                let newCost = cost + children[n];
                log("New Cost: " + newCost);
                if (!costs[n] || costs[n] > newCost) {
                    costs[n] = newCost;
                    parents[n] = node;
                    log("Updated cost und parents");
                } else {
                    log("A shorter path already exists");
                }
            }
        }
        processed.push(node);
        node = lowestCostNode(costs, processed);
    }

    let optimalPath = [endNodeName];
    let parent = parents[endNodeName];
    while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
    }
    optimalPath.reverse();

    const results = {
        distance: costs[endNodeName],
        path: optimalPath
    };

    return results;
};


//Autocomplite for names of airports from file "LocationsDijksta.js"
function AutocompliteLoad() {
    var start = document.getElementById("start");
    var end = document.getElementById("end");

    new Awesomplete(start, {
        list: locationsAutocomplete
    });
    new Awesomplete(end, {
        list: locationsAutocomplete
    });

}
//find optimal path 
function dijsktraLoad() {
    var start_city = document.getElementById("start").value;
    var end_city = document.getElementById("end").value;

    //dijstra is initilazied to find best route based on givn graph
    var path = dijkstra(graph, start_city, end_city);
    //varibale used to display route in html
    route = path["path"];

    //pronalazimo svaku pojedinu lokaciju aerodroma koju je dajkstrin algoritam nasao.
    for (var i = 0; i < path["path"].length; i++) {
        searchAirports(path["path"][i]);
    }
}

//find airports that dikstra alg. found that are best route, and put them in "optimalRoute"
function searchAirports(city) {
    var index = search(city)
    optimalRoute.push([d[index].Latitude, d[index].Longitude])
}


//generate coordinates, on which will be constructed arc between every two cities.
function GenerateArcCoordiantes() {
    var locations = [];
    for (var i = 0; i < optimalRoute.length - 1; i++) {

        var firstCoordinate = new com.modestmaps.Location(optimalRoute[i][0], optimalRoute[i][1]);
        var secondCoordinate = new com.modestmaps.Location(optimalRoute[i + 1][0], optimalRoute[i + 1][1]);

        for (var j = 0; j <= 100; j++) {
            var f = j / 100;
            locations.push(com.modestmaps.Location.interpolate(firstCoordinate, secondCoordinate, f));
        }
    }
    return locations
}

//draw arc based on coordinates
function arcDraw(arcCoordinates, map, canvas) {

    map.setExtent(arcCoordinates);
    var ctx = canvas.getContext('2d');
    function redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#404040';
        ctx.beginPath();
        var p = map.locationPoint(arcCoordinates[0]);
        ctx.moveTo(p.x, p.y);
        for (var i = 1; i < arcCoordinates.length; i++) {
            p = map.locationPoint(arcCoordinates[i]);
            ctx.lineTo(p.x, p.y);
        }

        ctx.stroke();
    }

    map.addCallback('drawn', redraw);
    map.addCallback('resized', function () {
        canvas.width = map.dimensions.x;
        canvas.height = map.dimensions.y;
        redraw();
    });

    redraw();

}

//function that is called after click on "submit" button, that initilize map.
function mapInitialization() {
    
    optimalRoute = [];
    dijsktraLoad();
    var map = loadMap();

    var canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.width = map.dimensions.x;
    canvas.height = map.dimensions.y;
    map.parent.appendChild(canvas);

    var arcCo = GenerateArcCoordiantes();
    arcDraw(arcCo, map, canvas);
    displayHtml();
   
    
}