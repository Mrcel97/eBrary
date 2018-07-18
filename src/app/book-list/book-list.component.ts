import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { LibraryComponent } from '../library/library.component';
import { GoogleBooksService } from '../shared/google-books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getBook(bookId: string) {
    //TODO
  }

  hasBook(book: Book): boolean {
    //TODO
    return true;
  }

  addBook(book: Book) {
    //TODO
  }

  removeBook(book: Book) {
    //TODO
  }

}
