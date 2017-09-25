import { propertyType } from '@angular/language-service/src/html_info';
import { FieldOfInterest } from './../shared/models/fieldOfInterest';
import { Technique } from './../shared/models/technique';
import { ResearcherProfileService } from './researcher-profile.service';
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

import * as _ from 'lodash';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  allProfiles;

  filteredProfiles;


  fieldOfInterestOptions = this.profileService.fieldOfInterestOptions;
  techniqueOptions = this.profileService.techniquesOptions;

  // filter-able properties
  country: string;
  title: string;
  techniques: { id, name }[];
  fieldOfInterests: {id, name}[];
  conicalFlask: number;

  filters = {};

  private applyFilters() {
    this.filteredProfiles = _.filter(this.allProfiles, _.conforms(this.filters))
  }

  filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule;
    this.applyFilters();
  }

  filterGreaterThan(property: string, rule: number) {
    this.filters[property] = val => val > rule;
    this.applyFilters();
  }

  filterBoolean(property: string, rule: number) {
    if (!rule) {
      this.removeFilter(property)
    } else {
      this.filters[property] = val => val;
      this.applyFilters();
    }    
  }  

  removeFilter(property: string) {
    delete this.filters[property]
    this[property] = null;
    this.applyFilters();
  }

  displayedColumns = ['firstName', 'lastName', 'about', 'country'];
  
  dataSource: ProfileDS | null;

  constructor(private profileService: ResearcherProfileService) { }








  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.profileService.getEntities()
      .subscribe(profiles => {
        this.allProfiles = profiles;
        this.applyFilters();
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