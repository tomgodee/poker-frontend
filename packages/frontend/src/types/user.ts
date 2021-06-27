interface Player {
  socketId: string;
  user: {
    seat: number;
    name: string;
    currentMoney: number;
    totalMoney: number;
    bet: number;
    hasActioned: boolean;
    actions: string[],
    isActing: boolean;
    cards: any[];
    role: string | string[];
    status: string;
  }
}
interface LoginForm {
  username: string;
  password: string;
}

export type {
  Player,
  LoginForm,
};
