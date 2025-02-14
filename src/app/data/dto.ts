export interface FlipCard {
  front: string;
  back: string;
}

export interface DayData {
  day: string,
  frontTitle: string;
  backTitle: string;
  cards: FlipCard[]
}
