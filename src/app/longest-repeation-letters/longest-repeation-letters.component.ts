import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-longest-repeation-letters',
  templateUrl: './longest-repeation-letters.component.html',
  styleUrls: ['./longest-repeation-letters.component.scss']
})
export class LongestRepeationLettersComponent implements OnInit {
  longestRepeatition: string;

  constructor() { }

  ngOnInit(): void {
  }

  getLongestRepeatition = (aString) => {
    if(!aString.length) {
      return '';
    }
    let part = aString[0];
    let longestRepeatition = part;
    for(let i=1; i < aString.length; i++) {
      if(aString[i] == aString[i-1]) {
        part += aString[i];
      } else {
        part = aString[i];
      }
      if(part.length > longestRepeatition.length) {
        longestRepeatition = part;
      }
    }
    // return longestRepeatition;
    this.longestRepeatition = longestRepeatition;
  }

}
