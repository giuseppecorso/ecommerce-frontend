import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private http = inject(HttpClient);
  products = signal<Product[]>([]);

  constructor() {
    this.http
      .get<Product[]>('http://localhost:8080/api/products')
      .subscribe((data) => this.products.set(data));
  }
}
