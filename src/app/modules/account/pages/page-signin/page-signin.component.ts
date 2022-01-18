import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-signin',
  templateUrl: './page-signin.component.html',
  styleUrls: ['./page-signin.component.scss'],
})
export class PageSigninComponent implements OnInit {
  public errorForm: boolean;
  constructor(private authService: AuthService) {
    this.errorForm = false;
  }

  ngOnInit(): void {}

  onSubmit(objectForm: any): void {
    console.log('sigin.');
    console.log(objectForm.form.value);
    const email = objectForm.form.value.email;
    const pass = objectForm.form.value.password;

    if (email !== '' && pass !== '') {
      this.errorForm = false;
      this.authService.signin(email, pass).subscribe((response) => {
        console.log('log page signin : ', response);
      });
    } else {
      console.log('Le formulaire est incomplet.');
      this.errorForm = true;
    }
  }
}
