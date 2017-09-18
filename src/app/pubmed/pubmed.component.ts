import { Component, Output, EventEmitter } from '@angular/core';

import { PubmedService } from '../shared';
import { PubmedArticle } from '../shared/models/pubmed';

@Component({
  selector: 'app-pubmed',
  templateUrl: './pubmed.component.html',
  styleUrls: ['./pubmed.component.css']
})
export class PubmedComponent {
  @Output() articlesUpdated = new EventEmitter();

  public loading = false;

  performSearch(searchTerm: string, retmax?: number, retstart?: number, sort?: string): void {  
    if(searchTerm.trim() === '') return;
    this.loading = true;
    this.pubmedService.getArticleIdsFromTerm(searchTerm, retmax, retstart, sort)
      .subscribe((ids) => {
        this.pubmedService.getArticlesFromIds(ids)
          .subscribe((articles) => {            
            this.articlesUpdated.emit(articles);
            this.loading = false;
          })
      })
  }

  clearPubmedOptions() {
    this.articlesUpdated.emit([]);
  }  

  checkInputEmpty(event1) {
    console.log(event1);
  }

  constructor(private pubmedService: PubmedService) { }
}
