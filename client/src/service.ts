import axios from 'axios';
import { CelebDatum } from './constants';

function pickRandomName(): Promise<string> {
  return new Promise((resolve) => {
    axios.get('data.json').then((res) => {
      const randomIndex = Math.floor(Math.random() * res.data.length);
      resolve(res.data[randomIndex].name);
    });
  });
}

function pickRandomNameOtherThan(name: string): Promise<string[]> {
  return new Promise((resolve) => {
    axios.get('data.json').then((res) => {
      const names = [];
      while (names.length <= 4) {
        const randomIndex = Math.floor(Math.random() * res.data.length);
        if (res.data[randomIndex].name !== name) {
          names.push(res.data[randomIndex].name);
        }
      }
      resolve(names);
    });
  });
}

function pickRandomNameWith(name: string): Promise<string[]> {
  return new Promise((resolve) => {
    axios.get('data.json').then((res) => {
      const names: string[] = [];
      while (names.length <= 2) {
        const randomIndex = Math.floor(Math.random() * res.data.length);
        const randomName = res.data[randomIndex].name;
        if (randomName !== name && !names.includes(randomName)) {
          names.push(res.data[randomIndex].name);
        }
      }
      names.push(name);

      const shuffled = names
        .map((nameTem) => ({ nameTem, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ nameTem }) => nameTem);

      resolve(shuffled);
    });
  });
}

function getImageByName(name: string): Promise<string> {
  return new Promise<string>((resolve) => {
    axios.get('data.json').then((res) => {
      res.data.map((obj: CelebDatum) => {
        if (obj.name === name) {
          resolve(obj.image);
        }
      });
    });
  });
}

function fetchAllCeleb(): Promise<CelebDatum[]> {
  return new Promise<CelebDatum[]>((resolve) => {
    axios.get("http://localhost:5000/game").then((res) => {
      resolve(res.data.questions);
    });
  });
}

export { pickRandomName, pickRandomNameOtherThan, getImageByName, fetchAllCeleb, pickRandomNameWith };
