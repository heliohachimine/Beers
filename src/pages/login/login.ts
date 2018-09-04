import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {
   FormBuilder,
   FormGroup,
   Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';

// Import the HomePage component
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

   /**
    * Create reference for FormGroup object
    */
   public form                  : FormGroup;


   constructor(public navCtrl    : NavController,
               private _FB       : FormBuilder,
               private _AUTH     : AuthProvider)
   {
      // Define FormGroup object using Angular's FormBuilder
      this.form = this._FB.group({
         'email'        : ['', Validators.required],
         'password'     : ['', Validators.required]
      });
   }




   /**
    * Log in using the loginWithEmailAndPassword method
    * from the AuthProvider service (supplying the email
    * and password FormControls from the template via the
    * FormBuilder object
    * @method logIn
    * @return {none}
    */
   logIn() : void
   {
      let email      : any        = this.form.controls['email'].value,
          password   : any        = this.form.controls['password'].value;

      this._AUTH.loginWithEmailAndPassword(email, password)
      .then((auth : any) =>
      {
         this.navCtrl.setRoot(HomePage);
      })
      .catch((error : any) =>
      {
         console.log(error.message);
      });
   }

}
