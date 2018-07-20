import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { BookListComponent } from './book-list/book-list.component';
import { PagerComponent } from './pager/pager.component';
import { BookComponent } from './book/book.component';
import { LibraryComponent } from './library/library.component';
import { BookInfoComponent } from './book-info/book-info.component';

import { GoogleBooksService } from './shared/google-books.service';
import { LibraryService } from './shared/library.service';
import { DomService } from './services/dom.service';
import { ModalService } from './services/modal.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    BookListComponent,
    PagerComponent,
    BookComponent,
    LibraryComponent,
    BookInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [GoogleBooksService, LibraryService, DomService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
