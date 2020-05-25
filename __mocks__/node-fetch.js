const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox(); // instalar npm i fetch-mock

Object.assign(fetchMock.config, nodeFetch, {
  fetch: nodeFetch,
});

module.exports = fetchMock;
