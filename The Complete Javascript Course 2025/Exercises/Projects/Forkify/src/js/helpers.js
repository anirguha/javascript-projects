import { TIMEOUT_SECONDS } from './config.js';

const timeout = function (s) {
  const promise = new Promise((_, reject) => {
    setTimeout(
      () =>
        reject(
          new Error(
            `Operations took too much time! timing out after ${s} seconds`
          )
        ),
      s * 1000
    );
  });
  return promise;
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);

    if (!response.ok) throw new Error('Recipe not found. Please try a new one');

    const data = await response.json();

    if (Array.isArray(data?.data?.recipes) && data.data.recipes.length === 0) {
      throw new Error('Invalid query. Please try a new one');
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);

    if (!response.ok) throw new Error('Recipe not found. Please try a new one');

    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
};
