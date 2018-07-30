export class Book {

  constructor(public id: string,
              public title: string,
              public subTitle: string,
              public authors: string[],
              public publisher: string,
              public publishDate: string,
              public description: string,
              public categories: string[],
              public thumbnail: string,
              public smallThumbnail: string,
              public infoLink: string) {
  }

  public checkCorrectness() {
    this.checkIdUndefined(this.id);
    this.checkTitleUndefined(this.title);
    this.checkSubtitleUndefined(this.subTitle);
    this.checkAuthorsUndefined(this.authors);
    this.checkPublisherUndefined(this.publisher);
    this.checkPublishDateUndefined(this.publishDate);
    this.checkDescUndefined(this.description);
    this.checkCategoriesUndefined(this.categories);
    this.checkLinkUndefined(this.infoLink);
  }

  // Default text checker
  private checkIdUndefined(id: string) {
    if ( id != undefined ) {
      return;
    }
    this.id = 'Not defined';
  }

  // Titles checker
  private checkTitleUndefined(term: string) {
    if ( term != undefined ) {
      this.title = term.split(" ").splice(0,15).join(" ");
      return;
    }
    this.title = 'Not defined';
  }

  // Default text checker
  private checkSubtitleUndefined(subTitle: string) {
    if ( subTitle != undefined ) {
      return;
    }
    this.subTitle = 'Not defined';
  }

  // Default text checker
  private checkAuthorsUndefined(authors: string[]) {
    if ( authors != undefined ) {
      return;
    }
    this.authors = []
    this.authors.push('Not defined');
  }

  // Default text checker
  private checkPublisherUndefined(publisher: string) {
    if ( publisher != undefined ) {
      return;
    }
    this.publisher = 'Not defined';
  }

  // Default text checker
  private checkPublishDateUndefined(publishDate: string) {
    if ( publishDate != undefined ) {
      return;
    }
    this.publishDate = 'Not defined';
  }

  // Default text checker
  private checkDescUndefined(desc: string) {
    if ( desc != undefined ) {
      return;
    }
    this.description = 'Not defined';
  }

  // Default text checker
  private checkCategoriesUndefined(categories: string[]) {
    if ( categories != undefined ) {
      return;
    }
    this.categories = []
    this.categories.push('Not defined');
  }

  // Links checker
  private checkLinkUndefined(link: string){
    if( link != undefined ){
      return;
    }
    this.infoLink = '#';
  }

}