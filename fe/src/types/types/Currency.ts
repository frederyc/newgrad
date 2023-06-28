export type Currency = {
  ISO: string,
  symbol: string,
  exchange: number    // The rate to exchange to eur. For example, 1 EUR = 5 RON, so exchange will be 5.0 for RON
}

