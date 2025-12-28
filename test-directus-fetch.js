// test-directus-fetch.js
// Минимальный тест fetch к Directus из Node.js (ESM)


import https from 'https';


const url = 'https://smysl-bakery-directus.onrender.com/items/header';


(async () => {
  try {
    const agent = new https.Agent({ minVersion: 'TLSv1.2', rejectUnauthorized: false });
    const res = await fetch(url, { agent });
    const json = await res.json();
    console.log('Успех! Ответ:', json);
  } catch (err) {
    console.error('Ошибка fetch:', err);
  }
})();
