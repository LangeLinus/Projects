const chatData = async(nutzerEingabe) =>{   //nutzereingabe ist da einfach nur um andere name zu verwenden 
    const url = 'https://chat-gpt26.p.rapidapi.com/';//bis Zeile 24 alles von der API vorgegeben
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'ba251a4821msh2513c39b20ab1a5p166b4fjsnb4a646d8daa9',
            'x-rapidapi-host': 'chat-gpt26.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({                                  //JSON.stringify um die Eingabe als String zu nutzen
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: 'similar movies  ' + nutzerEingabe
                }
            ]
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();                       // result ist im JSON format
        console.log(result);
        let chatoutput = "";
        if(chatAnsSort(result)!= null){
        chatoutput += `
        <ul>
            <li>${chatAnsSort(result).slice(0,1)}</li>
            <li>${chatAnsSort(result).slice(1,2)}</li>
            <li>${chatAnsSort(result).slice(2,3)}</li>
        </ul>
        `;
        }else{
            chatoutput += `
            <p> All 10 free monthly requests to chat GPT are used up sorry we dont want to spend money  
            </p>
            `; 
        }
        document.getElementById("ansChatGpt").innerHTML = chatoutput;
    } catch (error) {
        console.error(error);
    }
}

const chatAnsSort= (jsonString) =>{                                 // DIe JSON dinger lesbar umwandeln
    try{
        const data = JSON.parse(jsonString);
        const content = data.choices[0].message.content;
        const films = content.split('\n').map(film => film.replace(/^\d+\.\s*/, '')); // onderzeichen ersetzen, filme sind von ChatGpt dur \n getrennt deswegen split\n
        const topFilms = films.slice(0, 3);
        return topFilms;
    } catch{
        return null;
    }

};

const userInputGpt = document.querySelector('#search-input');       // Eingabe der Suchleiste nutzbarmachen
const gptBtn = document.querySelector('#searchButton');             // Serachbutton deklarieren

const callchatData = () => {                                        // ruft obere Funktion auf
    const wichtig = userInputGpt.value;                       // wichtig! ohne das geht es nicht
    chatData(wichtig);                    
    userInput.value = '';                                           // optional: clear input field after fetching data
}

gptBtn.addEventListener('click', callchatData);