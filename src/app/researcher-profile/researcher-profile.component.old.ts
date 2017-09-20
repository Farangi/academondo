// import { ResearcherProfileService } from './../shared/researcher-profile.service.old';
// import { FieldOfInterestService } from './../shared/field-of-interest.service';
// import { LaboratoryTechniqueService } from './../shared/laboratory-technique.service';
// import { Technique } from './../shared/models/technique';
// import { observable } from 'rxjs/symbol/observable';
// import { CountryService } from './../shared/country.service';
// import { Observable } from 'rxjs';
// import { FirebaseListObservable } from 'angularfire2/database';
// import { UserSettingsService } from '../user-settings.service';
// import { Component, OnInit } from '@angular/core';

// import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { MdChipInputEvent, ENTER } from '@angular/material';


// const COMMA = 188;
// const SEMICOLON = 186;
// @Component({
//   selector: 'app-researcher-profile',
//   templateUrl: './researcher-profile.component.html',
//   styleUrls: ['./researcher-profile.component.css']
// })
// export class ResearcherProfileComponentold implements OnInit {

//   profile;
//   profileForm: FormGroup;
//   aboutLength = 500;
  
  
//   // selectedTechniques = [];
//   selectedFieldOfInterests = [];



//   techniqueCtrl: FormControl;
//   techniques = [];
//   reactiveTechniques: Observable<any>;

//   fieldOfInterestCtrl: FormControl;
//   fieldOfInterests = [];
//   reactiveFieldOfInterests: Observable<any>;
  
//   countryCtrl: FormControl;
//   countries = [];  
//   reactiveCountries: Observable<any>;

//   visible: boolean = true;
//   color: string = '';
//   selectable: boolean = true;
//   removable: boolean = true;
//   addOnBlur: boolean = true;
//   message: string = '';
  
//   separatorKeysCodes = [ENTER, COMMA, SEMICOLON];


  


//   isMD = true

//   constructor(private profileService: ResearcherProfileService, private fb: FormBuilder, private countryService: CountryService, private laboratoryTechniqueService: LaboratoryTechniqueService, private fieldOfInterestService: FieldOfInterestService) { }

//   add(event: MdChipInputEvent): void {
//     let input = event.input;
//     let value = event.value;

//     // Add our person
//     if ((value || '').trim()) {
//       this.selectedFieldOfInterests.push({ name: value.trim() });
//     }

//     // Reset the input value
//     if (input) {
//       input.value = '';
//     }
//   }
//   remove(data: any): void {
//     let index = this.selectedFieldOfInterests.indexOf(data);

//     if (index >= 0) {
//       this.selectedFieldOfInterests.splice(index, 1);
//     }
//   }


//   private _filter(list: any[], val?: string) {
//     if (!val.trim()) return list;
//     const filterValue = val.trim().toLowerCase();
//     return list.filter(obj => obj.name.toLowerCase().startsWith(filterValue));
//   } 

//   displayFn(value: any): string {
//     return value && typeof value === 'object' ? value.name : value;
//   }

//    ngOnInit() {     
//      this.buildForm();
//    }

//    private buildTechnique() {
//      this.laboratoryTechniqueService.getlabTechnique$()
//        .flatMap(list => list)
//        .subscribe((data: any) => {
//          this.techniques.push(data)
//        })
//      this.techniqueCtrl = new FormControl('');
//      this.reactiveTechniques = this.techniqueCtrl.valueChanges
//        .startWith(this.techniqueCtrl.value)
//        .map(val => this.displayFn(val))
//        .map(name => this._filter(this.techniques, name));
//    }    

//    private buildFieldOfInterest() {
//     this.fieldOfInterestService.getFieldOfInterest$()
//       .flatMap(list => list)
//       .subscribe((data: any) => {        
//         this.fieldOfInterests.push(data)
//       })
//     this.fieldOfInterestCtrl = new FormControl('');
//     this.reactiveFieldOfInterests = this.fieldOfInterestCtrl.valueChanges
//       .startWith(this.fieldOfInterestCtrl.value)
//       .map(val => this.displayFn(val))
//       .map(name => this._filter(this.fieldOfInterests, name));
//   }   

//    private buildCountry() {
//      this.countryService.getCountry$()
//        .flatMap(list => list)
//        .subscribe((data: any) => {         
//          this.countries.push(data)
//        })
//      this.countryCtrl = new FormControl('');
//      this.reactiveCountries = this.countryCtrl.valueChanges
//        .startWith(this.countryCtrl.value)
//        .map(val => this.displayFn(val))
//        .map(name => this._filter(this.countries, name));
//    }
   
//   private buildForm() {
//     this.profile = this.profileService.getOwnProfile();    
//     this.buildCountry();
//     this.buildTechnique();
//     this.buildFieldOfInterest();
//     this.profileForm = this.fb.group({
//       name:     ['', Validators.required],
//       country: this.countryCtrl,            
//       about: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(this.aboutLength), Validators.required])],
//       // publications: ['', Validators.required],
//       techniques: this.techniqueCtrl,
//       fieldOfInterests: this.fieldOfInterestCtrl,
//     });

//     this.profile.subscribe(profile => {         
//       if (profile) {
//         this.profileForm.patchValue(profile);  
//       }
//     });

//     this.profileForm.valueChanges
//     .debounceTime(500)
//     .subscribe(value => {
//       if (this.profileForm.status !== 'VALID') {        
//         return;
//       }      
//       this.profileService.upsert(value);
//     });
//   }
// }
