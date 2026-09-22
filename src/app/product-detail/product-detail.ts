import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  product = signal<Product | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Product>('http://localhost:8080/api/products/' + id)
      .subscribe(data => this.product.set(data));
  }
}