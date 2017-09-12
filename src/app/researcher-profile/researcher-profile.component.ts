import { Component, OnInit } from '@angular/core';
import { ResearcherProfileService } from '../shared';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-researcher-profile',
  templateUrl: './researcher-profile.component.html',
  styleUrls: ['./researcher-profile.component.css']
})
export class ResearcherProfileComponent implements OnInit {

  profile: any;
  ownProfile: any;
  profileForm: FormGroup;
  aboutLength = 500;
  questions: any[];

  constructor( private profileService: ResearcherProfileService, private fb: FormBuilder) {

    this.getProfile();
   }

  getProfile() {
    this.profile = this.profileService.getOwnProfile()
    // .subscribe((profile) => {
    //   // debugger;
    //   console.log(profile)
    //   this.ownProfile = profile;
    // });
    // debugger;
    this.buildForm()
  }

  // saveProfileChanges() {    
  //   if(this.profileForm.status != 'VALID') {
  //     console.log('form not valid, cant save to db');
  //     return
  //   }
  //   this.profileService.updateProfile(this.profileForm.value)
  // }



  private buildForm() {
    this.profileForm = this.fb.group({
      name:     ['', Validators.required],
      country:  [''],      
      groupLeader: [''],
      about: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(this.aboutLength), Validators.required])],
      // publications: ['', Validators.required],
      // techniques: ['', Validators.required],
      // fieldOfInterests: ['', Validators.required],
    });

    // data fra firebase
    this.profile.subscribe(profile => {   
      console.log('getting new data from fb:', profile)
      if (profile) {
        this.profileForm.patchValue(profile);  
      }                 
    });

    // data ud til firebase
    this.profileForm.valueChanges
    .debounceTime(1000)
    .subscribe(value => {
      if (this.profileForm.status !== 'VALID') {
        console.log('form not valid, cant save to db');
        return;
      }
      console.log('form valid, new value sent to fb: ', value);
      this.profileService.upsert(value);
    });
  }

  ngOnInit() {
    // this.startNewResearchProfile();  
    // this.getProfile();  
  }

}
