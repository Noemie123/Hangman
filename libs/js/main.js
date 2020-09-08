$(document).ready(function() {
    reInit();

    //code to pick a word randomly from table
    //get a random nb from 0 to 80
    let randomNb = Math.floor((Math.random() * 80) + 1);


    //save word and its description
    let randomWord, randomText;
    for (h = 0; h < tableOfWords.length; h++) {
        if (tableOfWords[h]['id'] == randomNb) {
            randomWord = tableOfWords[h]['word'];
            randomText = tableOfWords[h]['text'];
            randomFrench = tableOfWords[h]['text2']
        }
    }



    //saving the word to find and displaying the right number of underscore
    wordToFind = randomWord;
    wordDefinition = randomText;
    wordFrench = randomFrench;

    //to load if responsive
    if ($(window).width() <= 1400) {
        underscoreFinderResp(wordToFind);
    } else {
        underscoreFinder(wordToFind);
    }


    //saving each letter of the word to find in an array
    wordLetter = wordValues(wordToFind);


});

let lettersSentTab = [],
    errors = 0;

//on enter key press
$(document).on('keypress', function(evt) {
    if (evt.keyCode == 13) {

        //saving the data sent after keypress and then emptying the input
        let userInput = $('#text1').val().toLowerCase();
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
            } else if (errors > 1) {
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
                $('#keepTrying').html('But you can keep guessing !');
            } else if (errors > 12) {
                $('#imgDisplay').html('<img id="keeptrying" src="libs/images/keepcalm.png" />');
            }




            //check if word completely found
            let foundTable = lettersFound(wordToFind);
            let wordFinish = isWordFinish(foundTable);

            if (wordFinish) {
                $('#lettersChosen').html("<h1>YOU WON !!!! Congratulations !</h1>");
                $('#keepTrying').html("");
                $('#imgDisplay').html('<img id="congrats" src="libs/images/congrats.png" />');
                $('#wordFound').html('You found the word : <strong>' + wordToFind + '</strong>');
                $('#wordDef').html('<hr><p class="definition">' + wordDefinition + '</p>');

                $('#wordDef').mouseenter(function() {
                    $('#wordDef').html('<hr><p class="definition">' + wordFrench + '</p>');
                });

                $('#wordDef').mouseleave(function() {
                    $('#wordDef').html('<hr><p class="definition">' + wordDefinition + '</p>');
                });

            }


            //display refresh button if error max or done
            if (wordFinish == true || errors >= 12) {
                $('#buttonDisplay').html('');
                $('#buttonDisplay').html('<button type="button" id="refreshBtn">Play again</button>');

                //button to refresh
                $('#refreshBtn').click(function() {
                    location.reload();
                });

            }

            if (wordFinish == true && errors >= 12) {
                $('#lettersChosen').html("<h1>You did great !</h1>");
            }


        }
    }
});




//on button click if responsive
$("#sendBtn").click(function() {

    //saving the data sent after keypress and then emptying the input
    let userInput = $('#text1').val().toLowerCase();
    $('#text1').val('');


    //checking the format of the data sent by user
    if (!inputFormatCheck(userInput)) {
        sentWrong();
    } else {
        $('#comments').html("");
        $('#lettersChosen').html(' ')
            //displaying letter sent by user on the page (checking if already sent, if so then not displayed twice)
        notExists = true;

        for (let j = 0; j < lettersSentTab.length; j++) {
            if (lettersSentTab[j] == userInput) {
                notExists = false;
            }
        }
        if (notExists) {
            lettersSentTab.push(userInput);
        }

        for (let i = 0; i < lettersSentTab.length; i++) {
            $('#lettersChosen').append('<p>' + lettersSentTab[i] + '&nbsp;-&nbsp;</p>');
        }



        //displaying the letter sent by user if it has a match in the word (at the right place in the word) or not (if not, error adds up)
        let isMatch = checkMatch(userInput);

        if (!isMatch) {
            errors += 1;
        }


        //displaying nb of errors
        if (errors === 1) {
            $('#nbPendu').html('&nbsp;' + errors + '&nbsp;mistake');
        } else if (errors > 1) {
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
            $('#keepTrying').html('But you can keep guessing !');
        } else if (errors > 12) {
            $('#imgDisplay').html('<img id="keeptrying" src="libs/images/keepcalm.png" />');
        }




        //check if word completely found
        let foundTable = lettersFound(wordToFind);
        let wordFinish = isWordFinish(foundTable);

        if (wordFinish) {
            $('#lettersChosen').html("<h1>YOU WON !!!! Congrats !</h1>");
            $('#keepTrying').html("");
            $('#imgDisplay').html('<img id="congrats" src="libs/images/congrats.png" />');
            $('#wordFound').html('You found the word : <strong>' + wordToFind + '</strong>');
            $('#wordDef').html('<hr><p class="definition">' + wordDefinition + '</p>');
            $('#wordFrench').html('<hr><p class="definition">' + wordFrench + '</p>');

        }


        //display refresh button if error max or done
        if (wordFinish == true || errors >= 12) {
            $('#buttonDisplay').html('');
            $('#buttonDisplay').html('<button type="button" id="refreshBtn">Play again</button>');
            

            //button to refresh
            $('#refreshBtn').click(function() {
                location.reload();
            });

        }

        if (wordFinish == true && errors >= 12) {
            $('#lettersChosen').html("<h1>You did great !</h1>");
        }


    }


});



//initialisation
//function to reinitialise on every refresh
function reInit() {
    $('#imgDisplay').html('<img id="logo" src="libs/images/intro.png"/>');
}

//function to display word to find underscores
function underscoreFinder(mot) {
    let indA = 1;
    let motLong = mot.length;
    for (let a = 0; a < motLong; a++) {
        if (mot[a] == " ") {
            $('#underscore').append('<p id="l' + indA + '">&nbsp;</p><p class="esp"></p>');
        } else if (mot[a] == "-") {
            $('#underscore').append('<p id="l' + indA + '">-</p><p class="esp"></p>');
        } else {
            $('#underscore').append('<p id="l' + indA + '">_</p><p class="esp"></p>');
        }
        indA++;
    }
}

//function to display word to find underscores in responsive
function underscoreFinderResp(mot) {
    let indA = 1;
    let motLong = mot.length;
    for (let a = 0; a < motLong; a++) {
        if (mot[a] == " ") {
            $('#underscore').append('<p id="l' + indA + '">//</p><p class="esp"></p>');
            $('#underscore').append('\n');
        } else if (mot[a] == "-") {
            $('#underscore').append('<p id="l' + indA + '">-</p><p class="esp"></p>');
        } else {
            $('#underscore').append('<p id="l' + indA + '">_</p><p class="esp"></p>');
        }
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
    $('#comments').html('Only one letter');

}





//on key press
//function to check if what user sent is only a letter (lowercase)
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
        }
    }
    return isMatch;
}





let tableOfWords = [
    { "id": 1, "word": "javascript", "text": "JavaScript, also known as JS, is a programming language commonly used in web development. It was originally developed by Netscape as a means to add dynamic and interactive elements to websites.", "text2": "JavaScript, autrement appelé JS, est un langage de programmation très utilisé dans le développement web. Il a été développé par Netscape pour donner la possibilité d’ajouter des éléments dynamiques dans un site web. " },
    { "id": 2, "word": "ajax", "text": "Ajax (also AJAX , short for 'Asynchronous JavaScript + XML') is a set of web development techniques on the client side to create asynchronous web applications. With Ajax, web applications can send and retrieve data from a server asynchronously (in the background) without interfering with the display and behavior of the existing page.", "text2": "Ajax (AJAX, sigle pour « Asynchronous JavaScript + XML ») est un ensemble de techniques de développement web côté client pour créer des applications web asynchrone. Avec Ajax, les applications web peuvent envoyer et récupérer des données stockées dans un serveur de manière asynchrone (c’est-à-dire en arrière-plan) sans interférer sur l’affichage ou le comportement de la page active." },
    { "id": 3, "word": "toolbox", "text": "A toolbox is a window or pane that contains icons and buttons that are tools in the program. The tools are for quick access to common operations.", "text2": "Un toolbox (boite à outils en français) est une fenêtre ou un panneau qui contient des icônes et des boutons qui sont des outils dans le programme. Les outils sont des accès rapides pour des opérations fréquentes. " },
    { "id": 4, "word": "hardware", "text": "Hardware is the collection of physical parts of a computer system. This includes the monitor, keyboard, and mouse. It also includes all the parts inside the computer case, such as the hard disk drive, motherboard, video card, and many others.", "text2": "Hardware (matériel informatique) est l’ensemble des pièces qui composent un ordinateur comme l’écran, le clavier et la souris. Ça inclut les pièces qui composent l’unité centrale comme le disque dur, la carte mère, la carte vidéo et autres." },
    { "id": 5, "word": "drag-n-drop", "text": "Drag and drop is a pointing device gesture in which the user selects a virtual object by 'grabbing' it and dragging it to a different location or onto another virtual object.", "text2": "Le drag-n-drop (glisser-déposer en français) est une action effectuée par l’utilisateur pendant laquelle il sélectionne un objet virtuel en «  l’attrapant » et en le glissant jusqu’à un autre endroit ou dans un autre objet virtuel." },
    { "id": 6, "word": "width", "text": "Width", "text2": "Largeur" },
    { "id": 7, "word": "length", "text": "Length", "text2": "Longueur" },
    { "id": 8, "word": "integer", "text": "Integer (abbreviated as int)", "text2": "Nombre entier (abrégé en int)" },
    { "id": 9, "word": "array", "text": "Array", "text2": "Tableau" },
    { "id": 10, "word": "window", "text": "Window", "text2": "Fenêtre" },
    { "id": 11, "word": "loop", "text": "Loop", "text2": "Boucle" },
    { "id": 12, "word": "square brackets", "text": "Square brackets are those signs : [ ]", "text2": "Crochets [ ]" },
    { "id": 13, "word": "storage", "text": "Storage", "text2": "Stockage" },
    { "id": 14, "word": "download", "text": "Download", "text2": "Télécharger" },
    { "id": 15, "word": "cookie", "text": "A cookie is a small text file (up to 4KB) created by a website that is stored in the user's computer either temporarily for that session only or permanently on the hard disk. Cookies provide a way for the website to recognize the user and keep track of his preferences.", "text2": "Un cookie est un petit fichier texte (jusqu’à 4KB) créé par un site web et stocké dans l’ordinateur de l’utilisateur soit temporairement pour une session ou de façon permanente sur le disque dur. Les cookies fournissent un moyen pour le site de reconnaître l’utilisateur et de garder une trace de ses préférences." },
    { "id": 16, "word": "submit", "text": "Submit", "text2": "Envoyer" },
    { "id": 17, "word": "refresh", "text": "Refresh", "text2": "Rafraîchir" },
    { "id": 18, "word": "function", "text": "Function", "text2": "Fonction" },
    { "id": 19, "word": "return", "text": "Return", "text2": "Renvoyer / retourner" },
    { "id": 20, "word": "framework", "text": "A framework is a platform for developing software applications. It provides a foundation on which software developers can build programs for a specific platform", "text2": "Un framework est une plateforme pour développer des applications. Il fournit une base sur laquelle les développeurs logiciels peuvent construire des programmes pour une plateforme spécifique." },
    { "id": 21, "word": "mobile-first", "text": "A “mobile-first” approach involves designing a desktop site starting with the mobile version, which is then adapted to larger screens (contrary to the traditional approach of starting with a desktop site and then adapting it to smaller screens).", "text2": "Une approche « mobile-first » (mobile d’abord) implique de créer un site en commençant par la version mobile et puis de l’adapter sur des écrans plus larges (contrairement à l’approche traditionnelle qui consiste à commencer par la version bureau)." },
    { "id": 22, "word": "header", "text": "Header", "text2": "En-tête" },
    { "id": 23, "word": "toggle", "text": "Toggle", "text2": "Basculer" },
    { "id": 24, "word": "disabled", "text": "Disabled", "text2": "Désactivé" },
    { "id": 25, "word": "operating system", "text": "An operating system (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.", "text2": "Un système d’exploitation est un logiciel système qui gère les composants physiques et les ressources logicielles et fournit un service pour les programmes informatiques." },
    { "id": 26, "word": "algorithm", "text": "Algorithm", "text2": "Algorithme" },
    { "id": 27, "word": "database", "text": "Database", "text2": "Base de données" },
    { "id": 28, "word": "floppy disk", "text": "Floppy disk", "text2": "Disquette" },
    { "id": 29, "word": "scroll", "text": "Scroll", "text2": "Faire défiler" },
    { "id": 30, "word": "shift key", "text": "Shift key", "text2": "La touche majuscule" },
    { "id": 31, "word": "trojan horse", "text": "Trojan horse", "text2": "Cheval de Troie" },
    { "id": 32, "word": "host", "text": "Host", "text2": "Hôte" },
    { "id": 33, "word": "information technology", "text": "Information Technology shortened as IT", "text2": "L'informatique" },
    { "id": 34, "word": "keyboard", "text": "Keyboard", "text2": "Clavier" },
    { "id": 35, "word": "wireless", "text": "Wireless", "text2": "Sans fil" },
    { "id": 36, "word": "remove", "text": "Remove", "text2": "Enlever" },
    { "id": 37, "word": "laptop", "text": "Laptop", "text2": "Ordinateur portable" },
    { "id": 38, "word": "input", "text": "Input", "text2": "Données/Saisir" },
    { "id": 39, "word": "motherboard", "text": "Motherboard", "text2": "Carte-mère" },
    { "id": 40, "word": "password", "text": "Password", "text2": "Mot de passe" },
    { "id": 41, "word": "browser", "text": "Browser", "text2": "Navigateur" },
    { "id": 42, "word": "component", "text": "A component refers to any device internal to the computer, such as the hard disk drive or motherboard", "text2": "Un composant fait référence à tous les éléments internes à l’ordinateur comme le disque dur ou la carte mère" },
    { "id": 43, "word": "login", "text": "Login", "text2": "Connexion/Identifiants" },
    { "id": 44, "word": "dots per inch", "text": "dots per inch (dpi) is a measure of the sharpness (that is, the density of illuminated points) on a display screen . The dot pitch determines the absolute limit of the possible dots per inch.", "text2": "DPI est l'acronyme de Dots Per Inch, signifiant Points Par Pouce (PPP) en français. Il s'agit du nombre de pixels contenus dans un pouce. Plus le nombre de pixels est grand, meilleure sera la résolution et la définition de l'image." },
    { "id": 45, "word": "binary", "text": "Binary", "text2": "Binaire" },
    { "id": 46, "word": "output", "text": "Output", "text2": "Données de sortie/Résultat" },
    { "id": 47, "word": "asynchronous", "text": "Asynchronous", "text2": "Asynchrone (en arrière plan)" },
    { "id": 48, "word": "null", "text": "Null", "text2": "Sans valeur" },
    { "id": 49, "word": "commit", "text": "Commit", "text2": "Archiver/Soumettre" },
    { "id": 50, "word": "uppercase", "text": "Uppercase (contrary to lowercase)", "text2": "En majuscule (contraire de en minuscule)" },
    { "id": 51, "word": "string", "text": "String", "text2": "Chaîne de caractères" },
    { "id": 52, "word": "case sensitive", "text": "Case sensitive means differentiating between capital and lower-case letters.", "text2": "Sensible aux majuscules" },
    { "id": 53, "word": "red green blue", "text": "RGB refers to three hues of light that can be mixed together to create different colors.", "text2": "RGB fait référence aux trois teintes de lumière qui peuvent être mixé ensemble pour créer les couleurs différents" },
    { "id": 54, "word": "field", "text": "Field", "text2": "Champ" },
    { "id": 55, "word": "prompt", "text": "Prompt", "text2": "Invite (à saisir du texte)" },
    { "id": 56, "word": "merge", "text": "Merge", "text2": "Fusionner, rejoindre" },
    { "id": 57, "word": "directory", "text": "Directory", "text2": "Répertoire" },
    { "id": 58, "word": "spacebar", "text": "Spacebar", "text2": "Barre d'espace" },
    { "id": 59, "word": "query", "text": "Query", "text2": "Requête" },
    { "id": 60, "word": "enable", "text": "Enable", "text2": "Activer" },
    { "id": 61, "word": "concatenate", "text": "Concatenate", "text2": "Concatener" },
    { "id": 62, "word": "view", "text": "View", "text2": "Vue" },
    { "id": 63, "word": "chip", "text": "Chip", "text2": "Puce" },
    { "id": 64, "word": "hard drive", "text": "Hard drive", "text2": "Disque dur" },
    { "id": 65, "word": "bold", "text": "Bold", "text2": "En gras" },
    { "id": 66, "word": "highlight", "text": "Highlight", "text2": "Sélectionner/Surligner" },
    { "id": 67, "word": "dash", "text": "Dash", "text2": "Tiret" },
    { "id": 68, "word": "hash mark", "text": "Hash mark #", "text2": "Dièse #" },
    { "id": 69, "word": "angle brackets", "text": "Angle brackets < >", "text2": "Chevrons / crochets obliques < >" },
    { "id": 70, "word": "curly brackets", "text": "Curly brackets { }", "text2": "Accolades { }" },
    { "id": 71, "word": "ampersand", "text": "Ampersand &", "text2": "Esperluette &" },
    { "id": 72, "word": "gigabyte", "text": "A gigabyte is a unit of storage capacity for computer data and memory equal to about one billion bytes.", "text2": "Un gigabyte est une unité de stockage pour les données informatiques qui vaut environ un milliards de bytes." },
    { "id": 73, "word": "size", "text": "Size", "text2": "Taille" },
    { "id": 74, "word": "pop-up window", "text": "Pop-up window", "text2": "Fenêtre contextuelle" },
    { "id": 75, "word": "font", "text": "Font", "text2": "Police" },
    { "id": 76, "word": "hexadecimal", "text": "a number system having a base 16; the symbols for the numbers 0–9 are the same as those used in the decimal system, and the numbers 10–15 are usually represented by the letters A–F.", "text2": "Un système numérique avec une base de 16. Les symboles pour les chiffres de 0 à 9 sont les mêmes que ceux utilisés pour le système décimal et les nombres de 10 à 15 sont souvent représentés par les lettres A à F." },
    { "id": 77, "word": "broadband", "text": "Broadband", "text2": "Haut débit" },
    { "id": 78, "word": "firewall", "text": "A firewall is a computer system or program that automatically prevents an unauthorized person from gaining access.", "text2": "Un firewall (pare-feu) est un système ou un programme informatique qui bloque automatiquement les personnes non autorisées." },
    { "id": 79, "word": "data", "text": "Data", "text2": "Données" },
    { "id": 80, "word": "grid", "text": "Grid", "text2": "Grille" }
];