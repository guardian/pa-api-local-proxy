const { response, json, request } = require('express');
const express = require('express');
const cors = require('cors');
var convert = require('xml-js');


// var fs = quire('fs');
const app = express();
const fetch = require('node-fetch')
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.json({ message: "Hey Welcome to home Root!" })
})




app.post('/goldenboot', async function (req, res) {
    console.log("IN GOLD BOOT GET...", req.body.pname);
    const gboot_api_url =
        "https://mobile.guardianapis.com/sport/football/competitions/750/golden-boot"
    const fetch_response = await fetch(gboot_api_url);
    const scorers = await fetch_response.json();

    const playerData = scorers.filter(plr => plr.name == req.body.pname);
    const playerDataResponse = {
        name: playerData[0].name,
        rank: playerData[0].rank,
        goals: playerData[0].goals
    }
    console.log(playerDataResponse);
    res.json(playerDataResponse);
});

app.post('/matches', async function (req, res) {
    // console.log(">>>>>>>+++>>", req.body.api_key);
    const api_input_user = req.body.api_key
    const dateMatch = req.body.date
    const matchDetails = `http://football-api.gu-web.net/v1.5/competition/matchDay/${api_input_user}/750/${dateMatch}`
    const fetch_resp = await fetch(matchDetails)
    const match = await fetch_resp.text()
    console.log(match)

    // var result1 = convert.xml2json(match, { compact: true, spaces: 4 });
    var result2 = convert.xml2json(match, { compact: false, spaces: 4 });
    var parsed = JSON.parse(result2);
    // console.log(parsed)

    const allMatches = parsed.elements[0].elements
    // console.log("ALLL", allMatches);

    const secondMatch = parsed.elements[0].elements[1].elements.find(a => a.name === "awayTeam")
    // console.log("Second", secondMatch);


    const matchIds = parsed.elements[0].elements.map(a => a.attributes.matchID)
    // console.log(">>>", matchIds);

    const matchDataResponse = { matchIds: matchIds }


    res.set('Content-Type', 'application/json');
    res.send(matchDataResponse);
});

app.listen(5000, () => {
    console.log('Listening on port 5000');
})