import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../shared/library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  private searchFinish: boolean = false;

  constructor( private libraryService: LibraryService ) { }

  ngOnInit() {
  }

  

}
