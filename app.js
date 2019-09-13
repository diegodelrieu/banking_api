const axios = require('axios');

const clientEmail = "user2@mail.com"
const clientPassword = "a!StrongP#assword2"
const clientID = "775683bc70d94beaa8044c81b2f16006"
const clientSecret = "sMgdYUzUPpo1DxbR67qP2ZbuTmU7H9gikvWPigDnQro9fk0PsRcb4EvI0iRheAJr"
const headers = { 'Bankin-version': 2018-06-15 }
let token = ''

// authenticate
function login() {
  axios.post(`https://sync.bankin.com/v2/authenticate?email=${clientEmail}&password=${clientPassword}&client_id=${clientID}&client_secret=${clientSecret}`, headers)
    .then(function (response) {
      token = response.access_token
    })
    .catch(function (error) {
      console.log(error);
    });
  ;
}

// get account balances
function getBalances(token) {
  if (token !== '') {
    axios.get(`https://sync.bankin.com/v2/accounts?limit=10&client_id=${clientID}&client_secret=${clientSecret}`, headers, token)
    .then(function (response){
      const accounts = response.resources
      let totalBalance = 0
      accounts.forEach((account) => {
        balance += account.balance
      })
      return totalBalance
    })
    .catch(function (error) {
      console.log(error);
    });
  } else {
    throw error
  }
}

login()
getBalances(token)