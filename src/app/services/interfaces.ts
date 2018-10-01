export interface User { // Note: Firebase Auth user will have its own format, but need these also
  email: string;
  displayName: string;
  credits: number;
  history: Array<History>;
}

export interface History {
  ticket: Ticket;
  actualResults: Ticket;
  winnings: number;
  purchaseDate: Date;
  gameId: GameId;
  paymentMethod: Payment;
}

export interface Ticket {
  numbers: Array<number>;
  mega: number;
}

export interface GameId {
  id: string;
}

export interface Payment {
  stripeId: string;
  cashAmount: number;
  creditsAmount: number;
}

export interface Lotteries {
  lotteries: Array<Lottery>;
}

export interface Lottery {
  name: string;
  range: number;
  megaRange: number;
  gameId: string;
  resultsAnnouncedAt: Date;
  prizes: Prizes;
}

export interface Prizes {
  asOfDate: Date;
  values: Array<Results>;
}

export interface Results {
  matchingNumbers: number;
  matchingMega: boolean;
  prizeAmount: number;
}

// // Lottery Data should look like this
// lotteries = [{
//   name: 'powerball',
//   range: 69,
//   megaRange: 26,
//   gameId: '1Zhhdusy7TG8333hnasweSD',
//   resultsAnnouncedAt: new Date(),
//   prizes: {
//     asOfDate: new Date(),
//     values: [{
//       matchingNumbers: 5,
//       matchingMega: true,
//       prizeAmount: 120000000
//     }, {
//       matchingNumbers: 5,
//       matchingMega: false,
//       prizeAmount: 958988
//     }, {
//       matchingNumbers: 4,
//       matchingMega: true,
//       prizeAmount: 23476
//     }, {
//       matchingNumbers: 4,
//       matchingMega: false,
//       prizeAmount: 451
//     }, {
//       matchingNumbers: 3,
//       matchingMega: true,
//       prizeAmount: 135
//     }, {
//       matchingNumbers: 3,
//       matchingMega: false,
//       prizeAmount: 7
//     }, {
//       matchingNumbers: 2,
//       matchingMega: true,
//       prizeAmount: 7
//     }, {
//       matchingNumbers: 1,
//       matchingMega: true,
//       prizeAmount: 4
//     }, {
//       matchingNumbers: 0,
//       matchingMega: true,
//       prizeAmount: 3
//     }]
//   }
// }, {
//   name: 'megamillions',
//   range: 70,
//   megaRange: 25,
//   gameId: '1Zhhdusy7TG8333hnasweSD',
//   resultsAnnouncedAt: new Date(),
//   prizes: {
//     asOfDate: new Date(),
//     values: [{
//       matchingNumbers: 5,
//       matchingMega: true,
//       prizeAmount: 60000000
//     }, {
//       matchingNumbers: 5,
//       matchingMega: false,
//       prizeAmount: 958988
//     }, {
//       matchingNumbers: 4,
//       matchingMega: true,
//       prizeAmount: 23476
//     }, {
//       matchingNumbers: 4,
//       matchingMega: false,
//       prizeAmount: 451
//     }, {
//       matchingNumbers: 3,
//       matchingMega: true,
//       prizeAmount: 135
//     }, {
//       matchingNumbers: 3,
//       matchingMega: false,
//       prizeAmount: 7
//     }, {
//       matchingNumbers: 2,
//       matchingMega: true,
//       prizeAmount: 7
//     }, {
//       matchingNumbers: 1,
//       matchingMega: true,
//       prizeAmount: 4
//     }, {
//       matchingNumbers: 0,
//       matchingMega: true,
//       prizeAmount: 3
//     }]
//   }
// }];
