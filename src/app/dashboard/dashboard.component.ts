import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AssignComponent } from './../assign/assign.component';
import { UnAssignComponent } from './../un-assign/un-assign.component';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  persons: Array<any>;
  resources: Array<any>;
  assignments: Array<any>;
  selectedOption: string;

  constructor(private db: AngularFireDatabase, private dialog: MdDialog) {
  }

  openDialog(personKey: any) {
    let dialogRef = this.dialog.open(AssignComponent, {width: '300px'});
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let itemObservable: FirebaseListObservable<any> = this.db.list('/assignments');
        itemObservable.push({
          'personKey' : personKey,
          'endDate' : result.endDate.toString(),
          'resourceKeys' : result.checkeds
        });
      }
    });
  }

  openDialogUnAssign(assignmentKey: string) {
    let dialogRef = this.dialog.open(UnAssignComponent, {width: '300px'});
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let itemObservable: FirebaseListObservable<any> = this.db.list('/assignments');
        itemObservable.remove(assignmentKey);
      }
    });
  }


  ngOnInit() {
    this.db.list('/persons')
      .subscribe(persons => {
        this.persons = persons;

        this.db.list('/assignments')
          .subscribe(assignments => {
            this.assignments = assignments;

            this.db.list('/resources')
              .subscribe(resources => {
                this.resources = resources;

                this.persons.forEach(person => {
                  person.assignments = assignments.filter(item => item.personKey == person.$key);
                  
                  person.assignments.forEach(assignment => {
                    assignment.resources = [];

                    assignment.resourceKeys.forEach(resourceKey => {
                      assignment.resources.push(resources.filter(resource => resource.$key == resourceKey)[0]);
                    });

                  });  

                });              

              });

          }); 
           
      });

  }

}