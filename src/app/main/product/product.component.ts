import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { Product } from '../models/product.interface';
import { ProductService } from '../services/product.service';
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, LazyLoadDirective], 
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products$ = this.productService.getProducts().pipe(
      retry(2), 
      tap((data) => console.log('Fetched products:', data)),
      catchError((error) => {
        this.errorMessage = 'Error fetching products.';
        console.error('Error fetching products:', error);
        return of([]); 
      })
    );
  }
}
