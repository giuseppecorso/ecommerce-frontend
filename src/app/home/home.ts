import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { Product } from '../product';
import { ProductCard } from '../product-card/product-card';

interface Sketch {
  name: string;
  x: string;   // horizontal position of the centre, in % of the banner
  y: number;   // vertical position of the centre, in px
  size: number;
  rotate: number;
  delay: number;
  // position on small screens; sketches without it are hidden there
  mobileX?: string;
  mobileY?: number;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private http = inject(HttpClient);
  private track = viewChild<ElementRef<HTMLElement>>('track');

  featured = signal<Product[]>([]);
  loading = signal(true);

  // the dotted trail in home.html goes through these points in this order
  sketches: Sketch[] = [
    { name: 'key', x: '4%', y: 206, size: 66, rotate: -14, delay: -5 },
    { name: 'mug', x: '5%', y: 70, size: 94, rotate: -10, delay: 0, mobileX: '12%', mobileY: 44 },
    { name: 'book', x: '13.5%', y: 150, size: 80, rotate: 8, delay: -2 },
    { name: 'sprout', x: '22%', y: 44, size: 66, rotate: 14, delay: -4 },
    { name: 'pawn', x: '33%', y: 40, size: 58, rotate: -6, delay: -1 },
    { name: 'star', x: '50%', y: 32, size: 50, rotate: 6, delay: -6, mobileX: '50%', mobileY: 30 },
    { name: 'hourglass', x: '67%', y: 40, size: 62, rotate: -4, delay: -7 },
    { name: 'plane', x: '86%', y: 62, size: 90, rotate: -12, delay: -3, mobileX: '88%', mobileY: 44 },
    { name: 'tag', x: '95%', y: 180, size: 94, rotate: 9, delay: -1, mobileX: '88%', mobileY: 236 },
    { name: 'envelope', x: '88%', y: 236, size: 62, rotate: -8, delay: -4 },
    { name: 'candle', x: '72%', y: 234, size: 64, rotate: 10, delay: -5 },
    { name: 'domino', x: '46%', y: 244, size: 54, rotate: -18, delay: -2, mobileX: '50%', mobileY: 246 },
    { name: 'top', x: '27%', y: 230, size: 62, rotate: -6, delay: -6, mobileX: '12%', mobileY: 236 },
  ];

  constructor() {
    this.http.get<Product[]>(environment.apiUrl + '/api/products').subscribe({
      next: (products) => {
        // one product every five gives a mix of all the categories, six at most
        this.featured.set(products.filter((_, i) => i % 5 === 0).slice(0, 6));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  scroll(direction: number) {
    const track = this.track()?.nativeElement;
    if (track) {
      track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
    }
  }
}
