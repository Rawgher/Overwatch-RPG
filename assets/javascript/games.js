var characters, gameState


function startGame () {

  characters = resetCharacters();
  gameState = resetGame();

  displayCharacters();
}
// startGame works

function resetCharacters () {
return  {
    "Winston": {
        name: "Winston",
        image: "assets/images/winston.jpg",
        attack: 30,
        counterAttack: 25,
        health: 300
    },
    "Reaper": {
        name: "Reaper",
        image: "assets/images/reaper.jpg",
        attack: 20,
        counterAttack: 35,
        health: 200
    },
    "Mercy":{
        name: "Mercy",
        image: "assets/images/mercy.jpg",
        attack: 10,
        counterAttack: 15,
        health: 150
    },
    "Reinhardt": {
        name: "Reinhardt",
        image: "assets/images/reinhardt.jpg",
        attack: 15,
        counterAttack: 15,
        health: 400
    },
    // "Pharah": {
    //     name: "Pharah",
    //     image: "assets/images/pharah-render.png",
    //     attack: 15,
    //     counterAttack: 15,
    //     health: 400
    // },
    // "Soldier 76": {
    //     name: "Soldier 76",
    //     image: "assets/images/soldier76-render.png",
    //     attack: 15,
    //     counterAttack: 15,
    //     health: 400
    // },
    // "McCree": {
    //     name: "McCree",
    //     image: "assets/images/mccree-render.png",
    //     attack: 15,
    //     counterAttack: 15,
    //     health: 400
    // },
    // "Zenyatta": {
    //     name: "Zenyatta",
    //     image: "assets/images/zenyatta-render.png",
    //     attack: 15,
    //     counterAttack: 15,
    //     health: 400
    // },
    // "Zenyatta": {
    //     name: "Zenyatta",
    //     image: "assets/images/zenyatta-render.png",
    //     attack: 15,
    //     counterAttack: 15,
    //     health: 400
    // },
    // "Widowmaker": {
    //     name: "Widowmaker",
    //     image: "assets/images/widowmaker-render.png",
    //     attack: 15,
    //     counterAttack: 15,
    //     health: 400
    // },
    // "Roadhog": {
    //     name: "Roadhog",
    //     image: "assets/images/roadhog-render.png",
    //     attack: 15,
    //     counterAttack: 15,
    //     health: 400
    // },
};
};

function resetGame () {
    return {
        selectedCharacter: null,
        selectedOpponent: null,
        opponentsLeft: 0,
        numAtks: 0
    }
}

function createCharacterDiv (characters, key) {
    var characterDiv = $("<div class='character' data-name='" + key + "'>");
    var characterName = $("<div class='characterName'>").text(characters.name);
    var characterImage = $("<img alt='image' class='characterImage'>").attr('src', characters.image);
    var characterHealth = $("<div class='healthPoints'>").text(characters.health);
    characterDiv.append(characterName).append(characterImage).append(characterHealth);
    return characterDiv;
  }

function displayCharacters() {
    //working
    var keys = Object.keys(characters);
    //working
    for (var i = 0; i < keys.length; i++) {
         //working
        var characterKeys = keys[i];
         //working
        var character = characters[characterKeys];
         //working
        var characterDiv = createCharacterDiv(character, characterKeys);
        //working
        $("#chooseCharacter").append(characterDiv);
        //working
    }
}

function changeToOpponent (selectedCharacterKey) {
    var characterKeys = Object.keys(characters);
     //working
    for (var i = 0; i < characterKeys.length; i++) {
        //working
        if (characterKeys[i] !== selectedCharacterKey) {
            //working
            var opponentKey = characterKeys[i];
            //working
            var opponent = characters[opponentKey];
            //working
            var opponentDiv = createCharacterDiv(opponent, opponentKey);
            //working
            $(opponentDiv).addClass("enemy");
 //working
            $("#enemiesAvailable").append(opponentDiv);
             //working
        }
    }
}

function selectOpponent () {
    $(".enemy").on("click.opponentSelect", function () {
        var enemyKey = $(this).attr("data-name");
        gameState.selectedOpponent = characters[enemyKey];
        $("#defender").append(this);
        $("#attack").removeClass(".hidden").show();
        $(".enemy").off("click.opponentSelect");
    });
}

function attack(numAtks) {
    gameState.selectedOpponent.health -= gameState.selectedCharacter.attack * numAtks;
}

function defend() {
    gameState.selectedCharacter.health -= gameState.selectedOpponent.counterAttack;
}

function didIDie(character) {
    return character.health <= 0;
}

function didIWin() {
    return gameState.opponentsLeft === 0;
}

function isBattleOver() {
if (didIDie(gameState.selectedCharacter)) {
    alert(gameState.selectedOpponent.name + "pwned you n00b. Click the reset button to show them who's boss next time.");
    $("#characterHolder").empty();
    $("#reset").removeClass(".hidden").show();

    return true;
} else if (didIDie(gameState.selectedOpponent)) {
    gameState.opponentsLeft--
    $("#defender").empty();

    if (didIWin()) {
        alert("You win! Hit the reset button to play again!");
        $("#reset").removeClass(".hidden").show();
    } else {
        alert("You beat " + gameState.selectedOpponent.name + "! Choose a new opponent!");
        selectOpponent();
    }
    return true;
}
return false;
}

function emptyAllDivs() {
    $("#characterHolder").empty();
    $("#defender").empty();
    $("#enemiesAvailable .enemy").empty();
    $("#chooseCharacter").empty().show();
    $("#characters").show();
}

$(document).ready(function() {

    $("#chooseCharacter").on("click", ".character", function() {


        var selectedKey = $(this).attr("data-name");
        gameState.selectedCharacter = characters[selectedKey];
        $("#characterHolder").append(this);


        changeToOpponent(selectedKey);
        $("#characters").hide();
        $("#chooseCharacter").hide();

        gameState.opponentsLeft = Object.keys(characters).length -1;
        selectOpponent()
    })

    $("#attack").on("click.attack", function(){
        gameState.numAtks++
        attack(gameState.numAtks);
        defend();

        $("#characterHolder .healthPoints").text(gameState.selectedCharacter.health);
        $("#defender .healthPoints").text(gameState.selectedOpponent.health);

        if (isBattleOver()) {
            $(this).hide();
        }
    })

    $("#reset").on("click.reset", function (){
        emptyAllDivs();
        $(this).hide();
        startGame();
    })

    startGame();
});

