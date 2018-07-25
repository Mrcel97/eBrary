import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../shared/library.service';
import { Book } from '../shared/book';
import { BookInfoComponent } from '../book-info/book-info.component';
import { ModalService } from '../services/modal.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  private searchFinish: boolean = false;
  books$: Observable<Book[]>;
  private searchTerms = new Subject<string>();
  inputContent: string = '';

  constructor( private libraryService: LibraryService,
               private modalService: ModalService, ) { }

  ngOnInit() {
    this.books$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.libraryService.findInLibrary(term)),
    );
  }

  show(book: Book): void {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(BookInfoComponent, inputs, {}, book);
  }

  search(bookName: string): void {
    this.searchTerms.next(bookName);
    this.filter(bookName);
  }

  clearFilter():void {
    this.searchTerms.next('');
    this.libraryService.clearFilter();
  }

  filter(term: string): void {
    debounceTime(300);
    this.inputContent = term;
    this.libraryService.filterBooks(term);
  }

}
