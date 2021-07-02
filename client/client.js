
const form = document.querySelector("form");
const loadingElement = document.querySelector('.loading');
const goldBootElement = document.querySelector('.goldenboot')
const API_URL_GOLD = 'http://localhost:5000/goldenboot';
const API_URL_WEATHER = 'http://localhost:5000/weather';
loadingElement.style.display = 'none'
form.style.display = ''

// listGoldenBoot()

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const country = formData.get('country')
    const player = formData.get('player')
    console.log("Player Name", player);

    const totalFormData = {
        player,
        country
    }
    console.log("Forma Data sent from Client in client", totalFormData);
    form.style.display = 'none'
    loadingElement.style.display = 'none'

    // fetch(API_URL_GOLD)
    //     .then(response => response.json())
    //     .then(goldbootscorers => {
    //         console.log("GoldenBootScrs", goldbootscorers);
    //         goldbootscorers.forEach(scorer => {
    //             const div = document.createElement('div');

    //             const header = document.createElement('h3');
    //             header.textContent = scorer.name;

    //             const goalsScored = document.createElement('p');
    //             goalsScored.textContent = scorer.goals;

    //             div.appendChild(header);
    //             div.appendChild(goalsScored);

    //             goldBootElement.appendChild(div)

    //         })
    //     })


    fetch(API_URL_GOLD, {
        method: "POST",
        body: JSON.stringify(totalFormData),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(playerData => {
            console.log("Returned from Server to Client in client", playerData);
            form.style.display = ''
            loadingElement.style.display = 'none'
            const div = document.createElement('div');

            const header = document.createElement('h4');
            header.textContent = `Player: ${playerData.name}`

            const scorerGoals = document.createElement('h4');
            scorerGoals.textContent = `Goals Scored: ${playerData.goals}`;

            const scorerRank = document.createElement('h4');
            scorerRank.textContent = `Rank: ${playerData.rank}`;

            div.appendChild(header);
            div.appendChild(scorerGoals);
            div.appendChild(scorerRank);

            goldBootElement.appendChild(div)
            // document.getElementById("country").textContent = "TREEEEEE";
        })
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