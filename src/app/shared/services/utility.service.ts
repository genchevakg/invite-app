import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  toCamelCase(value: string) {
    if (!value) {
      return '';
    }
    const words: string[] = value.trim().split(' ');
    return words.reduce((acc, currentWord, index) => {
      if (index === 0) {
        return acc + currentWord[0].toLowerCase() + currentWord.substring(1);
      }
      return acc + currentWord[0].toUpperCase() + currentWord.substring(1);
    }, '');
  }
}
