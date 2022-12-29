import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import * as $ from 'jquery';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  adminRegForm = new FormGroup({
    firstname: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    repassword: new FormControl('',Validators.required),
    mobilenumber: new FormControl('',Validators.required)
  })

  getFormData()
  {
    let count=0;
    let message='';
    if($('#firstname').val()==''||$('#firstname').val()==undefined)
    {
       message = message+"First name";
       console.log(message)
       count++;
    }
    if($('#lastname').val()==''||$('#lastname').val()==undefined)
    {
      message = message+"\nLast name";
      console.log(message)
      count++;
    }
    if($('#email').val()==''||$('#email').val()==undefined)
    {
      message = message+"\nEmail";
      console.log(message)
      count++;
    }
    if($('#password').val()==''||$('#password').val()==undefined)
    {
      message = message+"\nPassword";
      console.log(message)
      count++;
    }
    if($('#repassword').val()==''||$('#repassword').val()==undefined)
    {
      message = message+"\nRetype password";
      console.log(message)
      count++;
    }
    if($('#mobilenumber').val()==''||$('#mobilenumber').val()==undefined)
    {
      message = message+"\nMobile number";
      console.log(message)
      count++;
    }
    if(count>0)
    {
      message = message+"\nAbove field(s) cannot be empty"
      alert(message)
      console.log(message)
    }
  }


  get firstname()
  { return this.adminRegForm.get('firstname'); }

  get lastname()
  { return this.adminRegForm.get('lastname'); }

  get email()
  { return this.adminRegForm.get('email'); }

  get password()
  { return this.adminRegForm.get('password'); }

  get repassword()
  { return this.adminRegForm.get('repassword'); }

  get mobilenumber()
  { return this.adminRegForm.get('mobilenumber'); }
}
