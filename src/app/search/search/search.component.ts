import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import instantsearch from 'instantsearch.js/es'
import { searchBox, hits, pagination, stats, analytics  } from 'instantsearch.js/es/widgets'
// declare var instantsearch: any;

@Component({
  selector: 'app-search',
  // directives: [SearchBox, RefinementList, Results, Pager],
  // providers: [AlgoliaService],
  template: `
  <div>
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
        poweredBy: false
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

    this.search.addWidget(
      stats({
        container: '#stats'
      })
    );


    this.search.addWidget(
      pagination({
        container: '#pagination',
        maxPages: 20,
      })
    );

    this.search.addWidget(
      analytics({
        pushFunction: (query, state, results) => {
          console.log(query)
          console.log(state)
          console.log(results)
        }
      })
    );    

    this.search.start();
  }
}
