// DOM Elements

let gameArea = document.getElementById("game_area");
let moneyLabel = document.getElementById("money_label");
let killsLabel = document.getElementById("kills_label");

// Core Game Settings / Values
let gameManager = {

    StartingMoney: 500,
    Money: 500,
    Kills: 0,
    
    blueprintID: undefined,
    blueprintInUse: false,

    towerPlaceable: false,
    placeableArea: false,

    towerName: undefined,
    towerPrice: undefined,

}

// Constant loops
document.oncontextmenu = function() {return false;};
document.addEventListener('mousemove', moveBlueprint);
document.addEventListener('mousedown', placeTower);

// Universal Functions

function getMousePos(pos) {
    let posX = pos.clientX;
    let posY = pos.clientY;

    let posArray = {
        posX,
        posY
    };

    return posArray;
}

// Quality of Life Functions

function updateInfoBar() {
    moneyLabel.innerHTML = gameManager.Money;
    killsLabel.innerHTML = gameManager.Kills;
    setTimeout(updateInfoBar, 1000);
}

function changePlaceableArea(bool) {
    if (bool === true) {
        gameManager.placeableArea = true;
    } else {
        gameManager.placeableArea = false;
    }
}


// Blueprint Functions

function createBlueprint(towername, towerprice) { 
    
    gameManager.blueprintInUse = !gameManager.blueprintInUse;

    if (gameManager.blueprintInUse === true) {
        let blueprint = document.createElement("div");
        blueprint.className = "tower_blueprint";
        blueprint.id = "blueprint";

        document.body.appendChild(blueprint);
        gameManager.blueprintID = blueprint;

        gameManager.towerName = towername;
        gameManager.towerPrice = towerprice;

        gameManager.towerPlaceable = true;

    } else { 
        destroyBlueprint(gameManager.blueprintID) 
    }
}

function moveBlueprint(event) {
    if (gameManager.blueprintInUse === true) {
        let posArray = getMousePos(event);

        gameManager.blueprintID.style.left = posArray.posX - 50 + 'px';
        gameManager.blueprintID.style.top = posArray.posY - 50 + 'px';

        if (gameManager.placeableArea === false || gameManager.Money <= gameManager.towerPrice) {
            gameManager.blueprintID.style.backgroundColor = 'red';
        } else {
            gameManager.blueprintID.style.backgroundColor = 'blue';
        }
    }
}

function destroyBlueprint(blueprint) {
    document.body.removeChild(blueprint);
    gameManager.blueprintID = undefined;
    gameManager.towerPlaceable = false;
    gameManager.placeableArea = false;
    gameManager.towerName = undefined;
    gameManager.towerPrice = undefined;
}

// Tower Functions

function placeTower(event) {
    if (gameManager.towerPlaceable === true && gameManager.placeableArea === true && gameManager.Money >= gameManager.towerPrice) {
        let position = getMousePos(event);

        let tower = document.createElement("div");
        tower.className = "tower";
        tower.id = "tower_" + gameManager.towerName;

        tower.style.left = position.posX - 50 + 'px';
        tower.style.top = position.posY - 50 + 'px';

        document.body.appendChild(tower);

        gameManager.Money -= gameManager.towerPrice;

        gameManager.blueprintInUse = false;
        destroyBlueprint(gameManager.blueprintID);
    }
}