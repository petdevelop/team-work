
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-un-assign',
  templateUrl: './un-assign.component.html',
  styleUrls: ['./un-assign.component.css']
})
export class UnAssignComponent implements OnInit {
  resources: any[];
  
  constructor(private df: MdDialogRef<UnAssignComponent>, private db: AngularFireDatabase) {

  }

  ngOnInit() {
   
  }

  onClose(res: boolean): void {
    this.df.close(res);
  }
}

