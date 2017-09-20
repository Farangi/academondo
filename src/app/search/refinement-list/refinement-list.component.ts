import { SearchAlgoliaService } from '../../shared/search-algolia.service';
import { Component, OnInit } from '@angular/core';

  @Component({
    selector: 'app-refinement-list',
    template: `
    <ul class="facet-list" [class.no-results]="facets.length === 0">
      <li 
        *ngFor="let facet of facets"
        [class.active]="facet.isRefined"
        (click)="toggleFacet(facet.name)"
      >
        <input type="checkbox" [name]="facet.name"/>
        {{facet.name}}
        <span class="badge">{{facet.count}}</span>
      </li>
      <li *ngIf="facets.length === 0">No results.</li>
    </ul>
  `
  })
  export class RefinementListComponent {
  facets = []

  constructor(private algoliaService: SearchAlgoliaService) {
    // algoliaService.helper.on('result', results => {
    //   this.facets = results.getFacetValues('category', ['selected', 'count:desc']).slice(0, 5);
    // });
  }

  toggleFacet(facetName: string) {
    // this.algoliaService.helper.toggleRefinement('category', facetName).search();
  }
}
