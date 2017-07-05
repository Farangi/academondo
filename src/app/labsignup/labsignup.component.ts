import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {
  Lab, FieldOfInterestService, FieldOfInterest, ValidationService,
  LabService, AlertService, LaboratoryTechniqueService, Technique,
  CountryService, Country, PubmedService
} from '../shared';
import { PubmedArticle } from '../shared/models/pubmed';
import { AutocompleteComponent } from '../autocomplete';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown'

@Component({
  selector: 'app-labsignup',
  templateUrl: './labsignup.component.html',
  styleUrls: ['./labsignup.component.css']
})
export class LabsignupComponent implements OnInit {

  loading = false;
  pubmedLoading = false;

  labForm: FormGroup;
  public lab: Lab = { name: 'google Labs', address: 'Streets of the valley', zip: 2000, email: 'jobs@apple.com' };
  public fieldOfInterestOptions: FieldOfInterest[];
  public techniqueOptions: Technique[];
  public pubmedOptions: any[] = [{ name: 'no results' }];
  public countryOptions: Country[];

  public selectSettings: IMultiSelectSettings = {
    enableSearch: true,
  };

  public countrySelectSettings: IMultiSelectSettings = {
    enableSearch: true,
    selectionLimit: 1,
    closeOnSelect: true
  };

  public pubmedSelectSettings: IMultiSelectSettings = {
    enableSearch: true,
    dynamicTitleMaxItems: 0
  };

  public pubmedTextSettings: IMultiSelectTexts = {
    defaultTitle: 'Select publications'
  }

  public techniqueTextSettings: IMultiSelectTexts = {
    defaultTitle: 'Select techniques'
  }

  public foiTextSettings: IMultiSelectTexts = {
    defaultTitle: 'Select field of interests'
  }

  public countryTextSettings: IMultiSelectTexts = {
    defaultTitle: 'Select country'
  }
  constructor(
    private formBuilder: FormBuilder,
    private fieldOfInterestService: FieldOfInterestService,
    private labService: LabService,
    private alertService: AlertService,
    private laboratoryTechniqueService: LaboratoryTechniqueService,
    private countryService: CountryService,
    private pubmedService: PubmedService
  ) { }

  ngOnInit() {
    this.fieldOfInterestService.getFieldOfInterest$()
      .subscribe(fieldOfInterests => this.fieldOfInterestOptions = fieldOfInterests);

    this.laboratoryTechniqueService.getlabTechnique$()
      .subscribe(techniques => this.techniqueOptions = techniques);
    this.countryService.getCountry$()
      .subscribe(countries => this.countryOptions = countries);

    this.labForm = this.formBuilder.group({
      lab: this.formBuilder.group({
        name: [this.lab ? this.lab.name : '', Validators.required],
        address: [this.lab ? this.lab.address : '', Validators.required],
        zip: [this.lab ? this.lab.zip : '', Validators.required],
        country: [this.lab ? this.lab.country : '', Validators.required],
        email: [this.lab ? this.lab.email : '', [Validators.required, ValidationService.emailValidator]],
        groupLeader: this.lab ? this.lab.groupLeader : '',
        about: this.lab ? this.lab.about : '',
        publications: this.lab ? this.lab.publications : '',
        techniques: this.lab ? this.lab.techniques : '',
        fieldOfInterests: this.lab ? this.lab.fieldOfInterests : ''
      })
    });
  }

  public labSubmit() {
    this.loading = true;
    this.lab = this.labForm.value.lab;
    this.labService.saveLab(this.lab)
      .subscribe(
      data => {
        if (data) {
          this.alertService.success('lab created', true);
        } else {
          this.alertService.error(data.msg);
        }
        this.loading = false;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });

  }

  performSearch(searchTerm: string, retmax?: number, retstart?: number, sort?: string): void {
    this.pubmedLoading = true;
    let searchResults = [];
    this.pubmedService.getArticleIdsFromTerm(searchTerm, retmax, retstart, sort)
      .subscribe((ids) => {
        this.pubmedService.getArticlesFromIds(ids)
          .subscribe((articles: PubmedArticle[]) => {
            if (articles.length > 0) {
              articles.map((article: PubmedArticle) => {
                searchResults.push({ name: article.MedlineCitation.Article.ArticleTitle + " date: " + this.pubmedArticleDate(article), id: article.MedlineCitation.PMID['#text']})
              })
            }
            this.pubmedOptions = this.removeDefault(this.removeDuplicates(this.pubmedOptions.concat(searchResults)));
          })
        this.pubmedLoading = false;
      })
  }

  private pubmedArticleDate(article: PubmedArticle): String {
    let pubmedPubDate = article.PubmedData.History.PubMedPubDate[1];
    if (pubmedPubDate) {
      let day = pubmedPubDate.Day;
      let month = pubmedPubDate.Month;
      let year = pubmedPubDate.Year;
      return day + "/" + month + "-" + year;
    } else {
      return "";
    }
  }
  private removeDefault(array: Array<any>): Array<any> {
    let test = [];
    if (array.length > 1) {
      test = array.filter(elem => {
        return elem.name !== 'no results';
      })
    }
    return test;
  }

  private removeDuplicates(array: Array<any>): Array<any> {
    let unique = {};
    let distinct = [];
    for (var i in array) {
      if (typeof (unique[array[i].name]) == "undefined") {
        distinct.push(array[i]);
      }
      unique[array[i].name] = 0;
    }
    return distinct;
  }

  clearPubmedOptions() {
    this.pubmedOptions = [{ name: 'no results' }];
  }
}
