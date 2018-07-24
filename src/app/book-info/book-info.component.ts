import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent  {
 
  private hovering: boolean = false;

  constructor(private modalService: ModalService) { }

  public close() {
    this.modalService.destroy();
  }

  addToLibrary() {
    console.log('Library Service Called!')  }

}
