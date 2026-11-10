import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Logo } from './logo/logo';


@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Logo],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  year = new Date().getFullYear();

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // The roles are inside the token payload (second part, Base64 encoded).
  // This only decides which links to show: the real check is on the server.
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return Array.isArray(payload.roles) && payload.roles.includes('ROLE_ADMIN');
    } catch {
      return false;
    }
  }

  logout() {
    if (confirm('Confirm log out?')) {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
      this.snackBar.open('Logout complete', 'Close', { duration: 6000 });
    }
  }
}
