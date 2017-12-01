import { ResearcherProfileService } from './researcher-profile.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileRef: AngularFirestoreDocument<any>;
  profile$: Observable<any>;

  profile;
  text;
  step = 0;
  constructor(private profileService: ResearcherProfileService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.profileRef = this.afs.doc('profiles/testprofile')
    this.profile$ = this.profileRef.valueChanges();
    this.profile = this.profileService.getOwnProfile();
  }

  handleTextUpdated(text) {
    this.text = text
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
