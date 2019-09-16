const axios = require('axios');

const clientEmail = 'user2@mail.com';
const clientPassword = 'a!Strongp#assword2';
const clientID = '775683bc70d94beaa8044c81b2f16006';
const clientSecret = 'sMgdYUzUPpo1DxbR67qP2ZbuTmU7H9gikvWPigDnQro9fk0PsRcb4EvI0iRheAJr';
const headers = { 'Bankin-version': '2018-06-15' };

function authenticateAndGetBalances() {
  let token = '';
  // authenticate
  axios.post(`https://sync.bankin.com/v2/authenticate?email=${clientEmail}&password=${clientPassword}&client_id=${clientID}&client_secret=${clientSecret}`, {}, { headers })
    .then((response) => {
      token = response.data.access_token;
      headers.Authorization = `Bearer ${token}`;
      // Access accounts
      axios.get(`https://sync.bankin.com/v2/accounts?limit=10&client_id=${clientID}&client_secret=${clientSecret}`, { headers });
    })
    .then((response) => {
      const accounts = response.data.resources;
      let totalBalance = 0;
      accounts.forEach((account) => {
        totalBalance += account.balance;
      });
      console.log(totalBalance)
      return totalBalance;
    })
    .catch((error) => {
      console.log(error);
    });
}

authenticateAndGetBalances();
