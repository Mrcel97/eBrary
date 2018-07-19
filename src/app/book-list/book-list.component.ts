import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { GoogleBooksService } from "../shared/google-books.service";
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private googleBooksService: GoogleBooksService){}

  ngOnInit() {
  }
  
}
