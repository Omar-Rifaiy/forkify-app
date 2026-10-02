import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const AJAX = async function (API_URL, options) {
  try {
    const fetchPro = fetch(API_URL, options);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    console.log('res', res);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    console.log('From helper.js(AJAX)');
    throw err;
  }
};

export async function getJson(API_URL) {
  try {
    // const res = await Promise.race([fetch(API_URL), timeout(TIMEOUT_SEC)]);

    // const data = await res.json();

    // console.log(res, data);
    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const data = await AJAX(API_URL);
    return data;
  } catch (err) {
    console.log('From helper.js(getJson)');
    throw err;
  }
}

export const sendJson = async function (API_URL, uploadData) {
  try {
    // const fetchPro = fetch(API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   // Body hear(data will be send) is called (payload)
    //   body: JSON.stringify(uploadData),
    // });

    // const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    // console.log('res', res);
    // const data = await res.json();

    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Body hear(data will be send) is called (payload)
      body: JSON.stringify(uploadData),
    };
    const data = await AJAX(API_URL, options);
    return data;
  } catch (err) {
    console.log('From helper.js(sendJson)');

    throw err;
  }
};
