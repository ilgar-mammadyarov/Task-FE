import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
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
      userName: [
        null, 
        {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ],
      organizationName: [
        null, 
        {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ],
      address: [
        null, 
        {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ],
      phone: [
        null, 
        {
          updateOn: 'change',
          validators: [Validators.required, Validators.minLength(9)]
        }
      ],
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if(this.form.valid) {
      this.authService.register({id: Date.now().toString(), role: '1', ...this.form.value});
    }
  }
}
