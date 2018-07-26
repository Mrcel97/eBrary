import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of, Subject, observable } from 'rxjs';
import { partition } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  myBooks: Book[] = [];
  filteredBooks: Book[] = [];

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
                                  element.smallThumbnail,
                                  element.infoLink) )
    });
  }

  addBook(book: Book): void {
    if ( book != undefined && !this.hasBook(book) ) {
      this.myBooks.push(book);
      this.filteredBooks.push(book);
    }
  }

  removeBook(book: Book): void {
    const index: number = this.myBooks.indexOf(book);
    if (index !== -1) {
      this.myBooks.splice(index, 1);
      this.filteredBooks.splice(index, 1);
    }
  }

  findInLibrary(term: string): Observable<Book[]>{
    let partialResult: Book[] = [];

    if (!term.trim()) { //Not a searchabble term.
      return of([]);
    }
    const result = new Observable<Book[]>( (observer) => {
      partialResult = this.filterArrayUsing(this.myBooks, term);
      observer.next(partialResult);
    });
    return result;
  }

  hasBook(book: Book): boolean {
    return this.myBooks.includes(book);
  }

  indexOf(book: Book): number {
    return this.myBooks.indexOf(book);
  }

  filterBooks(term: string): void {
    if (term == ''){
      this.filteredBooks = this.myBooks.slice();
    } else {
      this.filteredBooks = this.filterArrayUsing(this.myBooks, term);
    }
  }

  clearFilter(): void {
    this.filteredBooks = this.myBooks.slice();
  }

  //No indexOf == ++speed
  private filterArrayUsing(stream: Book[], term: string): Book[] {
    let partialResult: Book[] = [];

    this.myBooks.forEach(book => {
        if (book.title.toUpperCase().includes(term.toUpperCase())) {
          partialResult.push(book);
        }
      });
    return partialResult;
  }

}
