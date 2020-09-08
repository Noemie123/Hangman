let lettre, mot, imgName, erreur = 0,
    motLong,
    notExists = true,
    finish = false,
    l = 0,
    w = 1,
    writtenLetter = [],
    lettresTab = [];

/*
//attempt at json
let mots = [
    { "id": 1, "word": "javascript", "text": "Javascript is also known as JS." },
    { "id": 2, "word": "js", "text": "Javascript is also known as JS." },
    { "id": 3, "word": "hello", "text": "Javascript is also known as JS." },
    { "id": 4, "word": "darkness", "text": "Javascript is also known as JS." },
    { "id": 5, "word": "my", "text": "Javascript is also known as JS." },
    { "id": 6, "word": "old", "text": "Javascript is also known as JS." },
    { "id": 7, "word": "friend", "text": "Javascript is also known as JS." },
    { "id": 8, "word": "I", "text": "Javascript is also known as JS." },
    { "id": 9, "word": "come", "text": "Javascript is also known as JS." },
    { "id": 10, "word": "to talk with you again", "text": "Javascript is also known as JS." },
];
*/

$(document).ready(function() {
    reInit();

    /*
    let x = pickWord(randomNb);
    let y = pickText(randomNb);
    console(x);
    console(y);
    */

});


$(document).on('keypress', function(evt) {
    if (evt.keyCode == 13) {
        wordValues();
        lettre = getValue()

        if (!checkWords(lettre)) {
            sentWrong();
        } else {
            $('#comments').html("");
            $('#lettersChosen').html('Letters already sent : ')
            for (let j = 0; j < lettresTab.length; j++) {
                if (lettresTab[j] == lettre) {
                    notExists = false;
                }
            }
            if (notExists) {
                lettresTab[l] = lettre;
                l++;
            }
            notExists = true;

            for (let i = 0; i < lettresTab.length; i++) {
                $('#lettersChosen').append('' + lettresTab[i] + '&nbsp;-&nbsp;');
            }



            let let1 = mot[0];
            let let2 = mot[1];
            let let3 = mot[2];
            let let4 = mot[3];
            let let5 = mot[4];

            if (!checkLettre(mot)) {
                erreur += 1;
                if (erreur === 1) {
                    $('#nbPendu').html('&nbsp;' + erreur + '&nbsp;mistake');
                } else {
                    $('#nbPendu').html('&nbsp;' + erreur + '&nbsp;mistakes');
                }
                errorDisplay();
                $('#text1').val('');
                if (erreur <= 12) {
                    imgName = "hangman" + erreur;
                    $('#imgDisplay').html('<img id="hangmanImg" src="libs/images/' + imgName + '.png" />');
                } else {
                    $('#imgDisplay').html("");
                }
            } else {
                goodDisplay();
                $('#text1').val('');
                if (lettre == letter[1]) {
                    $('#l1').html(lettre);
                }
                if (lettre == letter[2]) {
                    $('#l2').html(lettre);
                }
                if (lettre == letter[3]) {
                    $('#l3').html(lettre);
                }
                if (lettre == letter[4]) {
                    $('#l4').html(lettre);
                }
                if (lettre == letter[5]) {
                    $('#l5').html(lettre);
                }
                console.log(letter);
            }

            if (erreur == 12) {
                alert("YOU LOST !!!");
            }
            if (erreur >= 13) {
                $('#imgDisplay').html('<img id="keepcalm" src="libs/images/keepcalm.png"/>');
            }

            for (let v = 0; v < motLong; v++) {
                writtenLetter[v] = $('#l' + w + '').html();
                w++;
            }
            w = 1;

            for (let z = 0; z < motLong; z++) {
                if (writtenLetter[z] !== "_") {
                    finish = true;
                } else {
                    finish = false;
                    break;
                }
            }

            if (!finish) {
                console.log('pas tout trouvé !! FALSE');
            } else if (finish) {
                alert('BRAVO !!!')
            }

        }
    }
});

//function to initialize on refresh
function reInit() {
    let c = 1;
    let letter = [];
    $('#imgDisplay').html('<img id="logo" src="libs/images/intro.png"/>');
    let randomNb = Math.floor((Math.random() * 10) + 1);
    console.log(randomNb);
}

//function to get word value
function wordValues() {
    let c = 0;
    mot = $('#reponse').html();
    motLong = mot.length;
    for (let a = 0; a < motLong; a++) {
        $('#mot').append('<p id="l' + c + '">_</p><p class="esp"></p>');
        letter[a] = $('#l' + c + '').val();
        c++;
    }

    return letter;
}

//function to save value of sent input
function getValue() {
    lettre = $('#text1').val();
    return lettre;
}

//function to check only one character and only letters in input sent
function checkWords(letter) {
    let regex = /^[a-z]{1}$/;
    let bon = regex.test(letter);
    if (!bon) {
        return false;
    } else if (bon) {
        return true;
    }
}

//function to dispaly error message when what was went is not okay
function sentWrong() {
    $('#comments').html('Only one letter and only in lowercase');
    $('#text1').val('');
}

//function to check if letter sent is in the word
function checkLettre(m) {
    for (let b = 0; b < m.length; b++) {
        if (lettre == m[b]) {
            return true;
        }
    }
}

//function to display when letter sent is okay or not
function errorDisplay() {
    $('#errorMsg').fadeIn(10);
    $('#errorMsg').html("WRONG !");
    $('#errorMsg').fadeOut(900);
}

function goodDisplay() {
    $('#errorMsg').fadeIn(10);
    $('#errorMsg').html("<p style='color: green'>Right !<p>");
    $('#errorMsg').fadeOut(900);
}






/*

function pickWord(num) {
    for (let p = 0; p < mots.length; p++) {
        if (num == mots[p]['id']) {
            let pickedWord = mots[p]['word'];
            break;
        }
    }
    return pickedWord;
}

function pickText(num) {
    for (let p = 0; p < mots.length; p++) {
        if (num == mots[p]['id']) {
            let pickedText = mots[p]['text'];
            break;
        }
    }
    return pickedText;
}
*/