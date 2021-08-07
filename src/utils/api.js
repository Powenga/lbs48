import { API_URL } from './constants.js';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  static _onError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  sendMail(data) {
    return fetch(`${this._baseUrl}/mail`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(Api._onError);
  }
}

export default new Api({
  baseUrl: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
