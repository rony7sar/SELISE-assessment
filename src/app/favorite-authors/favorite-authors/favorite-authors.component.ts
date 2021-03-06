import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-favorite-authors',
  templateUrl: './favorite-authors.component.html',
  styleUrls: ['./favorite-authors.component.scss']
})
export class FavoriteAuthorsComponent implements OnInit {
  subscription: Subscription;
  favoriteAuthors: any;
  allFavoriteAuthors: any;
  limit: number;
  skip: number;
  pageNumber: number;

  constructor(
    private authorsService: AuthorsService
  ) { }

  ngOnInit(): void {
    this.limit = 6;
    this.skip = 0;
    this.fetchFavoriteAuthors();
  }

  fetchFavoriteAuthors() {
    this.subscription = this.authorsService.getFavoriteAuthors().subscribe(data => {
      if(data) {
        this.allFavoriteAuthors = data;
        this.prepareAuthorsList();
      }
    })
  }

  // using two seperate methods (i.e. getNextAuthors() & getPreviousAuthors()) would give more simplicity, but that would involve some code repeatition
  getMoreAuthors(next: boolean = true) {
    // When we are on the last page and want to go back
    if(!this.skip) {
      const remainder = this.allFavoriteAuthors.length % this.limit;
      this.skip = remainder == 0 ? this.allFavoriteAuthors.length : (this.allFavoriteAuthors.length - remainder + this.limit);
    }
    if(next || (!next && this.limit < this.skip)) {      
      this.skip = next ? (this.skip) : (this.skip - (2 * this.limit));
      this.prepareAuthorsList();
    }
  }

  prepareAuthorsList() {
    const allAuthors = [...this.allFavoriteAuthors];
    // current skip cannot start at less than zero
    const start = this.skip < 0 ? 0 : this.skip;
    const remaining = allAuthors.length - start;
    // limit cannot be bigger than remaining items
    const end = this.limit > remaining ? (start + remaining) : (start + this.limit);
    this.favoriteAuthors = allAuthors.slice(start, end);
    this.skip = this.limit < remaining ? (start + this.limit) : null;
    this.pageNumber = Math.ceil((this.skip ? this.skip : this.allFavoriteAuthors.length) / this.limit);
  }

  removeFavoriteAuthor(index) {
    const removedAuthors = this.favoriteAuthors.splice(index, 1);
    this.allFavoriteAuthors = this.allFavoriteAuthors.filter(favAuthor => favAuthor._id != removedAuthors[0]._id);
    localStorage.setItem('favoriteAuthors', JSON.stringify(this.allFavoriteAuthors));

    // Get/Set current value of skip
    this.skip = this.skip ? this.skip : (this.allFavoriteAuthors.length - (this.allFavoriteAuthors.length % this.limit) + this.limit);
    // Get next value of skip
    this.skip = this.favoriteAuthors.length ? (this.skip - this.limit) : (this.skip - (2 * this.limit));
    if(!this.favoriteAuthors.length) {
    }
    this.prepareAuthorsList();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
