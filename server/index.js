const { response, json, request } = require('express');
const express = require('express');
const cors = require('cors');
var parser = require('fast-xml-parser');
var he = require('he');

var options = {
    attributeNamePrefix: "",
    attrNodeName: "metaData", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),//default is a=>a
    tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};

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
    res.json(playerDataResponse);
});

app.post('/matches', async function (req, res) {
    // console.log(">>>>>>>+++>>", req.body.api_key);
    const api_input_user = req.body.api_key
    const dateMatch = req.body.date
    const matchDetails = `http://football-api.gu-web.net/v1.5/competition/matchDay/${api_input_user}/750/${dateMatch}`
    const fetch_resp = await fetch(matchDetails)
    const match = await fetch_resp.text()

    if (parser.validate(match) === true) { //optional (it'll return an object in case it's not valid)
        var jsonObj = parser.parse(match, options);
        console.log("ADDED XML:", jsonObj.matches.match)
    }


    const matchDataResponse = jsonObj.matches
    res.set('Content-Type', 'application/json');
    res.send(matchDataResponse);
});

app.post('/allmatches', async function (req, res) {
    const api_input_user = req.body.api_key;
    const dateMatch = req.body.date;
    const compID = req.body.compID;
    console.log("Body from /allmatches", req.body)
    const matchDetails = `http://football-api.gu-web.net/v1.5/competition/matchDay/${api_input_user}/${compID}/${dateMatch}`
    const fetch_resp = await fetch(matchDetails)
    const match = await fetch_resp.text()

    if (parser.validate(match) === true) { //optional (it'll return an object in case it's not valid)
        var jsonObj = parser.parse(match, options);
        console.log("All Matches XML:", jsonObj.matches.match)
    }

    const matchDataResponse = jsonObj.matches
    console.log("All matches: ", matchDataResponse.match);
    res.set('Content-Type', 'application/json');
    res.send(matchDataResponse);
});

app.post('/matchlineupevents', async function (req, res) {
    const api_input_user = req.body.api_key
    const eventType = req.body.eventType;
    const matchID = req.body.matchID
    console.log("Body from /matchlineupevents", req.body)

    const matchEventDetails = `http://football-api.gu-web.net/v1.5/match/lineUps/${api_input_user}/${matchID}`
    const fetch_resp = await fetch(matchEventDetails)
    const match = await fetch_resp.text()
    if (parser.validate(match) === true) {
        var jsonObj = parser.parse(match, options);
        console.log("ADDED XML from Events:", jsonObj)
    }
    const matchDataResponse = jsonObj
    res.set('Content-Type', 'application/json');
    res.send(matchDataResponse);
});

app.listen(5000, () => {
    console.log('Listening on port 5000');
})