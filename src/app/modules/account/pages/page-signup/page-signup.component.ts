import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-signup',
  templateUrl: './page-signup.component.html',
  styleUrls: ['./page-signup.component.scss'],
})
export class PageSignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.initForm(); //Pour les reactive form
  }

  onSubmit(objectForm: any): void {
    console.log(objectForm.form.value);
    const email = objectForm.form.value.email;
    const password = objectForm.form.value.password;

    // this.authService
    //   .signup(email, password)
    //   .subscribe((resp) => console.log(resp));
  }

  //Partie form reactive

  onReactiveSubmit() {
    const formValue = this.signupForm.value;
    const firstNameInForm = formValue['firstName'];
    const lastNameInForm = formValue['lastName'];
    const emailInForm = formValue['email'];
    const passwordInForm = formValue['password'];
    const user: User = {
      firstName: firstNameInForm,
      lastName: lastNameInForm,
      email: emailInForm,
      password: passwordInForm,
    };

    if (user.email !== '' && user.password !== '') {
      this.authService.signup(user).subscribe((response) => {
        console.log(response);
        this.router.navigate(['account/signin']);
      });
    } else {
      console.log('Formulaire invalide');
    }
  }

  initForm() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
}
