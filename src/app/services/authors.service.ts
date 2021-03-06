import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  baseUrl = 'https://api.quotable.io/';

  constructor(
    private http: HttpClient
  ) { }

  fetchAuthors(limit: number, skip: number) {
    const url = this.prepareAuthorsUrl(limit, skip);
    return this.http.get<any>(url);
  }

  fetchAuthor(limit: number, skip: number) {
    const url = this.prepareAuthorsUrl(limit, skip);
    return this.http.get<any>(url);
  }

  prepareAuthorsUrl(limit: number, skip: number) {
    let url = `${this.baseUrl}authors?limit=${limit}&skip=${skip}`;
    return url;
  }

  getFavoriteAuthors() {
    const authors = JSON.parse(localStorage.getItem('favoriteAuthors'));
    return of(authors);
  }
}
