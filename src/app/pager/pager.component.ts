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
  private maxPagItems = 9;
  pager: Page[] = [];

  constructor(
    private googleBooksService: GoogleBooksService,
  ) { }

  ngOnInit() {
    this.pageAmount = 0;
    this.googleBooksService.hasEnded().subscribe(value => { // Hear search service
      this.searchFinish = value;
      
      if (this.searchFinish) {
        this.initPager();
      }
    });
  }

  initPager() {

    // If is a new search reset var.
    if (this.term != this.googleBooksService.query) {
      this.pager = [];
      this.pageAmount = 0;
      this.totalPages = Math.trunc(this.googleBooksService.totalPages - (this.googleBooksService.totalPages/10));
      this.term = this.googleBooksService.query;

      this.getPage(1);
    }

    // Hide left page every 2 pages.
    if (this.actualPage > 2 && !this.goingBack()) {
      this.pager.shift();
    }
    this.checkMaxPag();
    for (let page = this.actualPage; page <= this.lastPage; page++) { //Total Pages except of page 0 (no resusts on it)
      if (this.pager.length < page) {
        this.pageAmount++;
        this.pager.push(new Page(this.pageAmount));
      }
    }
    this.checkGoingBack();
    this.checkGoingForward();
  }

  getPage(num: number): void {
    const minPages = 0;
    const maxPages = 10;
    if ( num < 0 && num > this.totalPages ) {
      return;
    }
    // var > const
    if (minPages < num && num <= this.totalPages) {
      this.actualPage = num;
      this.googleBooksService.changePage(num);
    }
  }

  // Set the Pager max size to maxPageItems or totalPages.
  checkMaxPag(): void {
    this.lastPage = this.totalPages;
    if (this.totalPages > this.maxPagItems) {
      this.lastPage = this.maxPagItems;
    }
  }

  checkGoingBack(): void {
    if (this.goingBack()) {
      this.pager.unshift(new Page(this.actualPage-1));
      if (this.pager.length > this.maxPagItems) {
        this.pageAmount--;
        this.pager.pop();
      }
    }
  }

  checkGoingForward(): void {
    if (this.goingMaxPage() && this.actualPage+1 < this.totalPages) {
      this.pageAmount++;
      this.pager.push(new Page(this.actualPage+1));
      if (this.pager.length > this.maxPagItems) {
        this.pageAmount--;
        this.pager.shift();
      }
    }
  }

  goingBack(): boolean {
    return this.actualPage == this.pager[0].num && this.actualPage != 1;
  }

  goingMaxPage(): boolean {
    return this.actualPage == this.pager[this.pager.length-1].num && this.actualPage != 1;
  }

}
/*
console.log('First num:', this.pager[0].num);
if (this.pager[0].num == page && page != 1) {
  console.log('Go back', 'Page:', page, 'Actual Page:', this.actualPage);
  if (page >= 2) {
    console.log('Adding to beggining', this.actualPage-1);
    this.pager.unshift(new Page(this.actualPage-1));
  }
  console.log('PagerLen:', this.pager.length, 'maxPagerItems:', this.maxPagItems);
  if (this.pager.length == this.maxPagItems) {
    console.log('Popping:', this.pager.pop());
    
    this.pageAmount--;
  }
  console.log(this.pager);
}
*/