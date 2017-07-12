import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  resources: any[];
  isChecked: any;
  assignmentEndDate: string = null;
  minDate: any;
  maxDate: any;
  
  constructor(private df: MdDialogRef<AssignComponent>, private db: AngularFireDatabase) {

  }

  ngOnInit() {
    this.db.list('/resources')
      .subscribe(resources => {
          this.resources = resources;
          
          this.db.list('/assignments')
            .subscribe(assignments => {
              // get the list of unavailable resources
              let unAvailableResourceKeys: any[] = [];
              assignments.forEach(element => {

                let endDate = new Date(element.endDate);
                let today = new Date();

                if (endDate >= today) {
                  unAvailableResourceKeys = unAvailableResourceKeys.concat(element.resourceKeys);
                }

                this.resources = this.resources.filter(e => unAvailableResourceKeys.indexOf(e.$key) == -1);

              });
 
            });

      });

      let date = new Date();

      this.minDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      this.maxDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 31
      );
  }

  onClose(): void {
    let checkeds = this.resources.filter(item => item.checked).map(item => item.$key);
    let res = {
      'checkeds' : checkeds,
      'endDate' : this.assignmentEndDate
    }

    if (this.assignmentEndDate && checkeds.length > 0) {
      return this.df.close(res);
    }

    this.df.close();
  }
}
