import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  // directives: [SearchBox, RefinementList, Results, Pager],
  // providers: [AlgoliaService],
  template: `
  <div>
    <app-search-box></app-search-box>
    <app-refinement-list></app-refinement-list>
    <app-results></app-results>
    <app-pager></app-pager>
  </div>
`
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
