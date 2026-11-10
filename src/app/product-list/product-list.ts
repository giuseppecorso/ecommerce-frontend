import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';
import { environment } from '../../environments/environment';
import { ProductCard } from '../product-card/product-card';

interface CategoryGroup {
  name: string;
  products: Product[];
}

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private http = inject(HttpClient);
  products = signal<Product[]>([]);
  loading = signal(true);
  selected = signal<string | null>(null);

  // products grouped by category, in the order the categories first appear
  groups = computed<CategoryGroup[]>(() => {
    const groups: CategoryGroup[] = [];
    for (const p of this.products()) {
      const name = p.category ?? 'Other';
      let group = groups.find((g) => g.name === name);
      if (!group) {
        group = { name, products: [] };
        groups.push(group);
      }
      group.products.push(p);
    }
    return groups;
  });

  visibleGroups = computed(() => {
    const selected = this.selected();
    return selected ? this.groups().filter((g) => g.name === selected) : this.groups();
  });

  constructor() {
    this.http
      .get<Product[]>(environment.apiUrl + '/api/products')
      .subscribe({
        next: (data) => {
          this.products.set(data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }
}
