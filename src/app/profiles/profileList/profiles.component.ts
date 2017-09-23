import { ResearcherProfileService } from '../../shared/researcher-profile.service';
import { Component, OnInit } from '@angular/core';

import { ElementRef, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  allProfiles;

  displayedColumns = ['firstName', 'lastName', 'about', 'country'];
  
  dataSource: ProfileDS | null;

  constructor(private profileService: ResearcherProfileService) { }




  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.profileService.getEntities()
      .subscribe(profiles => {
        this.allProfiles = profiles;
      })


    this.dataSource = new ProfileDS(this.profileService);
    
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}


/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ProfileDS extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private profileService: ResearcherProfileService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    return this.profileService.getEntities()    
  }

  disconnect() { }
}