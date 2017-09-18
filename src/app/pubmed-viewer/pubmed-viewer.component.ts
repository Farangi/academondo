import { Component, Input } from '@angular/core';
import { PubmedService } from '../shared';
import { PubmedArticle } from '../shared/models/pubmed';

@Component({
  selector: 'app-pubmed-viewer',
  templateUrl: './pubmed-viewer.component.html',
  styleUrls: ['./pubmed-viewer.component.css']
})
export class PubmedViewerComponent {
  @Input() articles: PubmedArticle[];

  makeArticleUrl(article: PubmedArticle) {    
    return this.pubmedService.getArticleUrl(article);
  }

  hack(val) {    
    return this.pubmedService.arrayObjectHack(val);
  }

  constructor(private pubmedService: PubmedService) { }
}
