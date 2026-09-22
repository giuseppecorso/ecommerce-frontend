import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { environment } from '../../environments/environment';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  product = signal<Product | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Product>(environment.apiUrl + '/api/products/' + id)
      .subscribe(data => this.product.set(data));
  }
}