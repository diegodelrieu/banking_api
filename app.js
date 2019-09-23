const axios = require('axios');

const clientEmail = 'user2@mail.com';
const clientPassword = 'a!Strongp#assword2';
const clientID = '775683bc70d94beaa8044c81b2f16006';
const clientSecret = 'sMgdYUzUPpo1DxbR67qP2ZbuTmU7H9gikvWPigDnQro9fk0PsRcb4EvI0iRheAJr';
const headers = { 'Bankin-version': '2018-06-15' };

let token = '';

function authenticate() {
  const url = encodeURI(`https://sync.bankin.com/v2/authenticate?email=${clientEmail}&password=${clientPassword}&client_id=${clientID}&client_secret=${clientSecret}`);
  axios.post(url, {}, { headers })
    .then((response) => {
      token = response.data.resources;
    }).catch((error) => {
      console.log('this got triggered first')
      console.log(error);
    });
}

function getBalances() {
  if (token.length === 0) {
    authenticate(clientEmail, clientPassword);
  }

  const url = encodeURI(`https://sync.bankin.com/v2/accounts?limit=10&client_id=${clientID}&client_secret=${clientSecret}`);
  headers.Authorization = `Bearer ${token}`;
  axios.get(url, { headers })
    .then((response) => {
      const accounts = response.data.resources;
      const totalBalance = accounts.reduce((tot, account) => tot += account.balance, 0);
      return totalBalance;
    }).catch((error) => {
      console.log(error);
    });

  headers.Authorization = '';
}


getBalances();
