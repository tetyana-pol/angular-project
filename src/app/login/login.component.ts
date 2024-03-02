import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.userService
      .login({
        email: this.loginForm.get('email')?.value as string,
        password: this.loginForm.get('password')?.value as string,
      })
      .subscribe((res) => {
        this.router.navigate(['/']);
      });

    this.loginForm.reset();
  }
}
