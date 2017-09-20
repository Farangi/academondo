import { SearchAlgoliaService } from '../../shared/search-algolia.service';
import { Component, OnInit } from '@angular/core';


  @Component({
    selector: 'app-results',
    template: `
    <div class="results">
      <div *ngFor="let hit of hits" 
        class="list-group-item" 
        [innerHTML]="hit._highlightResult.name.value"
      >
      crap
      </div>
    </div>
  `
  })
  export class ResultsComponent  {
  hits = []

  constructor(private algoliaService: SearchAlgoliaService) {
    // algoliaService.helper.on('result', results => {
    //   this.hits = results.hits
    // });
  }
}