import { Injectable } from '@angular/core';
import { tasks } from 'db/tasks';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  user: any;
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getTasks() {
    return tasks.filter(task => task.createdBy === this.user.id);
  }

  createTask(taskForm) {
    tasks.push({id: Date.now().toString(),createdBy: this.user.id, ...taskForm});
  }
}
