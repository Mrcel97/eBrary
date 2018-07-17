import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Book } from './book';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private API_PATH: string = 'https://www.googleapis.com/books/v1/volumes';
  public loading: boolean = false;
  public initialised: boolean = false;
  public totalItems: number = 0;
  public _page: number = 1;
  public pageSize: number = 10;
  public query: string = "";
  public books: Book[];


  constructor(private http: Http) {
  }

  get startIndex() {
    return this.page * this.pageSize;
  }

  get totalPages() {
    try {
      return Math.ceil(this.totalItems / this.pageSize);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  get page(): number {
    //TODO
    return 0;
  }

  set page(val: number) {
    //TODO
  }

  public searchBooks(queryTitle: string) {
    this.query = queryTitle;
    this.loading = true;
    this.initialised = true;
    this.books = [];
    this.http.get(`${this.API_PATH}?q=${this.query}&maxResults=${this.pageSize}&startIndex=${this.startIndex}`)
      .map(res => res.json())
      .do(data => {
        this.totalItems = data.totalItems;
      })
      .map(data => {
        return data.items ? data.items : [];
      })
      .map(items => {
        return items.map(item => this.bookFactory(item))
      })
      // .do(books => console.log(books))
      .do(_ => this.loading = false)
      .subscribe((books) => this.books = books)
  }

  retrieveBook(bookId: string) {
    //TODO
  }

  private bookFactory(item: any)/*: Book*/ {
    //TODO
  }
}
