import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  myBooks: Book[] = [];

  constructor() { }

  private save() {
    localStorage.setItem( 'myBooks', JSON.stringify(this.myBooks) );
  }

  private load() {
    var books = localStorage.getItem('myBooks');
    /**
     * 0 Books -> return;
     * 
     * X Books -> 
     *            return localStorage.getItem('myBooks') [  ]
     */
  }

  addBook(book: Book) {
    if ( book != undefined && !this.myBooks.includes(book) ) {
      this.myBooks.push(book);
    }
  }

  removeBook(book: Book) {
    //TODO
  }

  hasBook(book: Book): boolean {
    //TODO
    return true;
  }

  indexOf(book: Book): number {
    //TODO
    return 0;
  }

}
