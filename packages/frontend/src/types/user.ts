interface Player {
  socketId: string;
  user: {
    name: string;
    money: number;
    seat: number;
    cards: any[];
  }
}

// eslint-disable-next-line import/prefer-default-export
export type { Player };
