export interface Flight {
  airline: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  source: string;
}

export interface SearchParams {
  origin: string;
  destination: string;
  date: string;
}
