import { UserSettingsService } from '../user-settings.service';
import { Component, OnInit } from '@angular/core';
import { ResearcherProfileService } from '../shared';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-researcher-profile',
  templateUrl: './researcher-profile.component.html',
  styleUrls: ['./researcher-profile.component.css']
})
export class ResearcherProfileComponent {

  profile: any;
  profileForm: FormGroup;
  aboutLength = 500;
  questions: any[];

  isMD = true

  constructor( private profileService: ResearcherProfileService, private fb: FormBuilder) {

    this.profile = this.profileService.getOwnProfile();
    this.buildForm();
   }
   
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

    this.profile.subscribe(profile => {         
      if (profile) {
        this.profileForm.patchValue(profile);  
      }                 
    });

    this.profileForm.valueChanges
    .debounceTime(500)
    .subscribe(value => {
      if (this.profileForm.status !== 'VALID') {        
        return;
      }      
      this.profileService.upsert(value);
    });
  }
}
