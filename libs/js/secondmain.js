$(document).ready(function() {
    reInit();

    //saving the word to find and displaying the right number of underscore
    wordToFind = $('#reponse').html();
    wordDefinition = "définition du mot";
    underscoreFinder(wordToFind);

    //saving each letter of the word to find in an array
    wordLetter = wordValues(wordToFind);

});

let lettersSentTab = [],
    errors = 0;

$(document).on('keypress', function(evt) {
    if (evt.keyCode == 13) {
        //saving the data sent after keypress and then emptying the input
        let userInput = $('#text1').val();
        $('#text1').val('');


        //checking the format of the data sent by user
        if (!inputFormatCheck(userInput)) {
            sentWrong();
        } else {
            $('#comments').html("");

            //displaying letter sent by user on the page (checking if already sent, if so then not displayed twice)
            notExists = true;
            $('#lettersChosen').html('Letters already sent : ')
            for (let j = 0; j < lettersSentTab.length; j++) {
                if (lettersSentTab[j] == userInput) {
                    notExists = false;
                }
            }
            if (notExists) {
                lettersSentTab.push(userInput);
            }

            for (let i = 0; i < lettersSentTab.length; i++) {
                $('#lettersChosen').append('' + lettersSentTab[i] + '&nbsp;-&nbsp;');
            }



            //displaying the letter sent by user if it has a match in the word (at the right place in the word) or not (if not, error adds up)
            let isMatch = checkMatch(userInput);

            if (!isMatch) {
                errors += 1;
                errorDisplay();
            } else {
                goodDisplay();
            }


            //displaying nb of errors
            if (errors === 1) {
                $('#nbPendu').html('&nbsp;' + errors + '&nbsp;mistake');
            } else {
                $('#nbPendu').html('&nbsp;' + errors + '&nbsp;mistakes');
            }



            //changing images regarding the nb of errors
            if (errors > 0 && errors < 12) {
                imgName = "hangman" + errors;
                $('#imgDisplay').html('<img id="hangmanImg" src="libs/images/' + imgName + '.png" />');
            }





            //displaying message if user lost
            if (errors == 12) {
                $('#imgDisplay').html('<img id="hangmanImg" src="libs/images/hangman12.png" />');
                $('#lostGame').html('YOU LOST');
                $('#keepTrying').html('But you can keep trying to guess !');
            }




            //check if word completely found
            let foundTable = lettersFound(wordToFind);
            let wordFinish = isWordFinish(foundTable);

            if (wordFinish) {
                $('#win').html("YOU WON !!!! Congratulations !");
                $('#lostGame').html("");
                $('#keepTrying').html("");
                $('#imgDisplay').html('<img id="congrats" src="libs/images/congrats.png" />');
                $('#wordFound').html('You found the word : <strong>' + wordToFind + '</strong>');
                $('#wordDef').html('<hr>' + wordDefinition);
            }



        }
    }
});

//initialisation
//function to reinitialise on every refresh
function reInit() {
    $('#imgDisplay').html('<img id="logo" src="libs/images/intro.png"/>');
    let randomNb = Math.floor((Math.random() * 10) + 1);
}

//function to display word to find underscores
function underscoreFinder(mot) {
    let indA = 1;
    let motLong = mot.length;
    for (let a = 0; a < motLong; a++) {
        $('#mot').append('<p id="l' + indA + '">_</p><p class="esp"></p>');
        indA++;
    }
}

//function to save the letters of the word that needs to be found in an array
function wordValues(mot) {
    let wordLetter = [];
    let motLong = mot.length;
    for (let b = 0; b < motLong; b++) {
        wordLetter[b] = mot[b];
    }
    return wordLetter;
}



//message to the user
//function to display error message
function errorDisplay() {
    $('#errorMsg').fadeIn(10);
    $('#errorMsg').html("WRONG !");
    $('#errorMsg').fadeOut(900);
}

//function to display success message
function goodDisplay() {
    $('#errorMsg').fadeIn(10);
    $('#errorMsg').html("<p style='color: green'>Right !<p>");
    $('#errorMsg').fadeOut(900);
}


//function to display error in format 
function sentWrong() {
    $('#comments').html('Only one letter and only in lowercase');

}





//on key press
//function to check if what user sent is only a letter
function inputFormatCheck(mot) {
    let regex = /^[a-z]{1}$/
    let check = regex.test(mot);
    return check;
}

//function to save the letters found by user (replacement of underscore) in an array
function lettersFound(mot) {
    let indC = 1;
    let foundTab = [];
    let motLong = mot.length;
    for (let c = 0; c < motLong; c++) {
        foundTab[c] = $('#l' + indC + '').html();
        indC++;
    }
    return foundTab;
}

//function to check if word completely found
function isWordFinish(wordTab) {
    let wordFinish = true;
    for (j = 0; j < wordTab.length; j++) {
        if (wordTab[j] == "_") {
            wordFinish = false;
            break;
        }
    }
    return wordFinish;
}

//function to check if data sent match a letter in the word
function checkMatch(letter) {
    let isMatch = false;
    let k = 0;
    for (l = 0; l < wordLetter.length; l++) {
        if (wordLetter[l] == letter) {
            k = l + 1;
            $('#l' + k + '').html(letter);
            isMatch = true;
            break;
        }
    }
    return isMatch;
}