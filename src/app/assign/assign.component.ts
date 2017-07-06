import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  resources: Array<any>;
  isChecked: any;
  assignmentEndDate: string = null;
  
  constructor(private df: MdDialogRef<AssignComponent>, private db: AngularFireDatabase) {

  }

  ngOnInit() {
    this.db.list('/resources')
      .subscribe(data => {
        this.resources = data;
      });
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
