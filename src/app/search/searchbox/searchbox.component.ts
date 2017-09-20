import { SearchAlgoliaService } from '../../shared/search-algolia.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-box',
  template: `
   <div class="form">
     <input 
        type="text"
        class="search-box" 
        placeholder="{{placeholder}}"
        (keyup)="search()"
        [(ngModel)]="query"
     />
    </div>
   `
})
export class SearchboxComponent {
  query = ''
  placeholder = 'Search...'
  constructor( private algoliaService: SearchAlgoliaService) {    
    // this.algoliaService.helper.setQuery(this.query).search();
  }
  search() {
    // this.algoliaService.helper.setQuery(this.query).search();
  }
}