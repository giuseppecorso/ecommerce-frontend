import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../order';
import { environment } from '../../environments/environment';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-my-orders',
  imports: [MatTableModule, DatePipe],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {
  private http = inject(HttpClient);
  orders = signal<Order[]>([]);
  loading = signal(true);
  errorMessage = signal('');
  displayedColumns = ['id', 'username', 'dateOrder', 'status', 'items'];

  constructor() {
    this.http
      .get<Order[]>(environment.apiUrl + '/api/orders')
      .subscribe({
        next: (data) => {
          this.orders.set(data); this.loading.set(false);
        },
        error: (err) => {
          if (err.status === 401) {
            this.errorMessage.set('Log in to see your orders');
          }
          this.loading.set(false);
        }
      });
  }
}
