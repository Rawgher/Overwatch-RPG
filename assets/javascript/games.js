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
};
};

function resetGame () {
    return {
        selectedCharacter: null,
        selectedOpponent: null,
        enemiesLeft: 0,
        numAtks: 0
    }
}

function createCharacterDiv (character, key) {
    var characterDiv = $("<div class='character' data-name='" + key + "'>");
    var characterName = $("<div class='characterName'>").text(character.name);
    var characterImage = $("<img alt='image' class='characterImage'>").attr('src', character.image);
    var characterHealth = $("<div class='healthPoints'>").text(character.health);
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
    console.log("is this running?"); //working
    for (var i = 0; i < characterKeys.length; i++) {
        console.log("this is after the for loop"); //working
        if (characterKeys[i] !== selectedCharacterKey) {
            console.log("after the if statement"); //working
            var opponentKey = characterKeys[i];
            console.log("first var of if statement"); //working
            var opponent = characters[opponentKey];
            console.log("second var of if statement"); //working
            var opponentDiv = createCharacterDiv(opponent, opponentKey);
            console.log("third var of if statement"); //working
            $(opponentDiv).addClass("enemy");
            console.log("adding enemy class"); //working
            $("#enemiesAvailable").append(opponentDiv);
            console.log("appending to enemies div"); //working
        }
    }
}

function selectOpponent () {
    $(".enemy").on("click.opponentSelect", function (){
        var enemyKey = $(this).attr("data-name");
        gameState.selectedOpponent = characters[enemyKey];

        $("#defender").append(this);
        $("#attack").removeClass(".hidden");
        $(".see above").off("click.opponentSelect");
    })
}

function attack(numAtks) {
    gameState.selectedOpponent.health -= gameState.selectedCharacter.attack * numAtks
}

function defend() {
    gameState.selectedCharacter.health -= gameState.selectedOpponent.counterAttack;
}

function didIDie() {
    return character.health <= 0;
}

function didIWin() {
    return gameState.opponentsLeft === 0;
}

function isBattleOver() {
if (didIDie(gameState.selectedCharacter)) {
    alert(gameState.selectedOpponent.name + "pwned you n00b. Click the reset button to show them who's boss next time.");
    $("#characterHolder").empty();
    $("#reset").show();

    return true;
} else if (didIDie(gameState.selectedOpponent)) {
    gameState.enemiesLeft--
    $("#defender").empty();

    if (didIWin()) {
        alert("You win! Hit the reset button to play again!");
        $("#reset").show();
    } else {
        alert(gameState.selectedOpponent.name + "pwned you n00b. Click the reset button to show them who's boss next time.");
        selectOpponent();
    }
    return true;
}
return false;
}

function emptyAllDivs() {
    $("#characterHolder").empty();
    $("#enemiesAvailable").empty();
    $("#defender").empty();
    $("#chooseCharacter").show();
}

$(document).ready(function() {
    console.log("is the first thing happening?");
    $("#chooseCharacter").on("click", ".character", function() {
        console.log("what is this?");
        console.log(this);

        var selectedKey = $(this).attr("data-name");
        console.log("what is this 2?");
        console.log(this);
        gameState.selectedCharacter = characters[selectedKey];
        console.log("whats going on - setting game state of characters selected key");
        $("#characterHolder").append(this);
        console.log("what is this?");
        console.log(this);

        changeToOpponent(selectedKey);
        console.log("is this happening change to opponent");
        $(".character-select").hide();
        $("#chooseCharacter").hide();
        console.log("is choosecharacter being hidden");

        gameState.enemiesLeft = Object.keys(characters).length -1;
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

