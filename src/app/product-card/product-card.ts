import { Component, ElementRef, HostListener, computed, inject, input, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  private host = inject(ElementRef<HTMLElement>);

  product = input.required<Product>();
  image = computed(() => this.product().imageUrl ?? 'img/hero/star.svg');

  open = signal(false);
  // the popup is position: fixed, so it is never clipped by the carousel
  x = signal(0);
  y = signal(0);
  width = signal(0);

  show() {
    const card = this.host.nativeElement.getBoundingClientRect();
    const margin = 12;
    const width = Math.min(card.width * 1.18, window.innerWidth - margin * 2);
    const height = width * 1.42;

    const centerX = card.left + card.width / 2;
    const centerY = card.top + card.height / 2;

    this.width.set(width);
    this.x.set(this.keepInside(centerX, width, window.innerWidth, margin));
    this.y.set(this.keepInside(centerY, height, window.innerHeight, margin));
    this.open.set(true);
  }

  close(event?: Event) {
    event?.stopPropagation();
    this.open.set(false);
  }

  private keepInside(center: number, size: number, max: number, margin: number): number {
    if (size + margin * 2 >= max) {
      return max / 2;
    }
    return Math.min(Math.max(center, size / 2 + margin), max - size / 2 - margin);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('focusout', ['$event'])
  onFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (next && !this.host.nativeElement.contains(next)) {
      this.open.set(false);
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  @HostListener('document:keydown.escape')
  onLeave() {
    this.open.set(false);
  }
}
