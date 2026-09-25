import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, CurrencyPipe, MatCardModule, MatButtonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private http = inject(HttpClient);
  products = signal<Product[]>([]);
  loading = signal(true);

  constructor() {
    this.http
      .get<Product[]>(environment.apiUrl + '/api/products')
      .subscribe((data) => {
        this.products.set(data);
        this.loading.set(false);
      });
  }
}
