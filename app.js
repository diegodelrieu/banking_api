const axios = require('axios');

const clientEmail = 'john.doe@email.com';
const clientPassword = 'a!StrongP455word';
const clientID = '5ba0203954494c0182aa67e7c4f4d124';
const clientSecret = 'QFKYNQUkPxpIyOJMAamtOcc0vPOmwE4hfVPtodZcCob0RIPp9Sv6pGFkHKDYwzy6';
const headers = { 'Bankin-version': '2018-06-15' };

async function authenticateAndGetBalances() {
  let token = '';
  // authenticate
  axios.post(`https://sync.bankin.com/v2/authenticate?email=${clientEmail}&password=${clientPassword}&client_id=${clientID}&client_secret=${clientSecret}`, {}, { headers })
    .then((response) => {
      token = response.data.access_token;
      headers.Authorization = `Bearer ${token}`;
      // Access accounts
      return axios.get(`https://sync.bankin.com/v2/accounts?limit=10&client_id=${clientID}&client_secret=${clientSecret}`, { headers });
    })
    .then((response) => {
      const accounts = response.data.resources;
      let totalBalance = 0;
      accounts.forEach((account) => {
        totalBalance += account.balance;
      });
      return totalBalance;
    })
    .catch((error) => {
      console.log(error);
    });
}

authenticateAndGetBalances();
