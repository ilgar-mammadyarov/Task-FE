import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { users } from 'db/users';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  public get isAdmin(): boolean {
    return this.currentUserValue && this.currentUserValue.role === 'admin';
  }

  login(loginForm: any) {
    const filteredUser = users.find(
      (user) =>
        user.email === loginForm.email && user.password === loginForm.password
    );
    localStorage.setItem('user', JSON.stringify(filteredUser));
    this.currentUserSubject.next(filteredUser);
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  register(registerForm: any) {
    users.push(registerForm);
    localStorage.setItem('user', JSON.stringify(registerForm));
  }

  // Only ADMIN
  addUser(userForm: any) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role === 'admin') {
      users.push(userForm);
    }
  }
  // Only users created by ADMIN
  getUsers() {
    return users.filter((user) => user.role === '2');
  }
}
