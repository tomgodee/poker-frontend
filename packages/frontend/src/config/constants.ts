export const VALUES = {
  ACE: 14,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
};

const cardValues = new Map();
cardValues.set(14, 'Ace');
cardValues.set(2, 'Deuce');
cardValues.set(3, 'Three');
cardValues.set(4, 'Four');
cardValues.set(5, 'Five');
cardValues.set(6, 'Six');
cardValues.set(7, 'Seven');
cardValues.set(8, 'Eight');
cardValues.set(9, 'Nine');
cardValues.set(10, 'Ten');
cardValues.set(11, 'Jack');
cardValues.set(12, 'Queen');
cardValues.set(13, 'King');

export { cardValues };

export const SUITES = {
  HEARTS: 'hearts',
  DIAMONDS: 'diamonds',
  CLUBS: 'clubs',
  SPADES: 'spades',
};

export const ROUNDS = {
  PRE_FLOP: 'pre-flop',
  FLOP: 'flop',
  TURN: 'turn',
  RIVER: 'river',
  SHOWDOWN: 'showdown',
};

export const PLAYER_STATUS = {
  PLAYING: 'playing',
  ALL_IN: 'all-in',
  FOLD: 'fold',
  SIT_OUT: 'sit-out',
};
