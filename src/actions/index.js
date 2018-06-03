import axios from 'axios';

export const CREATE_USER = 'create_user';
export const GET_USER = 'get_user';
export const CHANGE_PASSWORD = 'change_password';
export const AUTHENTICATE_USER = 'authenticate_user';

export const GET_CHARTITIES = 'get_charities';
export const GET_CHARITY = 'get_charity';

export const DONATE = 'donate';
export const GET_DONATIONS = 'get_donations';
export const GET_DONATION = 'get_donation';
export const DELETE_DONATION = 'delete_donation';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
console.log("REACT_APP_API_URL", REACT_APP_API_URL);

// create new user
export function createUser(values, callback) {
  const request = axios.post(`${REACT_APP_API_URL}/users/create`, values)
    .then(()=> callback())
    .catch (error => {
      callback(error);
    });

  return {
    type: CREATE_USER,
    payload: request
  }
}

// get user
export function getUser(id) {
  const request = axios.get(`${REACT_APP_API_URL}/users/${id}`);

  return {
    type: GET_USER,
    payload: request
  }
}

// change password
export function changePassword(values, callback) {
  values.userId = localStorage.getItem('userId');
  const request = axios.post(`${REACT_APP_API_URL}/users/changePassword`, values)
    .then(()=> callback())
    .catch (error => {
      callback(error);
    });

  return {
    type: CHANGE_PASSWORD,
    payload: request
  }
}

// authenticate the user
export function authenticate(values, callback) {
  const request = axios.post(`${REACT_APP_API_URL}/users/authenticate`, values)
    .then( response  => {
        callback(null, response);
    })
    .catch (error => {
      callback(error);
    });

  return {
    type: AUTHENTICATE_USER,
    payload: request
  }
}

// get all charities
export function getCharities() {
  const request = axios.get(`${REACT_APP_API_URL}/charities`);
  return {
    type: GET_CHARTITIES,
    payload: request
  };
}

// get charity
export function getCharity(id) {
  const request = axios.get(`${REACT_APP_API_URL}/charities/${id}`);
  return {
    type: GET_CHARITY,
    payload: request
  }
}

// donate to charity
export function donate(userId, charity, amount, callback) {
  const request = axios.post(`${REACT_APP_API_URL}/donations?userId=${userId}&charityName=${charity.name}&amount=${amount}`)
    .then( response => {
        callback(null, response);
    })
    .catch (error => {
      callback(error);
    });
  return {
    type: DONATE,
    payload: request
  }
}

// get all donations
export function getDonations(userId) {
  const request = axios.get(`${REACT_APP_API_URL}/donations/${userId}`);
  return {
    type: GET_DONATIONS,
    payload: request
  }
}

// delete donation
export function deleteDonation(id, callback) {
  const request = axios.delete(`${REACT_APP_API_URL}/donations/${id}`)
    .then(()=>callback());
  // console.log(request);
  return {
    type: DELETE_DONATION,
    payload: id
  }
}
