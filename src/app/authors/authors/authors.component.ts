import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  subscription: Subscription;
  authors: any;
  favoriteAuthors: any[] = [];
  limit: number;
  skip: number;
  pageNumber: number;
  totalCount: number;
  showPagination: boolean;
  authorsFetched: boolean;
  favoriteAuthorsFetched: boolean;

  constructor(
    private authorsService: AuthorsService
  ) { }

  ngOnInit(): void {
    this.limit = 6;
    this.skip = 0;
    this.fetchFavoriteAuthors();
    this.fetchAuthors();
  }

  fetchAuthors() {
    this.showPagination = false;
    this.authorsService.fetchAuthors(this.limit, this.skip).subscribe(data => {
      if(data) {
        this.authors = data.results;
        this.authorsFetched = true;
        // Avoided using ForkJoin as I want to unsubscribe from RxJs observable (fetchFavoriteAuthors()) seperately
        if(this.favoriteAuthorsFetched) {
          this.processAuthorsInfo();
        }
        this.skip = +data.lastItemIndex;
        this.totalCount = +data.totalCount;
        this.pageNumber = Math.ceil((this.skip ? this.skip : this.totalCount) / this.limit);
        this.showPagination = true;
      }
    });
  }
  
  processAuthorsInfo() {
    this.favoriteAuthors.map(favAuthor => {
      const index = this.authors.findIndex(author => author._id == favAuthor._id);
      if(index != -1) {
        this.authors[index].favorite = true;
      }
    })    
  }

  fetchFavoriteAuthors() {
    this.subscription = this.authorsService.getFavoriteAuthors().subscribe(data => {
      if(data) {
        this.favoriteAuthors = data;
        this.favoriteAuthorsFetched = true;
        if(this.authorsFetched) {
          this.processAuthorsInfo();
        }
      }
    })
  }

  getMoreAuthors(next: boolean = true) {
    this.skip = this.skip ? this.skip : (this.totalCount - (this.totalCount % this.limit) + this.limit);
    if(next || (!next && this.limit < this.skip)) {      
      this.skip = next ? (this.skip) : ((this.skip ? this.skip : this.totalCount) - (2 * this.limit));
      this.fetchAuthors();
    }
  }

  addFavoriteAuthor(index) {
    this.authors[index].favorite = true;
    const i = this.favoriteAuthors.findIndex(favAuthor => favAuthor._id == this.authors[index]._id);
    if(i == -1) {      
      this.favoriteAuthors.push(this.authors[index]);
      localStorage.setItem('favoriteAuthors', JSON.stringify(this.favoriteAuthors));
    }
  }

  removeFavoriteAuthor(index) {
    this.authors[index].favorite = false;
    const author = this.authors[index];
    this.favoriteAuthors = this.favoriteAuthors.filter(favAuthor => favAuthor._id !== author._id);
    localStorage.setItem('favoriteAuthors', JSON.stringify(this.favoriteAuthors));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
