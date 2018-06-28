var characters, gameState


function startGame () {

  characters = resetCharacters();
  gameState = resetGame();

  displayCharacters();
}

function resetCharacters () {
return characters = [
    {
        name: "Winston",
        image: "assets/images/winston.jpg",
        attack: 30,
        counterAttack: 25,
        health: 300
    },
    {
        name: "Reaper",
        image: "assets/images/reaper.jpg",
        attack: 20,
        counterAttack: 35,
        health: 200
    },
    {
        name: "Mercy",
        image: "assets/images/mercy.jpg",
        attack: 10,
        counterAttack: 15,
        health: 150
    },
    {
        name: "Reinhardt",
        image: "assets/images/reinhardt.jpg",
        attack: 15,
        counterAttack: 15,
        health: 400
    },
];
function resetGame () {
    return {
        selectedCharacter: null,
        selectedDefender: null,
        enemiesLeft: 0,
        numAttacks: 0
    }
}

function createCharacterDiv (character, key) {
    var characterDiv = $("<div class='character' data-name='" + key + "'>");
    var charName = $("<div class='characterName'>").text(characters.name);
    var charImage = $("<img alt='image' class='characterImage'>").attr('src', characters.image);
    var charHealth = $("<div class='healthPoints'>").text(characters.health);
    charDiv.append(charName).append(charImage).append(charHealth);
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