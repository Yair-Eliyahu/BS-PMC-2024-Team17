// // jest.setup.js
// import '@testing-library/jest-dom/';

import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
global.ReadableStream = require('stream/web').ReadableStream;