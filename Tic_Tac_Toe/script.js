let whoseTurn = "x";
//PH für Platzhalter weil Schleife bei 1 beginnen muss wegen den ZellIDs !
let winQuoteArray = ["PH","W","i","n","F","o","r",""];
let drawQuoteArray = ["PH","N","o","","O","n","e","W","in","s"];
let startQuoteArray = ["PH","","x","","b","e","g","i","n","s"];
let testCounter = 1;
let safeWhoseTurn;
let whichGame = 1;
let xPoints = 0;
let oPoints = 0;
// Damit Spiel erst nach Start Button drücken gestartet wird
let gameStep = -1;


// Methode um einen Klick vom Spieler hinzuzufügen
function addCharacter(cellID) {

    // Startet nur wenn Zelle leer ist und das Spiel gestartet wurde
    if (document.getElementById(cellID).textContent === "" && gameStep !== -1) {
        
        // Schaue wer am Zug ist
        if(whoseTurn === "x") {
            document.getElementById(cellID).textContent = "x";
            // Füge auch die passende Farbe hinzu mit oassenden CSS Klassen
            document.getElementById(cellID).classList.add("playerX");
            document.getElementById(cellID).classList.remove("playerO");
            // Wechsel wer dran ist
            safeWhoseTurn = "o";
            // Spielzug erhöhen damit wir Draw erkennen können
            gameStep++;
        }
        else {
            // Alles wie bei x bloß umgekehrt 
            document.getElementById(cellID).textContent = "o";
            document.getElementById(cellID).classList.add("playerO");
            document.getElementById(cellID).classList.remove("playerX");
            safeWhoseTurn = "x";
            gameStep++;
        }
    }
    // Überprfüe nach jedem hinzufügen, ob Spiel zuende ist
    checkGame();
    // setze nach checkGame whoseTurn auf den zuvor beim Hinzufügen geupdateten Wert, wichtig !
    whoseTurn = safeWhoseTurn;
}

// Checke ob jemand gewonnen hat 
function checkGame() {
    // Schaue ob Reihe, Spalte oder Diagonale voll ist
    if ((checkRows() || checkCollumns() || checkDiagonal()) === true) {
        // Füge den Siegestext ein
        for (let i = 1; i < 8; i++) {
            document.getElementById("cell" + i).textContent 
            =winQuoteArray[i]; 
            document.getElementById("cell" + i).classList.remove("playerX", "playerO");
        }
        document.getElementById("cell8").textContent = whoseTurn;
        // entferne Falls vorhanden die Farbe vom Spiel zuvor
        document.getElementById("cell8").classList.remove("playerX", "playerO");
        document.getElementById("cell9").textContent = "";
        // Passe den Score auf dem Scoreboard an
        updateScore(whoseTurn);
        document.getElementById("cell9").classList.remove("playerX", "playerO");
        //Kurze Wartezeit von 1,0 Sekunden um den Sieger anzuzeigen
        setTimeout(function() {
            for (let i = 1; i < 10; i++) {
                document.getElementById("cell"+i).textContent = ""; 
            }

        }, 1000);
        // Setze die Spielzüge für neues Spiel wieder zurück
        gameStep = 0;
        // Erhöhe den SpielCounter
        whichGame++;
        // Füge das Update auch in HTML ein
        document.getElementById("whichGame").textContent = "Game " + whichGame;
        // Schau dir an wer das nächste Spiel beginnt 
        safeWhoseTurn = whoStartNextGame();
    }
    // Checke ob Draw entstanden ist ansonsten alles wie bei Win
    else if (gameStep === 9) {
        for(let i = 1; i < 10; i++) {
            document.getElementById("cell" + i).textContent = drawQuoteArray[i];
            document.getElementById("cell" + i).classList.remove("playerX", "playerO");
        }
        // Timeout um Draw bekannt zu geben
        setTimeout(function() {
            for (let i = 1; i < 10; i++) {
                 document.getElementById("cell"+i).textContent = ""; 
            }

        }, 1000);
        gameStep = 0;
        whichGame++;
        document.getElementById("whichGame").textContent = "Game " + whichGame;
        safeWhoseTurn = whoStartNextGame();
    }
}

// Schaue welches Spiel als nächstes kommt und berechne mit %2 wer dran ist
// hier umgedrehte Logik als sonst, weil wir ja mit Game 1 starten 
function whoStartNextGame() {
    if (whichGame % 2 === 1) {
        return "x";
    }
    else {
        return "o";
    }
}

//Funktion zum Aktualisieren des Punktstandes auf dem ScoreBoard
function updateScore(whoseTurn) {
    if (whoseTurn === "x") {
        xPoints++;
        document.getElementById("cellPlayerxPoints").textContent = xPoints; 
        return;
    }

    else {
        oPoints++;
        document.getElementById("cellPlayeroPoints").textContent = oPoints;
        return;
    }
}

// Funktion um über die 3 Reihen zu iterieren und zu Checken
function checkRows() {

    if ((document.getElementById("cell1").textContent === whoseTurn) && (document.getElementById("cell2").textContent === whoseTurn) && (document.getElementById("cell3").textContent === whoseTurn)) {
        return true;
    }

    else if ((document.getElementById("cell4").textContent === whoseTurn) && (document.getElementById("cell5").textContent === whoseTurn) && (document.getElementById("cell6").textContent === whoseTurn)) {
        return true;
    }

    else if ((document.getElementById("cell7").textContent === whoseTurn) && (document.getElementById("cell8").textContent === whoseTurn) && (document.getElementById("cell9").textContent === whoseTurn)) {
        return true;
    }

    else {
        return false;
    }

}

// Funktion um über die 3 Spalten zu iterieren und zu Checken
function checkCollumns() {

    if ((document.getElementById("cell1").textContent === whoseTurn) && (document.getElementById("cell4").textContent === whoseTurn) && (document.getElementById("cell7").textContent === whoseTurn)) {
        return true;
    }

    else if ((document.getElementById("cell2").textContent === whoseTurn) && (document.getElementById("cell5").textContent === whoseTurn) && (document.getElementById("cell8").textContent === whoseTurn)) {
        return true;
    }

    else if ((document.getElementById("cell3").textContent === whoseTurn) && (document.getElementById("cell6").textContent === whoseTurn) && (document.getElementById("cell9").textContent === whoseTurn)) {
        return true;
    }

    else {
        return false;
    }

}

// Funktion um über die 3 Diagonalen zu iterieren und zu Checken
function checkDiagonal() {

    if ((document.getElementById("cell1").textContent === whoseTurn) && (document.getElementById("cell5").textContent === whoseTurn) && (document.getElementById("cell9").textContent === whoseTurn)) {
        return true;
    }

    else if ((document.getElementById("cell3").textContent === whoseTurn) && (document.getElementById("cell5").textContent === whoseTurn) && (document.getElementById("cell7").textContent === whoseTurn)) {
        return true;
    }

    else {
        return false;
    }

}

// Funktion wenn man auf den Start-Button klickt
function startFunction() {
    // Game wird gestartet
    gameStep = 0;
    // Clear die Zellen
    for(let i = 1; i < 10; i++) {
        document.getElementById("cell" + i).textContent = startQuoteArray[i];
    }
    // Timeout um StartQuote anzugeben von 1,5 s
    setTimeout(function() {
        for (let i = 1; i < 10; i++) {
             document.getElementById("cell"+i).textContent = ""; 
        }
    }, 1500);
    // Ändere den angezeigten Button
    document.getElementById("startButton").style.display="none";
    document.getElementById("newstartButton").style.display="inline-block";
}

// Funktion wenn man auf den Nwestart-Button klickt
function newstartFunction() {
    // x beginnt immer
    whoseTurn = "x";
    safeWhoseTurn = "x";
    // clear alle Zellen von Inhalt und Farbe
    for (let i = 1; i < 10; i++) {
        document.getElementById("cell"+i).textContent = ""; 
        document.getElementById("cell" + i).classList.remove("playerX", "playerO");
    }
    // Initialisieren wieder Anfangszustand und fügen das auch mit HTML ein
    whichGame = 1;
    document.getElementById("whichGame").textContent = "Game " + whichGame;
    gameStep = -1;
    xPoints = 0;
    document.getElementById("cellPlayerxPoints").textContent = xPoints; 
    oPoints = 0;
    document.getElementById("cellPlayeroPoints").textContent = oPoints; 
    // Ändern den angezeigten Button
    document.getElementById("startButton").style.display="inline-block";
    document.getElementById("newstartButton").style.display="none";

}