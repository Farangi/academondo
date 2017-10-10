import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProfileModule } from './profiles/profile.module';
import { routing } from './app.routing';
import { LabModule } from './lab/lab.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ProfileModule,
    LabModule,
    routing,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
