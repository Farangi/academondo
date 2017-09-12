import { Injectable } from '@angular/core';

@Injectable()
export class UserSettingsService {

  constructor() { }

  private md = true;

  public toggleDesign() {
    return this.md = !this.md;
  }
  public isMD() {
    return this.md;
  }

}
