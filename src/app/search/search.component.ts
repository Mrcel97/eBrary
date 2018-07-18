import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { GoogleBooksService } from "../shared/google-books.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private term: string = "";
  /**0: Default state.
   * 1: API is searching.
   * 2: No results found.
   */
  private state: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private googleBooksService: GoogleBooksService){
      this.route.params.subscribe( param => { // Hear URL to detect changes.
        console.log(param);
        if (param['term']) {
          this.onSearch(param['term']);
        }
      } )
    }

  doSearch() {
    this.router.navigate(['search', {term: this.term}]) // Change URL.
  }

  onSearch(term: string) {
    var search = this.googleBooksService.searchBooks(term);
    console.log(search);
  }

  ngOnInit() {
  }
  
}