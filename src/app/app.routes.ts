import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { isLoginGuard } from './guards/is-login.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'form', component: FormComponent, canActivate: [isLoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
