import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdvertisementsService } from '../services/advertisements.service';
import { Router } from '@angular/router';
import { User } from '../types/user';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit, OnDestroy {
  user: User | null = null;
  sub = new Subscription();

  cardForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    img: new FormControl<File | null>(null),
  });

  constructor(
    private userService: UserService,
    private advertisementService: AdvertisementsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.userService.user$.subscribe((data) => {
      this.user = data;
      console.log('form user', data);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cardForm.patchValue({
        img: file,
      });
    }
  }

  addCard() {
    if (this.cardForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.cardForm.get('title')?.value as string);
    formData.append(
      'description',
      this.cardForm.get('description')?.value as string
    );
    formData.append('price', this.cardForm.get('price')?.value as string);
    formData.append('adress', this.cardForm.get('adress')?.value as string);
    formData.append('img', this.cardForm.get('img')?.value as File);
    formData.append('authorId', this.user?.id.toString() as string);

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      this.advertisementService
        .createAdvertisement(formData, accessToken)
        .subscribe((res) => {
          this.router.navigate(['/']);
        });
    } else {
      alert('You need login');
    }

    this.cardForm.reset();
  }
}
