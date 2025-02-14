import { Injectable } from '@angular/core';
import {JapaneseData} from '../data/japanese-data';
import {FlipCard} from '../data/dto';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  toFlipCard(data: JapaneseData): FlipCard {
    return {
      front: data.jpnSigns + ' ' + data.jpn,
      back: data.eng
    };
  }
}
