import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, NgChartsModule),
    provideHttpClient()
  ]
}).catch((err) => console.error(err));
