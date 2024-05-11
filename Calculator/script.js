// Variable zum checken ob vorher Ergebnis gelöst wurde
let solvedBefore = true;

// funtion zum hinzufügen des nächsten characters
function addCharacter(character) {

    // Füge hinzu solange die Anzeige nicht voll ist (11 Zeichen)
    if(document.getElementById('resultArea').innerHTML.length >= 11 && solvedBefore == false) {
        return;
    }
    // Solange nicht solved before füge hinzu 
    else if (solvedBefore === false) {
        document.getElementById('resultArea').innerHTML += character;
    }
    // Checke ob vorher ein Ergebnis gelöst wurde
    else {
        checkIfSolved(character);
        document.getElementById('resultArea').innerHTML += character;
    }
}

// Funktion zum Überprüfen, ob vorher ein Ergebnis überprüft wurde
function checkIfSolved(character) {

    // Wenn ein Funktionssymbol nach einem gelösten Ergebnis
    // hinzugefügt wurde, dann füge es ein -> bessere Usability
    if(['+', '-', '*', '/'].includes(character)) {
        solvedBefore = false;
        return;
    }

    // Ansonsten lösche alles raus und setze solvedBefore zurück
    else if (solvedBefore === true) {
        deleteAll();
        solvedBefore = false;
        return;
    }
    return;
}

// Funktion zum lösen der Gleichung 
function solveCharacters() {
    // Lesen die Gleichung aus
    let characters = document.getElementById('resultArea');
    // Löse die Gleichung mit eval und Runde sie auf 3 Stellen 
    var result = parseFloat(eval(characters.innerHTML).toFixed(3));

    // Zum Fehler abfangen, aber noch offen 
    // TODO: Fange weitere Fehler ab 
    if (result===undefined || isNaN(result) ) {
        characters.innerHTML = "Error"
    }
    // Falls kein Fehler einfach einfügen
    else {
        characters.innerHTML = result;
    }
    // Passe solvedBefore an, damit checkIfSolved funktioniert
    solvedBefore = true;
}

// Funktion die alle Character aus der resultArea rauslöscht
function deleteAll() {
    let characters = document.getElementById('resultArea');
    characters.innerHTML = characters.innerHTML.slice(0,0);
}

// Funktion die den letzten Character aus der resultArea rauslöscht
function deleteLast() {
    let characters = document.getElementById('resultArea');
    characters.innerHTML = characters.innerHTML.slice(0, -1);
}