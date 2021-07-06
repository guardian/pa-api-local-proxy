# pa-api-local-proxy

Currently Press Association Browser has various URL's to request the specific data needed.
For example Teams, Match IDs, Scrorers, Goals, math dates.
Checking various data and results from Press Association api as a result can be tricky and laborious.

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
Must be in pa-api-local-proxy/server directory
`node index.js` builds the project locally, spins up a webserver on http://localhost:5000
alternatively watch for changes
`nodemon` builds the project locally, spins up a webserver on http://localhost:5000, and watches for file changes. (https://www.npmjs.com/package/nodemon)

Client:
`Liver Server` from within VS CODE as a plugin - spins up a webserver on http://127.0.0.1:5500/pa-api-local-proxy/client/index.html
alternatively must be in pa-api-local-proxy/client
`open index.html` - to open the web page in local browser

## API - Key
- API key for Press Association - found in AWS services for Guardian employees
