import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import instantsearch from 'instantsearch.js/es'
import { searchBox, hits  } from 'instantsearch.js/es/widgets'
// declare var instantsearch: any;

@Component({
  selector: 'app-search',
  // directives: [SearchBox, RefinementList, Results, Pager],
  // providers: [AlgoliaService],
  template: `
  <div>
  yolo
    <div id="search-box">
      <!-- SearchBox widget will appear here -->
    </div>
    <div id="stats">
      <!-- stats widget will appear here -->
    </div>
    <div id="hits">
      <!-- Hits widget will appear here -->
    </div>
    <div id="pagination">
      <!-- pagination widget will appear here -->
    </div>


    <!--app-search-box></app-search-box>
    <app-refinement-list></app-refinement-list>
    <app-results></app-results>
    <app-pager></app-pager-->
  </div>
`
})
export class SearchComponent implements OnInit {

  search: any;

  constructor() { }

  ngOnInit() {
    const options = environment.algolia;
    this.search = instantsearch(options);



    this.search.addWidget(
      searchBox({
        container: '#search-box',
        autofocus: false,
        placeholder: 'search for actors',
        poweredBy: true
      })
    );

    // initialize hits widget
    this.search.addWidget(
      hits({
        container: '#hits',
        templates: {
          empty: 'No results',
          item: `<img src=https://image.tmdb.org/t/p/w300{{image_path}} width="50px">
              Result {{objectID}}:
              {{{_highlightResult.name.value}}}`
        },
        escapeHits: true        
      })
    );

    this.search.start();
  }





}
