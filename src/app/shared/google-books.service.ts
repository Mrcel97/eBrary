import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Book } from './book';

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
  public totalResults: number;
  public enlapsedTime: number;


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
    this.enlapsedTime = new Date().getMilliseconds();
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
      .do(_ => (this.enlapsedTime = (this.enlapsedTime - new Date().getMilliseconds())/1000)) 
      .subscribe((books) => this.books = books)
  }

  retrieveBook(bookId: string) {
    //TODO
  }

  /** Version 2.0:
   * Add: country + pdfAviavility + viewable[OPTN] + saleability[OPTN] +
   */
  private bookFactory(item: any): Book {
    return new Book(item.id,
                    item.volumeInfo.title,
                    item.volumeInfo.subTitle,
                    item.volumeInfo.authors,
                    item.volumeInfo.publisher,
                    item.volumeInfo.publishDate,
                    item.volumeInfo.description,
                    item.volumeInfo.categories,
                    item.volumeInfo.imageLinks.thumbnail,
                    item.volumeInfo.imageLinks.smallThumbnail);
  }
}
