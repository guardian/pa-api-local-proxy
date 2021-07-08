
// const form = document.querySelector("form");
const loadingElement = document.querySelector('.loading');
const goldBootElement = document.querySelector('.goldenboot')
const matchIdElement = document.querySelector('.outputMatchIDResults')
const matchIdCompIdElement = document.querySelector('.matchCompIDResult')
const API_URL_GOLD = 'http://localhost:5000/goldenboot';
const API_MATCHES = "http://localhost:5000/matches";
const API_COMPID_DATE = "http://localhost:5000/allmatches";
loadingElement.style.display = 'none'
// form.style.display = ''

const
    submit = document.getElementById('submitName'),
    submit2 = document.getElementById('submitDate');
submit3 = document.getElementById('submitMatchCompId');

submit.addEventListener('click', getSearchGold);
submit2.addEventListener('click', getEuroMatch);
submit3.addEventListener('click', getMatchesByCompID)

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

            const header = document.createElement('p');
            header.textContent = `Player: ${playerData.name}`

            const scorerGoals = document.createElement('p');
            scorerGoals.textContent = `Goals Scored: ${playerData.goals}`;

            const scorerRank = document.createElement('p');
            scorerRank.textContent = `Rank: ${playerData.rank}`;

            div.appendChild(header);
            div.appendChild(scorerGoals);
            div.appendChild(scorerRank);

            goldBootElement.appendChild(div)
            // document.getElementById("country").textContent = "TREEEEEE";
        })


}

function getEuroMatch() {
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

                const header = document.createElement('p');
                header.textContent = `Match ID: ${element.metaData.matchID}`
                div.appendChild(header);

                const headerHome = document.createElement('p');
                headerHome.textContent = `Home Team: ${element.homeTeam.teamName}`
                div.appendChild(headerHome);

                const headerAway = document.createElement('p');
                headerAway.textContent = `Away Team: ${element.awayTeam.teamName}`
                div.appendChild(headerAway);

                matchIdElement.appendChild(div)
            });
        })
}

function displayMatchData(element) {
    console.log("El", element);
    const div = document.createElement('div');

    const header = document.createElement('p');
    header.textContent = `Match ID: ${element.metaData.matchID}`
    div.appendChild(header);

    const headerHome = document.createElement('p');
    headerHome.textContent = `Home Team: ${element.homeTeam.teamName}`
    div.appendChild(headerHome);

    const headerHomeScorers = document.createElement('p');
    headerHomeScorers.textContent = `Home Team Scorers: ${element.homeTeam.scorers.__cdata}`
    div.appendChild(headerHomeScorers);

    const headerAway = document.createElement('p');
    headerAway.textContent = `Away Team: ${element.awayTeam.teamName}`
    div.appendChild(headerAway);

    const headerAwayScorers = document.createElement('p');
    headerAwayScorers.textContent = `Away Team Scorers: ${element.awayTeam.scorers.__cdata}`
    div.appendChild(headerAwayScorers);

    matchIdCompIdElement.appendChild(div)
}

function getMatchesByCompID() {
    var date = document.getElementById("inputDateCompID").value;
    var compID = document.getElementById("inputCompID").value;
    var apikey = document.getElementById("input-api-key").value;
    // console.log("CompID...", compID);
    const matchCompIdData = {
        date: date,
        api_key: apikey,
        compID
    }

    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(matchCompIdData)
    }
    fetch(API_COMPID_DATE, options)
        .then(response => response.json())
        .then(matchData => {

            console.log("Returned from Server to Client in client", matchData.match);

            // For multi Matches on Date metaData is followed by Array with 2+ items
            // If only 1 match oin the Date data after metaData is undefined, no indexing.
            if (matchData.match.metaData === undefined) {
                console.log(" MULTI MATCHES");
                matchData.match.forEach(element => {
                    displayMatchData(element);
                })
            } else {
                console.log("SINGLE MATCH");
                console.log(matchData);
                displayMatchData(matchData.match);
            }
        })
}