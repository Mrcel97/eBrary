import { Injectable, Component } from '@angular/core';
import { DomService } from './dom.service';
import { Book } from '../shared/book';
import { BookInfoComponent } from '../book-info/book-info.component';

@Injectable()
export class ModalService {

  constructor(private domService: DomService) { }

  private modalElementId = 'modal-container';
  private overlayElementId = 'overlay';
  public book: Book;

  init(component: any, inputs: object, outputs: object, book: Book) {
    let componentConfig = {
      inputs:inputs,
      outputs:outputs
    }
    this.book = book;
    console.log(this.book);
    this.domService.appendComponentTo(this.modalElementId, component, componentConfig);
    document.getElementById(this.modalElementId).className = 'show';
    document.getElementById(this.overlayElementId).className = 'show';
  }

  destroy() {
    this.domService.removeComponent();
    document.getElementById(this.modalElementId).className = 'hidden';
    document.getElementById(this.overlayElementId).className = 'hidden';
  }
}