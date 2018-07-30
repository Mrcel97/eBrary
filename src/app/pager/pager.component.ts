import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../shared/google-books.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  private totalPages: number;
  private actualPage: number = 1;
  public searchFinish: boolean = false;

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
  }

  getPage(num: number) {
    const minPages = 0;
    const maxPages = 10;

    if ( num < 0 && num > this.totalPages ) {
      return;
    }
    // var > const
    if (minPages < num && num < this.totalPages) {
      if (num + maxPages < this.totalPages) {
        this.actualPage = num;
      }
      this.googleBooksService.changePage(num);
    }
  }

}
