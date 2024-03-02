import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    this.userService
      .register({
        name: this.registerForm.get('name')?.value as string,
        email: this.registerForm.get('email')?.value as string,
        password: this.registerForm.get('password')?.value as string,
      })
      .subscribe((res) => {
        this.router.navigate(['/']);
      });

    this.registerForm.reset();
  }
}
