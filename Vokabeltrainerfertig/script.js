// Vokabeln für die Kapitel definieren
const units = {
    7: {
        1: { words: [["Hund", "chien"], ["Katze", "chat"], ["Vogel", "oiseau"], ["Fisch", "poisson"], ["Maus", "souris"]] },
        2: { words: [["Haus", "maison"], ["Auto", "voiture"], ["Schule", "école"], ["Buch", "livre"], ["Tisch", "table"]] },
        3: { words: [["Apfel", "pomme"], ["Banane", "banane"], ["Orange", "orange"], ["Traube", "raisin"], ["Erdbeere", "fraise"]] },
        4: { words: [["Stuhl", "chaise"], ["Fenster", "fenêtre"], ["Tür", "porte"], ["Wand", "mur"], ["Boden", "sol"]] },
        5: { words: [["Schokolade", "chocolat"], ["Käse", "fromage"], ["Brot", "pain"], ["Milch", "lait"], ["Wasser", "eau"]] }
    },
    8: {
        1: { words: [["Schule", "école"], ["Klasse", "classe"], ["Lehrer", "enseignant"], ["Schüler", "élève"], ["Tafel", "tableau"]] },
        2: { words: [["Buch", "livre"], ["Stift", "stylo"], ["Papier", "papier"], ["Heft", "cahier"], ["Computer", "ordinateur"]] },
        3: { words: [["Freund", "ami"], ["Freundin", "amie"], ["Hobby", "loisir"], ["Sport", "sport"], ["Musik", "musique"]] },
        4: { words: [["Urlaub", "vacances"], ["Reise", "voyage"], ["Flughafen", "aéroport"], ["Hotel", "hôtel"], ["Koffer", "valise"]] },
        5: { words: [["Essen", "nourriture"], ["Trinken", "boisson"], ["Restaurant", "restaurant"], ["Küche", "cuisine"], ["Gericht", "plat"]] },
        6: { words: [["Film", "film"], ["Kino", "cinéma"], ["Theater", "théâtre"], ["Musik", "musique"], ["Konzert", "concert"]] }
    }
};

let currentQuestionIndex = 0; // Index für die aktuelle Frage
let currentWords = []; // Aktuelle Vokabeln für das Quiz

// Funktion zum Handhaben der Klassenauswahl
function handleSelection() {
    const selection = document.getElementById("selection").value;
    const chapterForm = document.getElementById("chapterForm");
    const quizContainer = document.getElementById("quiz-container");
    const message = document.getElementById("message");

    // Kapitel entsprechend der Auswahl anzeigen
    if (selection === "7" || selection === "8") {
        chapterForm.style.display = "block";
        quizContainer.style.display = "none"; // Abfrage ausblenden
        document.getElementById(`chapters-${selection}`).style.display = "block";

        // Verstecke die Kapitel für die andere Klasse
        if (selection === "7") {
            document.getElementById("chapters-8").style.display = "none";
        } else {
            document.getElementById("chapters-7").style.display = "none";
        }

        message.textContent = "";
    } else {
        chapterForm.style.display = "none"; // Kapitel-Auswahl ausblenden, wenn keine Klasse ausgewählt ist
        quizContainer.style.display = "none"; // Abfrage ausblenden
    }
}

// Funktion zum Starten des Quiz
function startQuiz() {
    const selectedClass = document.getElementById("selection").value;
    const selectedChapters = Array.from(document.querySelectorAll(`#chapters-${selectedClass} input:checked`)).map(checkbox => checkbox.value);
    const errorMessage = document.getElementById("error-message");
    
    if (selectedChapters.length === 0) {
        errorMessage.textContent = "Bitte wähle mindestens ein Kapitel aus.";
        return;
    } else {
        errorMessage.textContent = ""; // Fehlermeldung zurücksetzen, wenn eine Auswahl getroffen wurde
    }

    // Alle Vokabeln für die ausgewählten Kapitel sammeln
    currentWords = [];
    selectedChapters.forEach(chapter => {
        currentWords.push(...units[selectedClass][chapter].words);
    });

    // Kapitel-Auswahl ausblenden und Quiz starten
    document.getElementById("chapterForm").style.display = "none"; // Kapitel-Auswahl ausblenden
    document.getElementById("quiz-container").style.display = "block"; // Quiz-Container anzeigen

    currentQuestionIndex = 0; // Zurücksetzen des Fragen-Index
    loadNextQuestion(); // Nächste Frage laden
}

// Funktion zum Laden der nächsten Frage
function loadNextQuestion() {
    if (currentQuestionIndex < currentWords.length) {
        const [questionWord, answerWord] = currentWords[currentQuestionIndex];
        document.getElementById("question").textContent = questionWord; // Die Frage ist auf Deutsch
        document.getElementById("quiz-container").dataset.answer = answerWord; // Die Antwort speichern
        document.getElementById("answer").value = ""; // Eingabefeld leeren
        document.getElementById("feedback").textContent = ""; // Feedback zurücksetzen
    } else {
        // Wenn keine Fragen mehr übrig sind, zeige eine Nachricht an
        document.getElementById("question").textContent = "Quiz beendet!";
        document.getElementById("quiz-container").style.display = "none"; // Quiz-Container ausblenden
        document.getElementById("unit-status").textContent = "Alle Fragen wurden beantwortet."; // Statusnachricht
    }
}

// Funktion zum Überprüfen der Antwort
// Funktion zum Überprüfen der Antwort
function checkAnswer() {
    const answer = document.getElementById("answer").value.trim(); // Eingabe vom Benutzer abrufen und Leerzeichen trimmen
    const feedback = document.getElementById("feedback"); // Feedback-Element abrufen
    const correctAnswer = currentWords[currentQuestionIndex][1]; // Die korrekte Antwort für die aktuelle Frage abrufen

    if (answer.toLowerCase() === correctAnswer.toLowerCase()) { // Benutzerantwort mit der korrekten Antwort vergleichen
        feedback.textContent = "Richtig!"; // Feedback bei richtiger Antwort
        feedback.style.color = "green"; // Grüne Farbe für positives Feedback
    } else {
        feedback.textContent = `Falsch! Die richtige Antwort wäre: ${correctAnswer}`; // Feedback bei falscher Antwort
        feedback.style.color = "red"; // Rote Farbe für negatives Feedback
    }

    // Nächste Frage laden, wenn der Benutzer die Antwort überprüft hat
    currentQuestionIndex++; // Fragenindex erhöhen
    setTimeout(loadNextQuestion, 2000); // Warte 2 Sekunden und lade die nächste Frage
}



// Funktion zum Zurück zur Auswahl
function goBackToSelection() {
    document.getElementById("quiz-container").style.display = "none"; // Abfrage ausblenden
    document.getElementById("chapterForm").style.display = "block"; // Kapitelauswahl anzeigen
    document.getElementById("selection").value = ""; // Auswahl zurücksetzen
    document.getElementById("message").textContent = ""; // Fehlermeldung zurücksetzen
    document.getElementById("unit-status").textContent = ""; // Status zurücksetzen
    document.getElementById("answer").value = ""; // Eingabefeld leeren
    document.getElementById("feedback").textContent = ""; // Feedback zurücksetzen
}
