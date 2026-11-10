import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Product } from '../product';
import { environment } from '../../environments/environment';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  product = signal<Product | null>(null);
  notFound = signal(false);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Product>(environment.apiUrl + '/api/products/' + id)
      .subscribe({
        next: (data) => {
          this.product.set(data);
          this.title.setTitle(data.name + ' — Curio Lane');
        },
        error: () => this.notFound.set(true),
      });
  }
}
