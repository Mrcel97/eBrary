import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { LibraryComponent } from '../library/library.component';
import { Router, ActivatedRoute } from '@angular/router';


import { LibraryService } from '../shared/library.service';
import { GoogleBooksService } from '../shared/google-books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private googleBooksService: GoogleBooksService,
              private router: Router,
              private route: ActivatedRoute,
              private libraryService: LibraryService) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['bookId']) {
        this.getBook(params['bookId']);
      }
    })
  }

  ngOnInit() {
  }

  getBook(bookId: string) {
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