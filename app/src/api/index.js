import { API_HOST } from '../constants';

export async function getCollectionTokens(owner) {
  return await fetch(`${API_HOST}/collection/?owner=${owner}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`Error: ${response.status}`);
    })
    .then((response) => response.json())
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getSaleTokens() {
  return await fetch(`${API_HOST}/sale/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`Error: ${response.status}`);
    })
    .then((response) => response.json())
    .catch((err) => {
      throw new Error(err);
    });
}
