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
 
  public hovering: boolean = false;

  constructor(public modalService: ModalService,
              private libraryService:LibraryService) { }

  public close() {
    this.modalService.destroy();
  }

  public contains(book: Book): boolean {
    return this.libraryService.myBooks.includes(book);
  }

  addToLibrary(book: Book) {
    this.libraryService.addBook(book);
  }

  removeFromLibrary(book: Book){
    this.libraryService.removeBook(book);
  }

  redirectTo(link: string){
    console.log("redirect to: ", link);
    window.open(link, '_blank');
  }

}
