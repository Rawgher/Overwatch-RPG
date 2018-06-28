var characters, gameState


function startGame () {

  characters = resetCharacters();
  gameState = resetGame();

  displayCharacters();
}

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
        numAttacks: 0
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
    var keys = Object.keys(characters)
    for (var i = 0; i < keys.length; i++) {
        var characterArray = keys[i];
        var characters = characters[characterArray];
        var characterDiv = createCharacterDiv(character, key);
        $("#characterHolder").append(characterDiv);
    }
}

function changeToOpponent (selectedCharacterKey) {
    var characterKeys = Object.keys(characters);
    for (var i = 0; i <charactersKeys.length; i++) {
        if (characterKeys !== selectedCharacterKey) {
            var opponentKey = characterKeys[i];
            var opponent = characters[opponentKey];
            var opponentDiv = createCharacterDiv(opponent, oppenentKey);
            //$(opponentDiv).addClass(); need to put classes that I will add to opponents here
            $("#enemiesAvailable").append(opponentDiv);
        }
    }
}

function selectOpponent () {
    //reference class chosen above here
    $(".see above").on("click.opponentSelect", function (){
        var enemyKey = $(this).attr("data-name");
        gameState.selectedOpponent = characters[enemyKey];

        $("#defender").append(this);
        $("#attack").show();
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

function areBattlesOver() {

}
// append characters into html (characters class)
// classes are img, healthPoints, characterName
//change class on click of character
//send other three characters to enemy character section (enemiesAvailable id)
//change class or id of enemy chosen to move to defender zone (defender id)
//set up fight (attack button)
    // needs to subtract attack from characters hp
    // needs to have main characters attack go up each time
    // need to make character disappear when they die or go back up and put an x on them?
    // need to set reset button on completion of game (remove hidden class)
    // need to set lose alert
    //need to set win alert