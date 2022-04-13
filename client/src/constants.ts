const currentPlayerLS = "---current---";

interface CelebDatum {
  imgUrl: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_option: string;
}

interface LeaderBoard {
  username: string;
  bestScore: string;
}

export { currentPlayerLS };
export type { CelebDatum, LeaderBoard };
