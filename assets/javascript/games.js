//to do, add stage selection? - add images and augio to it
//$('html').css('background-image', 'url(this.image)');

// need to make map select function
// add battle sounds
// add character sounds 


// var backgrounds = {
//     "Temple of Anubis": {
//         name: "Temple of Anubis",
//         image: "../images/temple-of-anubis.jpg",
//         audio: "assets/audio/temple-of-anubis.ogg"
//     },
//     "Eichenwalde": {
//         name: "Eichenwalde",
//         image: "../images/eichenwalde.jpg",
//         audio: "assets/audio/eichenwalde.ogg"
//     },
//     "Hanamura": {
//         name: "Hanamura",
//         image: "../images/hanamura.jpg",
//         audio: "assets/audio/hanamura.ogg"
//     },
//     "Hollywood": {
//         name: "Hollywood",
//         image: "../images/hollywood.jpg",
//         audio: "assets/audio/hollywood.ogg"
//     },
//     "Volskaya Industries": {
//         name: "Volskaya Industries",
//         image: "../images/volskaya-industries.jpg",
//         audio: "assets/audio/volskaya-industries.ogg"
//     },
//     "King's Row": {
//         name: "King's Row",
//         image: "../images/kings-row.jpg",
//         audio: "assets/audio/kings-row.ogg"
//     },
//     "Route 66": {
//         name: "Route 66",
//         image: "../images/route-66.jpg",
//         audio: "assets/audio/route-66.ogg"
//     },
//     "Dorado": {
//         name: "Dorado",
//         image: "../images/dorado.jpg",
//         audio: "assets/audio/dorado.ogg"
//     },
// }


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
        //image: "assets/images/winston-render.png",
       // audio: "assets/audio/",
        attack: 30,
        counterAttack: 25,
        health: 300
    },
    "Reaper": {
        name: "Reaper",
        image: "assets/images/reaper.jpg",
        // image: "assets/images/reaper-render.png",
        // audio: "assets/audio/",
        attack: 20,
        counterAttack: 35,
        health: 200
    },
    "Mercy":{
        name: "Mercy",
        image: "assets/images/mercy.jpg",
        // image: "assets/images/mercy-render.png",
        // audio: "assets/audio/",
        attack: 10,
        counterAttack: 15,
        health: 150
    },
    "Reinhardt": {
        name: "Reinhardt",
        image: "assets/images/reinhardt.jpg",
        // image: "assets/images/reinhardt-render.png",
        // audio: "assets/audio/",
        attack: 15,
        counterAttack: 15,
        health: 400
    },
    // "Pharah": {
    //     name: "Pharah",
        // image: "assets/images/pharah-render.png",
        // audio: "assets/audio/",
    //     attack: 20,
    //     counterAttack: 30,
    //     health: 200
    // },
    // "Soldier 76": {
    //     name: "Soldier 76",
    //     image: "assets/images/soldier76-render.png",
        // audio: "assets/audio/",
    //     attack: 15,
    //     counterAttack: 25,
    //     health: 200
    // },
    // "McCree": {
    //     name: "McCree",
    //     image: "assets/images/mccree-render.png",
        // audio: "assets/audio/",
    //     attack: 30,
    //     counterAttack: 30,
    //     health: 200
    // },
    // "Zenyatta": {
    //     name: "Zenyatta",
    //     image: "assets/images/zenyatta-render.png",
        // audio: "assets/audio/",
    //     attack: 15,
    //     counterAttack: 15,
    //     health: 150
    // },
    // "Widowmaker": {
    //     name: "Widowmaker",
    //     image: "assets/images/widowmaker-render.png",
        // audio: "assets/audio/",
    //     attack: 15,
    //     counterAttack: 15,
    //     health: 400
    // },
    // "Roadhog": {
    //     name: "Roadhog",
    //     image: "assets/images/roadhog-render.png",
        // audio: "assets/audio/",
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

//background function
// need to hide the character divs (might happen lower down in code)
// need to append images 
// need to make them clickable
// need to make it change background on click 
// need to hide this section on click
//need to make character div show again (might happen lower down in code)

function createCharacterDiv (characters, key) {
    var characterDiv = $("<div class='character' data-name='" + key + "'>");
    var characterName = $("<div class='characterName'>").text(characters.name);
    var characterImage = $("<img alt='image' class='characterImage'>").attr('src', characters.image);
    var characterHealth = $("<div class='healthPoints'>").text(characters.health);
    characterDiv.append(characterName).append(characterImage).append(characterHealth);
    return characterDiv;
  }

function displayCharacters() {
    var keys = Object.keys(characters);
    for (var i = 0; i < keys.length; i++) {
        var characterKeys = keys[i];
        var character = characters[characterKeys];
        var characterDiv = createCharacterDiv(character, characterKeys);
        $("#chooseCharacter").append(characterDiv);
    }
}

function changeToOpponent (selectedCharacterKey) {
    var characterKeys = Object.keys(characters);
    for (var i = 0; i < characterKeys.length; i++) {
        if (characterKeys[i] !== selectedCharacterKey) {
            var opponentKey = characterKeys[i];
            var opponent = characters[opponentKey];
            var opponentDiv = createCharacterDiv(opponent, opponentKey);
            $(opponentDiv).addClass("enemy");
            $("#enemiesAvailable").append(opponentDiv);
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
    alert(gameState.selectedOpponent.name + " pwned you n00b. Click the reset button to show them who's boss next time.");
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
    $("#enemiesAvailable").empty();
    $("#chooseCharacter").empty().show();
    $("#characters").show();
    //need to edit to show background choices
}

$(document).ready(function() {
// map select first?
    $("#chooseCharacter").on("click", ".character", function() {
        var selectedKey = $(this).attr("data-name");
        gameState.selectedCharacter = characters[selectedKey];
        $("#characterHolder").append(this);

         changeToOpponent(selectedKey);
        $("#characters").hide();
        $("#chooseCharacter").hide();

        gameState.opponentsLeft = Object.keys(characters).length -1;
        selectOpponent()

        //map select here?
    })

    $("#attack").on("click.attack", function(){
        gameState.numAtks++
        attack(gameState.numAtks);
        defend();
// add combat text here?
        $("#characterHolder .healthPoints").text(gameState.selectedCharacter.health);
        $("#defender .healthPoints").text(gameState.selectedOpponent.health);
// add combat text here?
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

