import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular';
  faCoffee = faCoffee;
  user$ = this.userService.user$;
  sub = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.sub = this.userService.getRefreshToken().subscribe((data) => {});
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  logout() {
    this.userService.logout().subscribe();
  }
}
