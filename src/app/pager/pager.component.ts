import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../shared/google-books.service';
import { Page } from './page';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  private totalPages: number;
  public searchFinish: boolean = false;
  private actualPage: number = 1;
  private term: string = '';
  private lastPage: number;
  private pageAmount: number = 0;
  pager: Page[] = [];

  constructor(
    private googleBooksService: GoogleBooksService,
  ) { }

  ngOnInit() {
    this.googleBooksService.hasEnded().subscribe(value => {
      this.searchFinish = value;
      
      if (this.searchFinish) {
        if (this.term != this.googleBooksService.query) {
          this.totalPages = this.googleBooksService.totalPages;
          this.term = this.googleBooksService.query;
        }
        this.initPager();
      }
    });
  }

  initPager() {
    // Delete 1st page only if we are on the third page.
    if (this.actualPage > 2) {
      this.pager.shift();
    }
    this.checkMaxPag();
    for (let page = this.actualPage; page < this.lastPage; page++) { //Total Pages except of page 0 (no resusts on it)
      if (this.pager.length < page) {
        this.pageAmount++;
      }
    }
  }

  getPage(num: number) {
    const minPages = 0;
    const maxPages = 10;
    if ( num < 0 && num > this.totalPages ) {
      return;
    }
    // var > const
    if (minPages < num && num < this.totalPages) {
      this.actualPage = num;
      this.googleBooksService.changePage(num);
    }
  }

  // Set the Pager max size to maxPageItems or totalPages.
  checkMaxPag(){
    var maxPagItems = 9;

    this.lastPage = this.totalPages;
    if (this.totalPages > maxPagItems) {
      this.lastPage = maxPagItems;
    }
  }

}
