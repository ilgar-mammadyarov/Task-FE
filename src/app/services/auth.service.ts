import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { users } from 'db/users';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  
  constructor(private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  login(loginForm: any) {
    this.currentUser = users.filter(user => user.email === loginForm.email && user.password === loginForm.password);
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  register(registerForm: any) {
    users.push(registerForm);
    localStorage.setItem('user', JSON.stringify(registerForm));
    console.log(users);
  }

  // Only ADMIN
  addUser(userForm: any) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser[0].role === 'admin') {
      users.push(userForm);
    }
  }
  // Only users created by ADMIN
  getUsers() {
    return users.filter(user => user.role === '2');
  }

  isLoggedIn() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser?.length > 0) {
      return true;
    }
    return false;
  }

  isAdmin() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser && this.currentUser[0]?.role === 'admin') {
      return true;
    }
    return false;
  }
}
