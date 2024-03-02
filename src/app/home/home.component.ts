import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';

import { AdvertisementsService } from '../services/advertisements.service';
import { Card } from '../types/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  advertisements: Card[] = [];
  constructor(private advertisementService: AdvertisementsService) {}

  ngOnInit(): void {
    this.advertisementService.getAdvertisements().subscribe((items) => {
      this.advertisements = items;
    });
  }
}
