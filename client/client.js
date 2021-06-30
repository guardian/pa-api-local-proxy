
const form = document.querySelector("form");
const loadingElement = document.querySelector('.loading');
const goldBootElement = document.querySelector('.goldenboot')
const API_URL_GOLD = 'http://localhost:5000/goldenboot';
const API_URL_WEATHER = 'http://localhost:5000/weather';
loadingElement.style.display = 'none'
form.style.display = ''

listGoldenBoot()

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const player = formData.get('player')
    const country = formData.get('country')
    console.log(player);
    console.log(country);

    const totalFormData = {
        player,
        country
    }
    console.log("Forma Data sent from Client", totalFormData);
    form.style.display = 'none'
    loadingElement.style.display = ''

    fetch(API_URL_GOLD)
        .then(response => response.json())
        .then(goldbootscorers => {
            console.log("WeatherFetched", goldbootscorers);
            goldbootscorers.forEach(scorer => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = scorer.name;

                const goalsScored = document.createElement('p');
                goalsScored.textContent = scorer.goals;

                div.appendChild(header);
                div.appendChild(goalsScored);

                goldBootElement.appendChild(div)

            })
        })

    // fetch(API_URL_WEATHER, {
    //     method: "POST",
    //     body: JSON.stringify(totalFormData),
    //     headers: {
    //         'content-type': 'application/json'
    //     }
    // }).then(response => response.json())
    //     .then(weatherData => {
    //         console.log("Returned from Server to Client", weatherData);
    //         form.style.display = ''
    //         loadingElement.style.display = 'none'
    //         // document.getElementById("country").textContent = "TREEEEEE";
    //     })
})

function listGoldenBoot() {
    fetch(API_URL_GOLD)
        .then(response => response.json())
        .then(goldbootscorers => {
            console.log("WeatherFetched", goldbootscorers);
            goldbootscorers.forEach(scorer => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = scorer.name;

                const goalsScored = document.createElement('p');
                goalsScored.textContent = scorer.goals;

                div.appendChild(header);
                div.appendChild(goalsScored);

                goldBootElement.appendChild(div)

            })
        })
}