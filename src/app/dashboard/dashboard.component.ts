import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AssignComponent } from './../assign/assign.component';
import { UnAssignComponent } from './../un-assign/un-assign.component';
import { DataService } from './../services/data.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataService]
})
export class DashboardComponent implements OnInit {

  persons: Array<any>;
  assignments: Array<any>;
  resources: Array<any>;

  constructor(
    private dataService: DataService, 
    private db: AngularFireDatabase, 
    private dialog: MdDialog) {
  }

  openDialogAssign(personKey: string) {
    let dialogRef = this.dialog.open(AssignComponent, {
      width: '300px',
      data: { personKey: personKey }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.assignResource(result, personKey);
      }
    });
  }

  openDialogUnAssign(assignmentKey: string) {
    let dialogRef = this.dialog.open(UnAssignComponent, {width: '300px'});
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.pickUpResource(assignmentKey);
      }
    });
  }

  ngOnInit() {
    // persons
    this.dataService.getData()
      .subscribe(d => {
        d.subscribe(d => {
          d.subscribe(d => {
            this.persons = d.persons;
            this.assignments = d.assignments;
            this.resources = d.resources;
          });
        })
      });
  }

}