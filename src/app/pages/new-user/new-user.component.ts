import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

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
      name: [
        null, 
        {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ],
      surname: [
        null, 
        {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    this.authService.addUser({id: Date.now().toString(),role: '2', ...this.form.value});
  }

}
