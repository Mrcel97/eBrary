import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Book } from './book';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
declare var require: any

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private API_PATH: string = 'https://www.googleapis.com/books/v1/volumes';
  public loading: boolean = false;
  public haveBooks: boolean = true;
  public initialised: boolean = false;
  private ended: BehaviorSubject<boolean>;
  public totalItems: number = 0;
  public _page: number = 1;
  public pageSize: number = 10;
  public query: string = "";
  public books: Book[];
  public totalResults: number;
  public enlapsedTime: number;
  private imageNotFound = require('../media/no-image.png');
 

  constructor(private http: Http) {
    this.ended = new BehaviorSubject<boolean>(false);
  }

  get startIndex() {
    return (this._page - 1) * this.pageSize;
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
    return this._page;
  }

  changePage(num: number) {
    if (num != this._page) {
      this._page = num;
      this.searchBooks(this.query);
    }
  }

  set page(val: number) {
    //TODO
  }

  public searchBooks(queryTitle: string) {
    this.query = queryTitle;
    this.loading = true;
    const initialTime = window.performance.now();
    this.initialised = true;
    this.books = [];
    this.http.get(`${this.API_PATH}?q=${this.query}&maxResults=${this.pageSize}&startIndex=${this.startIndex}`)
      .map(res => res.json())
      .do(data => {
        this.totalItems = data.totalItems;
      })
      .map(data => {
        this.totalResults = data.totalItems ? data.totalItems : [] ; // GET totalResults
        return data.items ? data.items : []; // GET 10 firsts books
      })
      .map(items => {
        return items.map(item => this.bookFactory(item))
      })
      .do(_ => this.loading = false)
      .do(_ => (this.enlapsedTime = ( Math.round( (window.performance.now() - initialTime ))/1000 ) ) )
      .subscribe((books) => {
        if (books.length != 0) {
          this.books = books;
        } else {
          this.haveBooks = false;
        }
        this.ended.next(true);
      })
  }

  hasEnded(): Observable<boolean> {
    return this.ended.asObservable();
  }

  updateBooksAmount(){
    if (this.books.length == 0) {
      this.haveBooks = false;
      alert("Have No Books");
    }
  }

  retrieveBook(bookId: string) {
    //TODO
  }

  /** Version 2.0:
   * Add: country + pdfAviavility + viewable[OPTN] + saleability[OPTN] +
   */
  private bookFactory(item: any): Book {
    try {
      return new Book(item.id,
        item.volumeInfo.title,
        item.volumeInfo.subtitle,
        item.volumeInfo.authors,
        item.volumeInfo.publisher,
        item.volumeInfo.publishedDate,
        item.volumeInfo.description,
        item.volumeInfo.categories,
        item.volumeInfo.imageLinks.thumbnail,
        item.volumeInfo.imageLinks.smallThumbnail);
    } catch (TypeError) {
      return new Book(item.id,
        item.volumeInfo.title,
        item.volumeInfo.subtitle,
        item.volumeInfo.authors,
        item.volumeInfo.publisher,
        item.volumeInfo.publishedDate,
        item.volumeInfo.description,
        item.volumeInfo.categories,
        this.imageNotFound,
        this.imageNotFound);
    }
  }
}
