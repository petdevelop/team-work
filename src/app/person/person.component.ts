import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  form: FormGroup;

  constructor(fb: FormBuilder, private db: AngularFireDatabase) { 
    this.form = fb.group({
      'firstName' : [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'lastName': '',
      'address' : '',
      'phone' : '',
      'city' : '',
      'state' : '',
      'zipCode': '',
      'note': ''
    });
  }

  submitForm(data: any):void {
    let itemObservable: FirebaseListObservable<any> = this.db.list('/persons');
    itemObservable.push(data);

    this.form.reset();
  }

}
