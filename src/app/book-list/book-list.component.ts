import {Component, Input} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { GoogleBooksService } from "../shared/google-books.service";
import { Book } from '../shared/book';
import { ModalService } from '../services/modal.service';
import { BookInfoComponent } from '../book-info/book-info.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public googleBooksService: GoogleBooksService,
    private modelService: NgbModal,
    public modalService: ModalService ) {}

  show(book: Book) {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(BookInfoComponent, inputs, {}, book);
  }

}
