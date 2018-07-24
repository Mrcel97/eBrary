import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  myBooks: Book[] = [];

  constructor() { }

  private save() { //Testing JSON not usable.
    localStorage.setItem( 'myBooks', JSON.stringify(this.myBooks) );
  }

  private load() { //Testing JSON not usable.
    var stored = JSON.parse(localStorage.getItem('myBooks'));
    JSON.parse(localStorage.getItem('myBooks')).forEach(element => {
      this.myBooks.push( new Book(element.id,
                                  element.title,
                                  element.subTitle,
                                  element.authors,
                                  element.publisher,
                                  element.publishDate,
                                  element.description,
                                  element.categories,
                                  element.thumbnail,
                                  element.smallThumbnail) )
    });
  }

  addBook(book: Book) {
    if ( book != undefined && !this.hasBook(book) ) {
      this.myBooks.push(book);
    }
  }

  removeBook(book: Book) {
    const index: number = this.indexOf(book);
    if (index !== -1) {
        this.myBooks.splice(index, 1);
    } 
  }

  hasBook(book: Book): boolean {
    return this.myBooks.includes(book);
  }

  indexOf(book: Book): number {
    return this.myBooks.indexOf(book);
  }

}
