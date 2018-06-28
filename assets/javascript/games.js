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
    console.log("first line of displayCharacters");
    var keys = Object.keys(characters);
    console.log("before the for loop");
    for (var i = 0; i < keys.length; i++) {
        console.log("in the loop");
        var characterKeys = keys[i];
        console.log("first line of loop");
        var character = characters[characterKeys];
        console.log("second line of loop");
        var characterDiv = createCharacterDiv(character, characterKeys);
        console.log("third line of loop");
        $("#chooseCharacter").append(characterDiv);
        console.log("last line of loop");
    }
}

function changeToOpponent (selectedCharacterKey) {
    var characterKeys = Object.keys(characters);
    for (var i = 0; i < charactersKeys.length; i++) {
        if (characterKeys[i] !== selectedCharacterKey) {
            var opponentKey = characterKeys[i];
            var opponent = characters[opponentKey];
            var opponentDiv = createCharacterDiv(opponent, oppenentKey);
            $(opponentDiv).addClass("enemy");
            $("#enemiesAvailable").append(opponentDiv);
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

        $("#characterHolder").append(this);

        changeToOpponent(selectedKey);
        $("#chooseCharacter").hide();

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

