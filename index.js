const MyMap = function(){

    const map = [];
    let mapSize = 0;

    const makeObj = function(){
        const obj = {
            type: 'bush',
            developed: false
        }
        return obj;
    }

    const initMap = function(size = 25){
        mapSize = size;
        for(let i = 0; i < mapSize; i++){
            const arr = Array.from({length: mapSize}, () => makeObj());
            map.push(arr);
        }
    }

    const changeState = function(x, y){
        const isRightRange = checkRange(x, y);
        if(isRightRange){
            map[x][y].developed = true;
            return true;
        }
        else{
            return false;
        }
    }

    const checkRange = function(x, y){
        let isInRange = false;
        if((x >= 0) && (x < mapSize) && (y >= 0) && (y < mapSize)){
            console.log('right range');
            isInRange = true;
        }
        else{
            console.log('wrong range');
        }
        return isInRange;
    }

    const getMapText = function(myLocation){
        const {x, y} = myLocation;
        let mapText = ""
        for(let i=mapSize-1; i>=0; i--){
            let line = ""
            for(let j=0; j<mapSize; j++){
                if((x == j) && (y == i)){
                    line += "A";
                }
                else{
                    if(map[j][i].developed){
                        line += "#";
                    }
                    else{
                        line += ".";
                    }
                }
            }
            mapText = mapText + line + "\n";
        }
        return mapText;
    }

    const getMapConsole = function(){
        console.log(map);
    }

    return {initMap, changeState, getMapText, getMapConsole};
}


const gameControl = function(htmlMap){

    const map = htmlMap;
    let myLocation = {x:undefined, y:undefined};
    const game = MyMap();

    const initGame = function(size){
        game.initMap(size);
        myLocation["x"] = parseInt(size/2);
        myLocation["y"] = parseInt(size/2);
        game.changeState(myLocation["x"], myLocation["y"]);
        map.innerText = updateMapText(myLocation);
    }

    const moveStep = function(moveX, moveY){
        const isChanged = game.changeState(moveX, moveY);
        if(isChanged){
            myLocation["x"] = moveX;
            myLocation["y"] = moveY;
        }
        map.innerText = updateMapText(myLocation);
        console.log(getLocation());
    }

    const updateMapText = function(){
        return game.getMapText(myLocation);
    }

    const up = function(){
        const {x, y} = myLocation;
        moveStep(x, y+1);
    }

    const down = function(){
        const {x, y} = myLocation;
        moveStep(x, y-1);
    }

    const left = function(){
        const {x, y} = myLocation;
        moveStep(x-1, y);
    }

    const right = function(){
        const {x, y} = myLocation;
        moveStep(x+1, y);
    }

    const getLocation = function(){
        return myLocation;
    }

    return {initGame, updateMapText, up, down, left, right, getLocation};
}




const map = document.getElementById('map');
const game = gameControl(map);
game.initGame(11);