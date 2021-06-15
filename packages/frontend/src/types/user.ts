interface Player {
  socketId: string;
  user: {
    seat: number;
    name: string;
    money: number;
    bet: number;
    hasActioned: boolean;
    actions: string[],
    isActing: boolean;
    cards: any[];
    role: string | string[];
    status: string;
  }
}

// eslint-disable-next-line import/prefer-default-export
export type { Player };
