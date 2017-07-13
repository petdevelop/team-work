import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataService } from './../services/data.service';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css'],
  providers: [DataService]
})
export class AssignComponent implements OnInit {
  resources: any[];
  isChecked: any;
  assignmentEndDate: string = null;
  minDate: any;
  maxDate: any;
  
  constructor(
    private df: MdDialogRef<AssignComponent>,
    private db: AngularFireDatabase,
    private dataService: DataService,
    @Inject(MD_DIALOG_DATA) public injectedData: any) {
      
  }

  ngOnInit() {
    this.dataService.getAvailableResources(this.injectedData.personKey)
      .subscribe(d => d.subscribe(d => this.resources = d));

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
