import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { LibraryService } from '../shared/library.service';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent  {
 
  private hovering: boolean = false;

  constructor(private modalService: ModalService,
              private libraryService:LibraryService) { }

  public close() {
    this.modalService.destroy();
  }

  private contains(book: Book): boolean {
    return this.libraryService.myBooks.includes(book);
  }

  addToLibrary(book: Book) {
    this.libraryService.addBook(book);
  }

}
