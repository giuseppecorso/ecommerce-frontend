import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Product } from '../product';

@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  selector: 'app-new-product',
  styleUrl: './new-product.css',
  templateUrl: './new-product.html',
})
export class NewProduct {
  private http = inject(HttpClient);
  private router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
    stockQuantity: new FormControl<number | null>(null, [Validators.required, Validators.min(0)])
  });

  save() {
    this.http
      .post<Product>(environment.apiUrl + '/api/products', this.form.value)
      .subscribe(response => {
        console.log('New product added!');
        this.router.navigate(['/products']);
      });
  }
}