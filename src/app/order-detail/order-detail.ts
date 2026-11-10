import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Order } from '../order';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-order-detail',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  order = signal<Order | null>(null);
  errorMessage = signal('');

  // the order total is the sum of price x quantity of every row
  total = computed(() => {
    let sum = 0;
    for (const item of this.order()?.items ?? []) {
      sum += item.price * item.quantity;
    }
    return sum;
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Order>(environment.apiUrl + '/api/orders/' + id)
      .subscribe({
        next: (data) => {
          this.order.set(data);
          this.title.setTitle('Order #' + data.id + ' — Curio Lane');
        },
        error: (err) => {
          if (err.status === 401) {
            this.errorMessage.set('Log in to see your orders');
          } else {
            this.errorMessage.set('We could not find this order.');
          }
        },
      });
  }
}
