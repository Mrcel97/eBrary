import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { GoogleBooksService } from "../shared/google-books.service";
import { Book } from '../shared/book';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  term: string = "";
  private books: Book[];
  books$: Observable<Book[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public googleBooksService: GoogleBooksService){
      this.route.params.subscribe( param => { // Hear URL to detect changes.
        if (param['term']) {
          this.onSearch(param['term']);
        }
      } )
    }

  doSearch() {
    this.router.navigate(['search', {term: this.term}]) // Change URL.
  }

  specificSearch(term: string) {
    this.router.navigate(['search', {term: term}]) // Change URL.
  }

  onSearch(term: string) {
    var search = this.googleBooksService.searchBooks(term);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  clearFilter():void {
    this.searchTerms.next('');
  }

  closeAutocomplete(text: string): void {
    if (text != '') {
      this.searchTerms.next('');
    }
  }
 
  ngOnInit(): void {
    this.books$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.googleBooksService.getHeroes(term)),
    );
  }
  
}