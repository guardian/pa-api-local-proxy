# pa-api-local-proxy

Currently Press Association Browser has various URL's to request the specific data needed.
For example Teams, Match IDs, Scrorers, Goals, math dates.
Checking various data and results from Press Association api as a result can be tricky and laborious.

By using a local browser like this there is no need to be logged in via the Guardian account.

The aim to allow developers to run this api locally in order to test the data recieved from PA.
This api deals with all the various URLs and endpoints automatically for you.

By running this api locally, all the user needs to do is enter the data as input for the desired results.
This can be done with minimal hassle without the need know all the URLs for the various endpoints: this api does the routing for developers. No need to rememebr and copy and paste different URL for the various results.


 `pa-api-local-proxy` provides an abstraction that makes it easy to write custom elements that:

- contains user-defined inputs to search PA for GoldenBoot scores by name, returning their goals scored and rank
- allows for searching Euro matches by date; returning all matches on that day (all teams, the match IDs)

## Setup

`npm` installs and sets up the project dependencies.

## Run Locally
Server:
-Must be in pa-api-local-proxy/server directory
- `node index.js` builds the project locally, spins up a webserver on http://localhost:5000
-alternatively watch for changes
- `nodemon` builds the project locally, spins up a webserver on http://localhost:5000, and watches for file changes. (https://www.npmjs.com/package/nodemon)

Client:
- `Liver Server` from within VS CODE as a plugin - spins up a webserver on http://127.0.0.1:5500/pa-api-local-proxy/client/index.html

alternatively must be in pa-api-local-proxy/client
- `open index.html` - to open the web page in local browser

## API - Key
- API key for Press Association - found in AWS services for Guardian employees

## Actions Available

Blank form
![image](https://user-images.githubusercontent.com/49187886/125525216-5359f3b0-5764-468a-8333-66842d938595.png)

Goalscorer and Rank:
![image](https://user-images.githubusercontent.com/49187886/125526866-0061f510-a1b3-4432-8637-0458868ddb53.png)

Searching for all matches on a date:
![image](https://user-images.githubusercontent.com/49187886/125526632-705e00cf-379f-4fd3-a887-465d1a2104ac.png)

List of Match IDs for Date:
![image](https://user-images.githubusercontent.com/49187886/125526764-dd90d677-e104-4e0d-8975-c4a55daa6b9a.png)

Search for Any Events based on Match ID
 - We can search for any event in PA for a player
    - "goal" | "free kick" | "shot on target" | "own goal"
One of the issues faced with this endpoint os the structure of the XML data: depending on whether a player has been substituted, scored 1 or more goals will place data in an array or an object. the logic for this takes this into account to 'clean the data'
![image](https://user-images.githubusercontent.com/49187886/125524795-c078bee9-8b49-40b6-96ac-8bf3d6e1e932.png)
