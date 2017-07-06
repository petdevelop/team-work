import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent {
  form: FormGroup;

  constructor(fb: FormBuilder, private db: AngularFireDatabase) { 
    this.form = fb.group({
      'name' : [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'description': '',
      'author' : ''
    });
  }

  submitForm(data: any):void {
    let itemObservable: FirebaseListObservable<any> = this.db.list('/resources');
    itemObservable.push(data);

    this.form.reset();
  }

}
