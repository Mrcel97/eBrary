import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor() { }

  private save() {
    //TODO
  }

  private load() {
    //TODO
  }

  addBook(book: Book) {
    //TODO
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
