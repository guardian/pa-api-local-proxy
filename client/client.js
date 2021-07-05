
// const form = document.querySelector("form");
const loadingElement = document.querySelector('.loading');
const goldBootElement = document.querySelector('.goldenboot')
const matchIdElement = document.querySelector('.outputMatchIDResults')
const API_URL_GOLD = 'http://localhost:5000/goldenboot';
const API_URL_WEATHER = 'http://localhost:5000/weather';
const APEYE_URL = "http://localhost:5000/apeye"
const API_MATCHES = "http://localhost:5000/matches"
loadingElement.style.display = 'none'
// form.style.display = ''

const
    submit = document.getElementById('submitName'),
    submit2 = document.getElementById('submitDate');

submit.addEventListener('click', getSearchGold);
submit2.addEventListener('click', getCountryMatch);

function getSearchGold() {
    var playerName = document.getElementById("inputPlayerName").value;
    console.log("PlayerName..", playerName);
    const playerData = { pname: playerName, age: 21 }
    const headers = {
        "Content-Type": "application/json",
        "client_id": "1001125",
        "client_secret": "876JHG76UKFJYGVHf867rFUTFGHCJ8JHV"
    }
    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerData)
    }
    fetch(API_URL_GOLD, options)
        .then(response => response.json())
        .then(playerData => {
            console.log("Returned from Server to Client in client", playerData);
            // form.style.display = ''
            // loadingElement.style.display = 'none'
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


}

function getCountryMatch() {
    var date = document.getElementById("inputDate").value;
    var apikey = document.getElementById("input-api-key").value;
    console.log("Date...", date);
    const countryData = {
        date: date,
        api_key: apikey
    }

    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(countryData)
    }
    fetch(API_MATCHES, options)
        .then(response => response.json())
        .then(matchData => {

            console.log("Returned from Server to Client in client", matchData);

            matchData.match.forEach(element => {
                console.log(element);
                const div = document.createElement('div');

                const header = document.createElement('h5');
                header.textContent = `Match ID: ${element.metaData.matchID}`
                div.appendChild(header);

                const headerHome = document.createElement('h5');
                headerHome.textContent = `Match ID: ${element.homeTeam.teamName}`
                div.appendChild(headerHome);

                const headerAway = document.createElement('h5');
                headerAway.textContent = `Match ID: ${element.awayTeam.teamName}`
                div.appendChild(headerAway);

                matchIdElement.appendChild(div)


            });
            // form.style.display = ''

            // const scorerGoals = document.createElement('h4');
            // scorerGoals.textContent = `Goals Scored: ${matchData.goals}`;

            // const scorerRank = document.createElement('h4');
            // scorerRank.textContent = `Rank: ${matchData.rank}`;


            // div.appendChild(scorerGoals);
            // div.appendChild(scorerRank);


        })

}


// form.addEventListener('submit', (event) => {
//     event.preventDefault()
//     const formData = new FormData(form)
//     const country = formData.get('country')
//     const player = formData.get('player')
//     console.log("Player Name", player);

//     const totalFormData = {
//         player,
//         country
//     }
//     console.log("Forma Data sent from Client in client", totalFormData);
//     form.style.display = 'none'
//     loadingElement.style.display = 'none'

//     // fetch(API_URL_GOLD)
//     //     .then(response => response.json())
//     //     .then(goldbootscorers => {
//     //         console.log("GoldenBootScrs", goldbootscorers);
//     //         goldbootscorers.forEach(scorer => {
//     //             const div = document.createElement('div');

//     //             const header = document.createElement('h3');
//     //             header.textContent = scorer.name;

//     //             const goalsScored = document.createElement('p');
//     //             goalsScored.textContent = scorer.goals;

//     //             div.appendChild(header);
//     //             div.appendChild(goalsScored);

//     //             goldBootElement.appendChild(div)

//     //         })
//     //     })


//     fetch(API_URL_GOLD, {
//         method: "POST",
//         body: JSON.stringify(totalFormData),
//         headers: {
//             'content-type': 'application/json'
//         }
//     }).then(response => response.json())
//         .then(playerData => {
//             console.log("Returned from Server to Client in client", playerData);
//             form.style.display = ''
//             loadingElement.style.display = 'none'
//             const div = document.createElement('div');

//             const header = document.createElement('h4');
//             header.textContent = `Player: ${playerData.name}`

//             const scorerGoals = document.createElement('h4');
//             scorerGoals.textContent = `Goals Scored: ${playerData.goals}`;

//             const scorerRank = document.createElement('h4');
//             scorerRank.textContent = `Rank: ${playerData.rank}`;

//             div.appendChild(header);
//             div.appendChild(scorerGoals);
//             div.appendChild(scorerRank);

//             goldBootElement.appendChild(div)
//             // document.getElementById("country").textContent = "TREEEEEE";
//         })
// })

// function listGoldenBoot() {
//     fetch(API_URL_GOLD)
//         .then(response => response.json())
//         .then(goldbootscorers => {
//             console.log("WeatherFetched", goldbootscorers);
//             goldbootscorers.forEach(scorer => {
//                 const div = document.createElement('div');

//                 const header = document.createElement('h3');
//                 header.textContent = scorer.name;

//                 const goalsScored = document.createElement('p');
//                 goalsScored.textContent = scorer.goals;

//                 div.appendChild(header);
//                 div.appendChild(goalsScored);

//                 goldBootElement.appendChild(div)

//             })
//         })
// }