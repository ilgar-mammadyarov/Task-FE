import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  userMe: any;
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: [
        null, 
        {
          updateOn: 'change',
          validators: [Validators.required, Validators.email]
        }
      ],
      password: [
        null, 
        {
          updateOn: 'change',
          validators: [Validators.required, Validators.minLength(6)]
        }
      ],
    });
  }

  ngOnInit(): void {
    this.userMe = localStorage.getItem('user');
  }
  submit() {
    this.authService.login(this.form.value);
    this.router.navigate(['tasks']);
  }
}
