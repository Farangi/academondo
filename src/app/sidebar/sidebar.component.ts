import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/publishLast';

import { NewsService } from '../shared';
import { newsUpdate } from '../shared/models';

import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public newsUpdates: newsUpdate[];

  constructor(private newsService: NewsService) {}

  public ngOnInit() {
    this.newsService.getNews$()
      .subscribe(news => this.newsUpdates = news);    
    
    // let update:newsUpdate = {
    //     title: 'Lab Agerskov',
    //     desc: 'Agerskovs Lab is into code!'
    //   }
    // this.updates = [update];        
  }

  public ngOnDestroy() {
    console.log('SidebarComponent is being destroyed');    
  }
}
