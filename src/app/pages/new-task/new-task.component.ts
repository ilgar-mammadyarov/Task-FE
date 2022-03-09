import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})


export class NewTaskComponent implements OnInit {

  form: FormGroup;
  users = [];
  constructor(private fb: FormBuilder, private tasksService: TasksService, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      title: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ],
      description: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ],
      deadline: [
        null,
        {
          updateOn: 'change',
          validators: []
        }
      ],
      status: [
        '2',
        {
          updateOn: 'change',
          validators: []
        }
      ],
      users: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ],
    });
  }

  ngOnInit(): void {
    this.getUsersForTasks();
  }


  submit() {
    this.tasksService.createTask(this.form.value);
    this.router.navigate(['/tasks']);
  }
  getUsersForTasks() {
    this.users = this.authService.getUsers();
  }
}
