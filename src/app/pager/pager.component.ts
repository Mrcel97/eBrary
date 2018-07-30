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
  pager: Page[] = [];

  constructor(
    private googleBooksService: GoogleBooksService,
  ) { }

  ngOnInit() {
    this.googleBooksService.hasEnded().subscribe(value => {
      this.searchFinish = value;
      
      if (this.searchFinish) {
        this.initPager();
      }
    });
  }

  initPager() {
    this.totalPages = this.googleBooksService.totalPages;
    for (let page = this.actualPage; page <= 9; page++) { //Total Pages except of page 0 (no resusts on it)
      this.pager.push( new Page(page) );
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

}
