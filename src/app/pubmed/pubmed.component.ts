import { Component, OnInit } from '@angular/core';

import { PubmedService, UrlSizeLimiterPipe } from '../shared';
import { PubmedArticle } from '../shared/models/pubmed';

@Component({
  selector: 'app-pubmed',
  templateUrl: './pubmed.component.html',
  styleUrls: ['./pubmed.component.css']
})
export class PubmedComponent implements OnInit {

  private ids: string[];
  private articles: PubmedArticle[];
  private term: string = 'Simon Lykkemark'  

  private loading = false;

  makeArticleUrl(article: PubmedArticle) {
    return this.pubmedService.getArticleUrl(article);
  }

  constructor(private pubmedService: PubmedService) { }

  ngOnInit() {  
  }

  performSearch(searchTerm: string, retmax?: number, retstart?: number, sort?: string): void {    
    this.loading = true;
    this.pubmedService.getArticleIdsFromTerm(searchTerm, retmax, retstart, sort)
      .subscribe((ids) => {
        this.pubmedService.getArticlesFromIds(ids)
          .subscribe((articles) => {            
            this.articles = articles;
            this.loading = false;
          })
      })
  }
}
