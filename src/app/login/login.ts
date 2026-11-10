import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface LoginResponse {
  token: string;
}

@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.http
      .post<LoginResponse>(environment.apiUrl + '/api/auth/login', this.form.value)
      .subscribe({
        next: response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/products']);
          this.snackBar.open('Welcome back, ' + this.form.value.username + '!', 'Close', { duration: 4000 });
        },
        error: () => {
          this.snackBar.open('Wrong username or password', 'Close', { duration: 4000 });
        },
      });
  }
}
