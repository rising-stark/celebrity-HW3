import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('../public/data.json');
import { fetchAllCeleb, getImageByName, pickRandomName, pickRandomNameWith } from './service';

axios.defaults.baseURL = 'http://localhost:3000/';

describe('Test Apis', () => {
  it(
    'fetch all celeb',
    async () => {
      const res = await fetchAllCeleb();
      expect(res).toMatchObject(data);
    },
    10 * 1000
  );
  it(
    'pick a random name',
    async () => {
      const res = await pickRandomName();
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: res,
            image: expect.any(String),
          }),
        ])
      );
    },
    10 * 1000
  );
  it(
    'pick random names with a given name',
    async () => {
      const name = await pickRandomName();
      const res = await pickRandomNameWith(name);
      expect(name).not.toEqual(expect.arrayContaining(res));
    },
    10 * 1000
  );
  it(
    'get image by name',
    async () => {
      const name = await pickRandomName();
      const res = await getImageByName(name);
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name,
            image: res,
          }),
        ])
      );
    },
    10 * 1000
  );
});
