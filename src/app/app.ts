import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ecommerce-frontend');
  private router = inject(Router);

  logout() {
    if (confirm('Confirm log out?')) {
      localStorage.removeItem('token');
      this.router.navigate(['/products']);
    }
  }
}
