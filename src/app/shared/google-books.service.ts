import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Book } from './book';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
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
  public active: boolean = false;
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

  public searchBooks(queryTitle: string) {
    this.ended.next(false);
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
        this.haveBooks = books.length != 0;

        if (this.haveBooks) {
          this.books = books;
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

  private bookFactory(item: any ): Book {
    var book: Book ;
    var images: string[] = item.volumeInfo.imageLinks;

    images = this.checkThumbnailUndefined(images);

    book = new Book(item.id,
      item.volumeInfo.title,
      item.volumeInfo.subtitle,
      item.volumeInfo.authors,
      item.volumeInfo.publisher,
      item.volumeInfo.publishedDate,
      item.volumeInfo.description,
      item.volumeInfo.categories,
      images[0],
      images[1],
      item.volumeInfo.infoLink);
    book.checkCorrectness();
    return book;
  }

  private checkThumbnailUndefined(image: any): string[] {
    if ( image == undefined ) {
      return [this.imageNotFound, this.imageNotFound]
    }
    return [image.thumbnail, image.smallThumbnail]
  }

  // Autocomplete - code
  getBooks(term: string): Observable<Book[]> {
    if (!term.trim()) {
      // if no search term, return empty array.
      return of([]);
    }
    return this.http.get(`${this.API_PATH}?q=${term}&maxResults=${this.pageSize}&startIndex=${this.startIndex}`)
      .map(res => res.json()) //Map response as JSON.
      .map(data => {
        return data.items ? data.items : [];
      })
      .map(items => { //Map items of JSON to convert into Books Objects.
        return items.map(item => this.bookFactory(item))
      })

  }

}
