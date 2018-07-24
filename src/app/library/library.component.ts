import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../shared/library.service';
import { Book } from '../shared/book';
import { BookInfoComponent } from '../book-info/book-info.component';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  private searchFinish: boolean = false;

  constructor( private libraryService: LibraryService,
               private modalService: ModalService, ) { }

  ngOnInit() {
  }

  show(book: Book) {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(BookInfoComponent, inputs, {}, book);
  }

}
