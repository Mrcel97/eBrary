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

  constructor(
    private googleBooksService: GoogleBooksService,
  ) { }

  ngOnInit() {
    this.googleBooksService.hasEnded().subscribe(value => {
      if (value == true) {
        this.initPager();
      }
    });
  }

  initPager() {
    this.totalPages = this.googleBooksService.totalPages;
  }

  getPage(num: number) {
    if (0 < num && num < this.totalPages) {
      if (num + 10 < this.totalPages) {
        this.actualPage = num;
      } else if (num + 10 > this.totalPages) {
        this.actualPage = this.totalPages-8;
      }
      this.googleBooksService.changePage(num);
    }
    console.log(this.actualPage);
  }

}
