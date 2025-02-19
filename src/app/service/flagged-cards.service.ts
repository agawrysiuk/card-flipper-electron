import {Injectable} from '@angular/core';
import {FlipCard} from '../data/dto';
import {BehaviorSubject} from 'rxjs';

export enum FlaggedCardSet {
  JAPANESE = 'japanese',
}

@Injectable({
  providedIn: 'root'
})
export class FlaggedCardsService {

  public flagged: BehaviorSubject<FlipCard[]> = new BehaviorSubject<FlipCard[]>(this.getFlagged(FlaggedCardSet.JAPANESE));

  addToFlagged(card: FlipCard, setName: FlaggedCardSet) {
    const set = this.getFlagged(setName);
    if (set.find(c => c.front === card.front && c.back === card.back) === undefined) {
      set.push(card);
      localStorage.setItem(`flagged-${setName}`, JSON.stringify(set));
      this.flagged.next(set);
    }
  }

  getFlagged(setName: FlaggedCardSet): FlipCard[] {
    const flagged = localStorage.getItem(`flagged-${setName}`);
    return flagged ? JSON.parse(flagged) : [];
  }

  removeFromFlagged(card: FlipCard, setName: FlaggedCardSet) {
    const set = this.getFlagged(setName);
    if (set.find(c => c.front === card.front && c.back === card.back) !== undefined) {
      const set = this.getFlagged(setName);
      const index = set.findIndex(c => c.front === card.front && c.back === card.back);
      set.splice(index, 1);
      localStorage.setItem(`flagged-${setName}`, JSON.stringify(set));

      this.flagged.next(set);
    }
  }
}
