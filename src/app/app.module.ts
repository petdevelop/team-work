import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import 'hammerjs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { ResourceComponent } from './resource/resource.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignComponent } from './assign/assign.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'person',  component: PersonComponent },
  { path: 'resource', component: ResourceComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    ResourceComponent,
    DashboardComponent,
    AssignComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    MdNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AssignComponent]
})
export class AppModule { }
