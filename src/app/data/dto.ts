export interface FlipCard {
  front: string;
  back: string;
}

export interface LearnData {
  label: string,
  frontTitle: string;
  backTitle: string;
  cards: FlipCard[]
  isFlagged: boolean;
}
