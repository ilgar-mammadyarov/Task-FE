import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'new-user',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./pages/new-user/new-user.module').then(m => m.NewUserModule)
  },
  {
    path: 'new-task',
    canActivate: [AuthGuard, UserGuard],
    loadChildren: () => import('./pages/new-task/new-task.module').then(m => m.NewTaskModule)
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard, UserGuard],
    loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
  },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
