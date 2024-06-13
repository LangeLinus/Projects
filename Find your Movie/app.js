const fetchData = async (title, country) => {
    const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?series_granularity=show&show_type=movie&output_language=en&title=${title}&country=${country}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd40567b73emsh0140803e3efcaa3p104086jsn868d188b4611',
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
    };

    let output ="";
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    for(let i = 0; i < 4; i++) {
        if(result[i].streamingOptions.de !== undefined) {

            let streamingOptionsHTML="";
            let checkedStreamingOptions = [];

            let streamingOptions = result[i].streamingOptions.de;

            streamingOptionsHTML += '<table  id="tableStreamingOptions"><tr><th>Service</th><th>Payment</th><th>Price</th></tr>';
            checkedStreamingOptions = checkArrayUnique(streamingOptions);

            checkedStreamingOptions.forEach(option => {
                streamingOptionsHTML += `<tr>
                    <td>${option.name}</td>
                    <td>${option.type}</td>
                    <td>${option.price}</td>
                </tr>`;
            });
        
            streamingOptionsHTML += '</table>';
    
            output += `
                <div class="box">
                    <h1>${result[i].title}</h1>
                    <p class="firstP">
                    <span><strong>ReleaseYear : </strong> ${result[i].releaseYear}</span>
                    <span><strong>Runtime : </strong>${result[i].runtime} min</span></p>
                    <p id="streamingOptions"><strong>Streaming Options:</strong></p>
                    ${streamingOptionsHTML}
                    <p id="overview"><strong>Overview: </strong>${result[i].overview}</p>
                </div>
            `;

            document.getElementsByClassName('result')[0].innerHTML = output;
        }
    }
}

function checkArrayUnique(streamingOptions) {

    // Set elemeniert doppelte Werte automatisch
    let usedPaidStreamingOptions = new Set();
    let usedSubscribeStreamingOptions = new Set();
    let subscriptionOptions = [];
    let paidOptions = [];

    streamingOptions.forEach((option, index) => {

            const serviceName = option.service.name;
            if (!usedPaidStreamingOptions.has(serviceName) || !usedSubscribeStreamingOptions.has(serviceName)) {

                if(option.type !== "subscription" && !usedPaidStreamingOptions.has(serviceName)) {
                    usedPaidStreamingOptions.add(serviceName);
                    paidOptions.push({
                        index: index,
                        name: serviceName,
                        type: option.type,
                        price: option.price ? option.price.amount : null
                    });
                }

                else if (option.type === "subscription" && !usedSubscribeStreamingOptions.has(serviceName)) {
                    usedSubscribeStreamingOptions.add(serviceName);
                    subscriptionOptions.push({
                        index: index,
                        name: serviceName,
                        type: option.type,
                        price: "free"
                    });
                }
            }
    });
    return subscriptionOptions.concat(paidOptions);
}

const userInput = document.querySelector('#search-input');
const btn = document.querySelector('#searchButton');

const callFetchData = () => {
    const title = userInput.value;
    const country = 'de';
    fetchData(title, country);
    userInput.value = ''; // optional: clear input field after fetching data
}

btn.addEventListener('click', callFetchData);


// Ablage für alten Code 
// Old version for Presentation Streaming Availability Options
// streamingOptionsHTML += '<ul>';
            
// //TODO: , Price: ${option.price.amount} einbauen mit if falls kein Preis vorhanden
// streamingOptions.forEach(option => {
//     streamingOptionsHTML += `<li>Service: ${option.service.name}, Type: ${option.type}</li>`;
// });
// streamingOptionsHTML += '</ul>';


